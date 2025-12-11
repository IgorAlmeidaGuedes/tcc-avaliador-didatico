import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabase';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Download, ArrowLeft } from 'lucide-react';

interface Report {
    arquivo: string;
    created_at: string;
}

export default function ReportDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState<Report | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadReport() {
            try {
                setIsLoading(true);

                const { data, error } = await supabase
                    .from('resultado')
                    .select('arquivo, created_at')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Erro ao carregar relatório:', error);
                    return;
                }

                setReport(data);
            } catch (err) {
                console.error('Erro inesperado:', err);
            } finally {
                setIsLoading(false);
            }
        }

        if (id) loadReport();
    }, [id]);

    const handleDownload = () => {
        if (!report?.arquivo) return;

        const isSVG = report.arquivo.trim().startsWith('<svg');
        const isPDF = report.arquivo.toLowerCase().endsWith('.pdf');

        // DOWNLOAD PDF
        if (isPDF) {
            const a = document.createElement('a');
            a.href = report.arquivo;
            a.download = `relatorio-${id}.pdf`;
            a.click();
            return;
        }

        // DOWNLOAD SVG
        if (isSVG) {
            const blob = new Blob([report.arquivo], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `relatorio-${id}.svg`;
            a.click();

            URL.revokeObjectURL(url);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">
                            Carregando relatório...
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="max-w-5xl mx-auto">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">
                            Relatório não encontrado.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const isSVG = report.arquivo.trim().startsWith('<svg');
    const isPDF = report.arquivo.toLowerCase().endsWith('.pdf');

    return (
        <div className="max-w-5xl mx-auto">
            {/* TOPO */}
            <div className="mb-6 flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard/reports')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                </Button>

                <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Baixar arquivo
                </Button>
            </div>

            {/* CARD PRINCIPAL */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Relatório #{id}</CardTitle>

                    <p className="text-muted-foreground">
                        Gerado em{' '}
                        {format(
                            new Date(report.created_at),
                            "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                            { locale: ptBR }
                        )}
                    </p>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center items-start rounded-lg overflow-auto">
                        {/* VISUALIZAÇÃO PDF */}
                        {isPDF && (
                            <iframe
                                src={report.arquivo}
                                className="w-full max-w-4xl h-[90vh] rounded-lg"
                                style={{ border: 'none' }}
                            />
                        )}

                        {/* VISUALIZAÇÃO SVG */}
                        {isSVG && (
                            <div
                                className="w-full max-w-4xl"
                                dangerouslySetInnerHTML={{
                                    __html: report.arquivo,
                                }}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
