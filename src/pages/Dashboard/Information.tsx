import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ExternalLink, Lightbulb, Heart } from 'lucide-react';

const Sobre = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Sobre o Projeto
                </h1>
                <p className="text-lg text-foreground/90 leading-relaxed">
                    Este projeto nasceu da vontade de aproximar a Computação de
                    algo mais humano, prático e significativo — tanto para quem
                    aprende quanto para quem ensina. Em vez de repetir modelos
                    tradicionais centrados exclusivamente no professor, a
                    proposta aqui é explorar formas de ensino que colocam o
                    estudante em movimento: alguém que constrói entendimento
                    enquanto experimenta, aplica, discute, erra e refaz.
                </p>
            </div>

            {/* Inspiração da Tese */}
            <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Lightbulb className="h-6 w-6 text-primary" />
                        Inspiração e Fundamento Teórico
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-foreground/90 leading-relaxed">
                        Essa visão é fortemente inspirada pela tese{' '}
                        <strong>
                            Didática da Computação na Perspectiva da
                            Aprendizagem Ativa
                        </strong>{' '}
                        (Ronney Moreira de Castro, UNIRIO, 2019).
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="/docs/Tese_Ronney_vfinal.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors group"
                        >
                            <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    Arquivo utilizado
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Tese_Ronney_vfinal.pdf
                                </p>
                            </div>
                        </a>

                        <a
                            href="https://www.researchgate.net/publication/347555296_Didatica_da_Computacao_na_Perspectiva_da_Aprendizagem_Ativa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors group"
                        >
                            <ExternalLink className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    Artigo relacionado
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    ResearchGate
                                </p>
                            </div>
                        </a>
                    </div>

                    <div className="space-y-4 pt-4">
                        <p className="text-foreground/90 leading-relaxed">
                            Na tese, Castro discute como aulas expositivas e
                            lineares — ainda muito comuns em cursos da área —
                            contribuem para a desmotivação e para dificuldades
                            reais de aprendizagem, chegando até a impactar a
                            evasão acadêmica. Ele propõe um modelo próprio para
                            a didática da Computação: o{' '}
                            <strong>Hexágono da Didática</strong>, que amplia a
                            compreensão tradicional da tríade
                            professor–aluno–conteúdo e incorpora novos elementos
                            fundamentais, como tecnologia, estratégias e
                            avaliação.
                        </p>
                        <p className="text-foreground/90 leading-relaxed">
                            Esse hexágono evidencia como cada componente
                            pedagógico interage com os demais e como um bom
                            planejamento conecta essas decisões de forma
                            coerente.
                        </p>
                        <p className="text-foreground/90 leading-relaxed">
                            Além disso, o trabalho se alinha a uma linha de
                            pesquisa focada em{' '}
                            <strong>Aprendizagem Ativa (AA)</strong>, reunindo
                            técnicas, práticas e estudos que valorizam
                            participação, desafios reais, projetos, discussões,
                            problemas abertos e atividades que colocam o aluno
                            como protagonista.
                        </p>
                        <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-6">
                            <p className="text-foreground/90 font-medium italic">
                                No fundo, o Hexágono Didático não é apenas um
                                modelo — é uma lente que ajuda a repensar
                                completamente o ensino de Computação.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Motivação Pessoal */}
            <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Heart className="h-6 w-6 text-primary" />
                        Por que escolhi esse tema
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-foreground/90 leading-relaxed">
                        Meu interesse por esse campo vai muito além da
                        obrigatoriedade de um trabalho acadêmico. Ele nasce de
                        experiências pessoais.
                    </p>
                    <p className="text-foreground/90 leading-relaxed">
                        Sempre tive dificuldade em me envolver com aulas
                        altamente expositivas — aquelas em que o professor fala
                        por longos períodos enquanto os alunos tentam acompanhar
                        passivamente. Esse modelo nunca funcionou pra mim. Em
                        contrapartida, tudo que envolvia prática,
                        experimentação, desafios concretos e aplicações reais
                        fazia muito mais sentido. Era através da ação que eu
                        aprendia melhor.
                    </p>
                    <p className="text-foreground/90 leading-relaxed">
                        Por isso, quando encontrei o conceito de Aprendizagem
                        Ativa e conheci o Hexágono Didático, senti que
                        finalmente tinha encontrado um campo que traduz
                        exatamente aquilo que eu sempre vivi na prática, mesmo
                        sem saber o nome.
                    </p>
                    <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-6">
                        <p className="text-foreground/90 font-medium">
                            Este projeto, então, não é só um requisito acadêmico
                            — é um espaço para explorar novas formas de ensinar
                            Computação, fugindo da lógica do "professor fala,
                            aluno escuta" e caminhando para um ambiente onde o
                            estudante realmente vive o conhecimento.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Sobre;
