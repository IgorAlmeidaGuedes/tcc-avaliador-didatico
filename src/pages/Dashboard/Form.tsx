/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

// src/pages/Form.tsx
import { useEffect, useRef, useState } from 'react';
import Questionnaire from './Questionnaire';
import Hexagon from '../../components/charts/Hexagon';
import { supabase } from '../../services/supabase';

// pdfMake imports (TypeScript-friendly)v av  av v v
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

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

            const svgString = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);

            const svgImage = await loadImage(svgUrl);
            const hexagonBase64 = svgImageToBase64(svgImage);

            URL.revokeObjectURL(svgUrl);

            let rawHTML = reportRef.current?.innerHTML ?? '';
            rawHTML = normalizeBullets(rawHTML);
            const contentBlocks = await htmlToPdfBlocks(rawHTML);

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

    function normalizeBullets(html: string) {
        const bulletRegex = /<p[^>]*>\s*•\s*(.*?)<\/p>/g;

        const items = [];
        let match;

        while ((match = bulletRegex.exec(html)) !== null) {
            items.push(match[1]);
        }

        if (items.length === 0) return html;

        let cleaned = html.replace(bulletRegex, '');

        const ul = `
        <ul>
            ${items.map((i) => `<li>${i}</li>`).join('')}
        </ul>
    `;

        cleaned = cleaned.replace('</div>', `${ul}</div>`);

        return cleaned;
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

async function htmlToPdfBlocks(rawHTML: string): Promise<any[]> {
    if (!rawHTML) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHTML, 'text/html');

    function extractInlineStyle(el: Element) {
        const styleText = el.getAttribute('style') || '';
        const style: any = {};

        if (/font-weight:\s*(bold|700|600)/i.test(styleText)) style.bold = true;
        if (/font-style:\s*italic/i.test(styleText)) style.italics = true;
        if (/text-decoration:\s*underline/i.test(styleText))
            style.decoration = 'underline';

        const fsMatch = styleText.match(/font-size:\s*([0-9.]+)px/i);
        if (fsMatch) style.fontSize = Number(fsMatch[1]);

        return style;
    }

    function normalizeText(text: string) {
        return text.replace(/\s+/g, ' ').trimStart();
    }

    function inlineChunksFromNode(
        node: ChildNode
    ): Array<string | Record<string, any>> {
        if (node.nodeType === Node.TEXT_NODE) {
            const normalized = normalizeText(node.textContent ?? '');
            return normalized ? [normalized] : [];
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            const tag = el.tagName.toLowerCase();
            const childChunks = Array.from(el.childNodes).flatMap(
                inlineChunksFromNode
            );
            const styled = extractInlineStyle(el);

            const styledChunks = childChunks.map((chunk) =>
                typeof chunk === 'string'
                    ? { text: chunk, ...styled }
                    : { ...chunk, ...styled }
            );

            switch (tag) {
                case 'strong':
                case 'b':
                    return styledChunks.map((c) => ({ ...c, bold: true }));

                case 'em':
                case 'i':
                    return styledChunks.map((c) => ({ ...c, italics: true }));

                case 'u':
                    return styledChunks.map((c) => ({
                        ...c,
                        decoration: 'underline',
                    }));

                case 'a':
                    const href = el.getAttribute('href') || '';
                    return styledChunks.map((c) => ({
                        ...c,
                        link: href,
                        decoration: 'underline',
                    }));

                case 'br':
                    return ['\n'];

                default:
                    return styledChunks;
            }
        }

        return [];
    }

    function flattenChunks(chunks: Array<string | Record<string, any>>) {
        const out: Array<string | Record<string, any>> = [];

        for (const c of chunks) {
            if (typeof c === 'string') {
                const trimmed = c.trimEnd();
                const last = out[out.length - 1];

                if (typeof last === 'string') {
                    out[out.length - 1] = last + ' ' + trimmed;
                } else {
                    out.push(trimmed);
                }
            } else {
                out.push(c);
            }
        }

        return out;
    }

    function blockFromElement(el: Element): any | null {
        const tag = el.tagName.toLowerCase();

        if (/^h[1-6]$/.test(tag)) {
            const level = Number(tag[1]);
            const chunks = flattenChunks(
                Array.from(el.childNodes).flatMap(inlineChunksFromNode)
            );

            return {
                text: chunks,
                bold: true,
                fontSize: 20 - level * 2,
                margin: [0, 10, 0, 6],
            };
        }

        if (tag === 'p') {
            const chunks = flattenChunks(
                Array.from(el.childNodes).flatMap(inlineChunksFromNode)
            );
            if (!chunks.length) return null;

            return {
                text: chunks,
                margin: [0, 4, 0, 10],
            };
        }

        if (tag === 'div') {
            const chunks = flattenChunks(
                Array.from(el.childNodes).flatMap(inlineChunksFromNode)
            );
            if (!chunks.length) return null;

            return {
                text: chunks,
                margin: [0, 4, 0, 10],
            };
        }

        if (tag === 'ul' || tag === 'ol') {
            const items = Array.from(el.querySelectorAll(':scope > li')).map(
                (li) => {
                    const liChunks = flattenChunks(
                        Array.from(li.childNodes).flatMap(inlineChunksFromNode)
                    );
                    return liChunks.length === 1 &&
                        typeof liChunks[0] === 'string'
                        ? liChunks[0]
                        : liChunks;
                }
            );

            return tag === 'ul'
                ? { ul: items, margin: [0, 6, 0, 10] }
                : { ol: items, margin: [0, 6, 0, 10] };
        }

        const chunks = flattenChunks(
            Array.from(el.childNodes).flatMap(inlineChunksFromNode)
        );
        if (!chunks.length) return null;

        return { text: chunks, margin: [0, 4, 0, 10] };
    }

    const blocks: any[] = [];

    for (const child of Array.from(doc.body.childNodes)) {
        if (child.nodeType === Node.TEXT_NODE) {
            const txt = normalizeText(child.textContent || '');
            if (txt.trim()) blocks.push({ text: txt, margin: [0, 4, 0, 10] });
            continue;
        }

        if (child.nodeType === Node.ELEMENT_NODE) {
            const block = blockFromElement(child as Element);
            if (block) blocks.push(block);
        }
    }

    return blocks;
}
