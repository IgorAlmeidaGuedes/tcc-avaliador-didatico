import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

import a1 from './1-professor-objetivos.md?raw';
import a2 from './2-objetivos-aluno.md?raw';
import a3 from './3-aluno-tecnicas-recursos.md?raw';
import a4 from './4-tecnicas-recursos-conteudo.md?raw';
import a5 from './5-conteudo-organizacao-sociedade.md?raw';
import a6 from './6-organizacao-sociedade-professor.md?raw';
import a7 from './7-professor-conteudo.md?raw';
import a8 from './8-professor-tecnicas-recursos.md?raw';
import a9 from './9-professor-aluno.md?raw';
import a10 from './10-objetivos-organizacao-sociedade.md?raw';
import a11 from './11-objetivos-conteudo.md?raw';
import a12 from './12-objetivos-tecnicas-recursos.md?raw';
import a13 from './13-aluno-organizacao-sociedade.md?raw';
import a14 from './14-aluno-conteudo.md?raw';
import a15 from './15-tecnicas-recursos-organizacao-sociedade.md?raw';

// ----------------------------
// Markdown-it instance
// ----------------------------
const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
});

// ----------------------------
// APPLY INLINE SVG-SAFE STYLES
// ----------------------------
function injectStyles(html: string): string {
    return (
        html
            .replace(
                /<h1>/g,
                `<h1 style="font-size:22px; margin-bottom:12px; font-weight:bold;">`
            )
            .replace(
                /<h2>/g,
                `<h2 style="font-size:18px; margin-top:20px; margin-bottom:10px; font-weight:bold;">`
            )
            .replace(/<p>/g, `<p style="margin:10px 0; line-height:1.6;">`)
            .replace(/<strong>/g, `<strong style="font-weight:bold;">`)

            // REMOVE A TAG <ul> inteira
            .replace(/<ul>/g, '')
            .replace(/<\/ul>/g, '')

            // LISTAS → transformar <li> em parágrafos com bullet
            .replace(
                /<li>/g,
                `<p style="margin:6px 0 6px 20px; line-height:1.6;">• `
            )
            .replace(/<\/li>/g, `</p>`)
    );
}

// ----------------------------
// Markdown to sanitized HTML
// ----------------------------
function parse(markdown: string): string {
    const rawHtml = md.render(markdown);
    const styledHtml = injectStyles(rawHtml);
    return DOMPurify.sanitize(styledHtml);
}

// ----------------------------
// Arestas export
// ----------------------------
export interface ArestaDescricao {
    id: number;
    nome: string;
    descricao: string;
}

export const ARESTAS: ArestaDescricao[] = [
    { id: 1, nome: 'Professor - Objetivos', descricao: parse(a1) },
    { id: 2, nome: 'Objetivos - Aluno', descricao: parse(a2) },
    { id: 3, nome: 'Aluno - Técnicas e Recursos', descricao: parse(a3) },
    { id: 4, nome: 'Técnicas e Recursos - Conteúdo', descricao: parse(a4) },
    { id: 5, nome: 'Conteúdo - Organização/Sociedade', descricao: parse(a5) },
    { id: 6, nome: 'Organização/Sociedade - Professor', descricao: parse(a6) },
    { id: 7, nome: 'Professor - Conteúdo', descricao: parse(a7) },
    { id: 8, nome: 'Professor - Técnicas e Recursos', descricao: parse(a8) },
    { id: 9, nome: 'Professor - Aluno', descricao: parse(a9) },
    {
        id: 10,
        nome: 'Objetivos - Organização/Sociedade',
        descricao: parse(a10),
    },
    { id: 11, nome: 'Objetivos - Conteúdo', descricao: parse(a11) },
    { id: 12, nome: 'Objetivos - Técnicas e Recursos', descricao: parse(a12) },
    { id: 13, nome: 'Aluno - Organização/Sociedade', descricao: parse(a13) },
    { id: 14, nome: 'Aluno - Conteúdo', descricao: parse(a14) },
    {
        id: 15,
        nome: 'Técnicas e Recursos - Organização/Sociedade',
        descricao: parse(a15),
    },
];
