import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/services/supabase';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText } from 'lucide-react';

interface Report {
    id: number;
    created_at: string;
    arquivo: string;
}

export default function Reports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadReports() {
            try {
                setIsLoading(true);

                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                    console.error('Usuário não autenticado');
                    return;
                }

                const { data, error } = await supabase
                    .from('resultado')
                    .select('id, created_at, arquivo')
                    .eq('usuario_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Erro ao carregar relatórios:', error);
                    return;
                }

                setReports(data || []);
            } catch (err) {
                console.error('Erro inesperado:', err);
            } finally {
                setIsLoading(false);
            }
        }

        loadReports();
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">
                            Carregando relatórios...
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-3xl">Relatórios</CardTitle>
                </CardHeader>
            </Card>

            {reports.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">
                            Nenhum relatório encontrado.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((rep) => {
                        const isSVG = rep.arquivo.trim().startsWith('<svg');
                        const isPDF = rep.arquivo
                            .toLowerCase()
                            .endsWith('.pdf');

                        return (
                            <Card
                                key={rep.id}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() =>
                                    navigate(`/dashboard/reports/${rep.id}`)
                                }
                            >
                                <CardContent className="p-6">
                                    <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                        {/* PREVIEW SVG */}
                                        {isSVG && (
                                            <img
                                                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                                    rep.arquivo
                                                )}`}
                                                className="w-full h-full object-cover object-top"
                                                alt="preview"
                                            />
                                        )}

                                        {/* PREVIEW PDF */}
                                        {isPDF && (
                                            <div className="flex flex-col items-center text-muted-foreground">
                                                <FileText className="w-16 h-16 mb-2" />
                                                <span className="text-sm">
                                                    PDF gerado
                                                </span>
                                            </div>
                                        )}

                                        {/* CASO NÃO SEJA NEM PDF NEM SVG */}
                                        {!isSVG && !isPDF && (
                                            <FileText className="w-16 h-16 text-muted-foreground" />
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <p className="font-semibold text-lg">
                                            Relatório #{rep.id}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {format(
                                                new Date(rep.created_at),
                                                "dd 'de' MMMM 'de' yyyy",
                                                { locale: ptBR }
                                            )}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
