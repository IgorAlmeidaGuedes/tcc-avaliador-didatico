import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import { NavLink } from '@/components/navigation/NavLink';

const Home = () => {
    const hexagonElements = [
        'Professor',
        'Aluno',
        'Conteúdo',
        'Objetivos',
        'Técnicas e Recursos',
        'Organização/Sociedade',
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                    Bem-vindo ao Avaliador Didático
                </h1>
                <p className="text-xl text-muted-foreground">
                    Baseado no Hexágono da Didática
                </p>
            </div>

            <Card className="bg-gradient-card border-primary/20">
                <CardContent className="pt-6 space-y-4">
                    <p className="text-lg leading-relaxed">
                        Este sistema foi criado para ajudar professores a
                        refletirem sobre suas práticas de ensino de forma{' '}
                        <strong className="text-primary">
                            simples, rápida e acessível
                        </strong>
                        .
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Ele utiliza os mesmos princípios explorados nas
                        entrevistas da tese{' '}
                        <em>
                            "Didática da Computação na Perspectiva da
                            Aprendizagem Ativa"
                        </em>
                        , de Ronney Moreira de Castro, transformando o processo
                        em uma experiência digital interativa.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Como funciona?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                        Você responde a um conjunto de perguntas sobre sua
                        prática docente. A partir dessas respostas, o sistema
                        identifica como suas ações se relacionam com os
                        elementos do <strong>Hexágono da Didática</strong>:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {hexagonElements.map((element) => (
                            <div
                                key={element}
                                className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border"
                            >
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="font-medium">{element}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed pt-4">
                        Com isso, você obtém uma{' '}
                        <strong className="text-foreground">
                            visão clara e personalizada
                        </strong>{' '}
                        de como sua prática se conecta a cada uma dessas áreas —
                        e onde existem oportunidades de ampliar ou fortalecer
                        sua abordagem pedagógica.
                    </p>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="h-5 w-5 text-primary" />
                            Formulário
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Responda às perguntas que representam situações reais da
                        prática docente. O sistema analisa suas respostas
                        automaticamente.
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="h-5 w-5 text-secondary" />
                            Relatórios
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Veja seu resultado de forma visual e objetiva: quais
                        conexões do Hexágono você fortalece e quais podem ser
                        desenvolvidas.
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="h-5 w-5 text-accent" />
                            Sobre
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Informações sobre o projeto, seus objetivos e quem o
                        desenvolveu.
                    </CardContent>
                </Card>
            </div>

            <Card className="border-secondary/30">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Por que isso é útil?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        Refletir sobre nossa própria prática é uma das formas
                        mais valiosas de crescer como docente.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        O sistema{' '}
                        <strong className="text-foreground">
                            não faz julgamentos
                        </strong>{' '}
                        — ele apenas mostra como suas respostas se relacionam
                        com as categorias do Hexágono, permitindo que você
                        visualize suas escolhas didáticas de um jeito novo.
                    </p>
                    <p className="text-lg font-semibold text-secondary">
                        Seu resultado é apenas para você.
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-hero text-primary-foreground border-0">
                <CardContent className="pt-6 text-center space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">
                            Como começar?
                        </h2>
                        <p className="text-primary-foreground/90">
                            Clique em <strong>Formulário</strong> na barra
                            lateral e inicie sua reflexão.
                        </p>
                        <p className="text-primary-foreground/90">
                            Leva poucos minutos — e pode trazer insights
                            importantes sobre sua prática em sala de aula.
                        </p>
                    </div>
                    <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="font-semibold"
                    >
                        <NavLink
                            to="/dashboard/form"
                            className="inline-flex items-center gap-2"
                        >
                            Iniciar Avaliação
                            <ArrowRight className="h-5 w-5" />
                        </NavLink>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
