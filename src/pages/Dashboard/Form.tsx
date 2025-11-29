import { useEffect, useRef, useState } from 'react';
import Questionnaire from './Questionnaire';
import Hexagon from '../../components/charts/Hexagon';
import { supabase } from '../../services/supabase';

export default function Form() {
    const [finalResult, setFinalResult] = useState<Record<
        number,
        boolean
    > | null>(null);
    const [hexReady, setHexReady] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const svgRef = useRef<SVGSVGElement>(null!);

    const handleFinish = (result: Record<number, boolean>) => {
        setFinalResult(result);
        setHexReady(false);
        setErrorMessage(null);
    };

    useEffect(() => {
        async function saveSVG() {
            try {
                const svg = svgRef.current;
                if (!svg) return;

                const svgString = new XMLSerializer().serializeToString(svg);

                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                    setErrorMessage('Usuário não autenticado.');
                    return;
                }

                const { error } = await supabase.from('resultado').insert([
                    {
                        usuario_id: user.id,
                        questionario_id: 1,
                        arquivo: svgString,
                    },
                ]);

                if (error) {
                    setErrorMessage('Erro ao salvar o resultado.');
                    return;
                }
            } catch {
                setErrorMessage('Erro inesperado ao salvar o resultado.');
            }
        }

        if (finalResult && hexReady) {
            saveSVG();
        }
    }, [finalResult, hexReady]);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {errorMessage && (
                <p style={{ color: 'red', marginBottom: '20px' }}>
                    {errorMessage}
                </p>
            )}

            {!finalResult ? (
                <Questionnaire onFinish={handleFinish} />
            ) : (
                <Hexagon
                    result={finalResult}
                    svgRef={svgRef}
                    onReady={() => setHexReady(true)}
                />
            )}
        </div>
    );
}
