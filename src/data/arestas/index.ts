// /src/data/arestas/index.ts

// Importa os arquivos Markdown
import a1 from './1-professor-objetivos.md';
import a2 from './2-objetivos-aluno.md';
import a3 from './3-aluno-tecnicas-recursos.md';
import a4 from './4-tecnicas-recursos-conteudo.md';
import a5 from './5-conteudo-organizacao-sociedade.md';
import a6 from './6-organizacao-sociedade-professor.md';
import a7 from './7-professor-conteudo.md';
import a8 from './8-professor-tecnicas-recursos.md';
import a9 from './9-professor-aluno.md';
import a10 from './10-objetivos-organizacao-sociedade.md';
import a11 from './11-objetivos-conteudo.md';
import a12 from './12-objetivos-tecnicas-recursos.md';
import a13 from './13-aluno-organizacao-sociedade.md';
import a14 from './14-aluno-conteudo.md';
import a15 from './15-tecnicas-recursos-organizacao-sociedade.md';

// Define o formato do objeto
export interface ArestaDescricao {
    id: number;
    nome: string;
    descricao: string; // HTML gerado pelo markdown-loader
}

// Os nomes oficiais das arestas (iguais aos que você usa no gráfico)
export const ARESTAS: ArestaDescricao[] = [
    { id: 1, nome: 'Professor - Objetivos', descricao: a1 },
    { id: 2, nome: 'Objetivos - Aluno', descricao: a2 },
    { id: 3, nome: 'Aluno - Técnicas e Recursos', descricao: a3 },
    { id: 4, nome: 'Técnicas e Recursos - Conteúdo', descricao: a4 },
    { id: 5, nome: 'Conteúdo - Organização/Sociedade', descricao: a5 },
    { id: 6, nome: 'Organização/Sociedade - Professor', descricao: a6 },
    { id: 7, nome: 'Professor - Conteúdo', descricao: a7 },
    { id: 8, nome: 'Professor - Técnicas e Recursos', descricao: a8 },
    { id: 9, nome: 'Professor - Aluno', descricao: a9 },
    { id: 10, nome: 'Objetivos - Organização/Sociedade', descricao: a10 },
    { id: 11, nome: 'Objetivos - Conteúdo', descricao: a11 },
    { id: 12, nome: 'Objetivos - Técnicas e Recursos', descricao: a12 },
    { id: 13, nome: 'Aluno - Organização/Sociedade', descricao: a13 },
    { id: 14, nome: 'Aluno - Conteúdo', descricao: a14 },
    {
        id: 15,
        nome: 'Técnicas e Recursos - Organização/Sociedade',
        descricao: a15,
    },
];
