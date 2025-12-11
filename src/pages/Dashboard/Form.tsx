/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react';
import Questionnaire from './Questionnaire';
import Hexagon from '../../components/charts/Hexagon';
import { supabase } from '../../services/supabase';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import htmlToPdfmake from 'html-to-pdfmake';

(pdfMake as any).vfs = (pdfFonts as any).vfs;

export default function Form() {
    const [finalResult, setFinalResult] = useState<Record<
        number,
        boolean
    > | null>(null);
    const [hexReady, setHexReady] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [reportHtml, setReportHtml] = useState<string>('');

    const svgRef = useRef<SVGSVGElement>(null!);
    const reportRef = useRef<HTMLDivElement>(null);

    const handleFinish = (result: Record<number, boolean>) => {
        setFinalResult(result);
        setHexReady(false);
        setErrorMessage(null);
    };

    useEffect(() => {
        if (reportRef.current && reportHtml) {
            reportRef.current.innerHTML = reportHtml;
        }
    }, [reportHtml]);

    useEffect(() => {
        if (!finalResult || !hexReady) return;
        (async () => {
            await generatePDF();
        })();
    }, [finalResult, hexReady]);

    async function generatePDF() {
        try {
            const svg = svgRef.current;
            if (!svg) {
                setErrorMessage('SVG não encontrado para gerar o relatório.');
                return;
            }

            // SVG → PNG
            const svgString = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);

            const svgImage = await loadImage(svgUrl);
            const hexagonBase64 = svgImageToBase64(svgImage);

            URL.revokeObjectURL(svgUrl);

            // HTML real renderizado
            let rawHTML = reportRef.current?.innerHTML ?? '';

            // Converte bullets
            rawHTML = convertBullets(rawHTML);

            // 🚨 Usa html-to-pdfmake — INCRÍVEL E CONFIÁVEL
            let contentBlocks = htmlToPdfmake(rawHTML);

            // Se não for array, transforma em array
            if (!Array.isArray(contentBlocks)) {
                contentBlocks = [contentBlocks];
            }

            const docDefinition: any = {
                pageSize: 'A4',
                pageMargins: [30, 40, 30, 40],
                content: [
                    {
                        image: hexagonBase64,
                        width: 420,
                        alignment: 'center',
                        margin: [0, 0, 0, 12],
                    },
                    {
                        text: 'Relatório do Diagnóstico',
                        style: 'title',
                        margin: [0, 0, 0, 12],
                    },
                    ...contentBlocks,
                ],
                styles: {
                    title: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 15, 0, 10],
                        color: '#000',
                    },
                },
                defaultStyle: {
                    fontSize: 11,
                    lineHeight: 1.2,
                },
            };

            const pdfThumb = pdfMake.createPdf(docDefinition);
            const thumbBase64: string = await new Promise((resolve) => {
                pdfThumb.getDataUrl(resolve);
            });

            const pdfFinal = pdfMake.createPdf(docDefinition);
            const pdfBlob: Blob = await new Promise((resolve) => {
                pdfFinal.getBlob(resolve);
            });

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setErrorMessage('Usuário não autenticado.');
                return;
            }

            const fileName = `relatorio_${user.id}_${Date.now()}.pdf`;
            const thumbName = `thumb_${fileName}.png`;

            const { error: thumbError } = await supabase.storage
                .from('relatorios')
                .upload(thumbName, dataURLtoBlob(thumbBase64));

            if (thumbError) {
                setErrorMessage(
                    `Erro ao salvar thumbnail: ${thumbError.message}`
                );
                return;
            }

            const { error: uploadError } = await supabase.storage
                .from('relatorios')
                .upload(fileName, pdfBlob);

            if (uploadError) {
                setErrorMessage(
                    `Erro ao armazenar PDF: ${
                        uploadError.message || uploadError
                    }`
                );
                return;
            }

            const { data: pdfUrlData } = supabase.storage
                .from('relatorios')
                .getPublicUrl(fileName);

            const { data: thumbUrlData } = supabase.storage
                .from('relatorios')
                .getPublicUrl(thumbName);

            await supabase.from('resultado').insert([
                {
                    usuario_id: user.id,
                    questionario_id: 1,
                    arquivo: pdfUrlData.publicUrl,
                    thumbnail: thumbUrlData.publicUrl,
                },
            ]);

            setErrorMessage(null);
        } catch (err) {
            console.error('Erro ao gerar PDF:', err);
            setErrorMessage('Erro ao gerar PDF. Veja console para detalhes.');
        }
    }

    function dataURLtoBlob(dataUrl: string): Blob {
        const arr = dataUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new Blob([u8arr], { type: mime });
    }

    function loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
            img.src = url;
        });
    }

    function svgImageToBase64(img: HTMLImageElement) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width || 900;
        canvas.height = img.height || 350;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/png');
    }

    // Converte bullets do Markdown para <ul><li>
    function convertBullets(html: string): string {
        return html.replace(/(?:<p[^>]*>\s*•\s*(.*?)<\/p>[\s]*)+/g, (match) => {
            const items = [...match.matchAll(/<p[^>]*>\s*•\s*(.*?)<\/p>/g)]
                .map((m) => `<li>${m[1]}</li>`)
                .join('');

            return `<ul>${items}</ul>`;
        });
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {errorMessage && (
                <p style={{ color: 'red', marginBottom: 16 }}>{errorMessage}</p>
            )}

            {!finalResult ? (
                <Questionnaire onFinish={handleFinish} />
            ) : (
                <>
                    <Hexagon
                        result={finalResult}
                        svgRef={svgRef}
                        onReady={(data) => {
                            if (data?.html) setReportHtml(data.html);
                            setHexReady(true);
                        }}
                    />

                    {/* Conteúdo real que será convertido */}
                    <div
                        ref={reportRef}
                        style={{ display: 'none' }}
                        dangerouslySetInnerHTML={{ __html: reportHtml }}
                    />
                </>
            )}
        </div>
    );
}
