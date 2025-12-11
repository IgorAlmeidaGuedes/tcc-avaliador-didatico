import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface Question {
    id: number;
    texto: string;
    tipo_id: number;
    questionario_id: number;
}

interface Option {
    id: number;
    texto: string;
    ordem: number;
}

interface QuestionnaireProps {
    onFinish: (result: Record<number, boolean>) => void;
}

export default function Questionnaire({ onFinish }: QuestionnaireProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [options, setOptions] = useState<Option[]>([]);

    const [currentType, setCurrentType] = useState<number | null>(null);

    const [usedQuestions, setUsedQuestions] = useState<
        Record<number, number[]>
    >({});

    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
        null
    );

    const [typeResult, setTypeResult] = useState<Record<number, boolean>>({});

    const [isLoading, setIsLoading] = useState(true);
    const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
    const [finished, setFinished] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [typePoints, setTypePoints] = useState<Record<number, number>>({});
    const totalPoints = Object.values(typePoints).reduce((a, b) => a + b, 0);

    useEffect(() => {
        async function loadData() {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const { data: questionsData, error: questionsError } =
                    await supabase
                        .from('perguntas')
                        .select('*')
                        .eq('questionario_id', 1)
                        .order('id', { ascending: true });

                const { data: optionsData, error: optionsError } =
                    await supabase
                        .from('opcoes')
                        .select('*')
                        .order('ordem', { ascending: true });

                if (questionsError || optionsError) {
                    setErrorMessage('Erro ao carregar questionário.');
                    return;
                }

                setQuestions(questionsData || []);
                setOptions(optionsData || []);

                if (questionsData && questionsData.length > 0) {
                    const firstType = questionsData[0].tipo_id;
                    setCurrentType(firstType);
                }
            } catch {
                setErrorMessage('Erro inesperado ao carregar os dados.');
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    useEffect(() => {
        if (!currentType) return;

        const next = pickRandomQuestion(currentType);
        setCurrentQuestion(next);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentType]);

    useEffect(() => {
        if (finished) onFinish(typeResult);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finished]);

    function pickRandomQuestion(tipoId: number): Question | null {
        const all = questions.filter((q) => q.tipo_id === tipoId);
        const already = usedQuestions[tipoId] || [];

        const remaining = all.filter((q) => !already.includes(q.id));

        if (remaining.length === 0) return null;

        const random = remaining[Math.floor(Math.random() * remaining.length)];

        setUsedQuestions((prev) => ({
            ...prev,
            [tipoId]: [...(prev[tipoId] || []), random.id],
        }));

        return random;
    }

    const optionYes = options.find((o) => o.texto.toLowerCase() === 'sim');
    const optionNo = options.find(
        (o) =>
            o.texto.toLowerCase() === 'não' || o.texto.toLowerCase() === 'nao'
    );
    const optionPartial = options.find(
        (o) => o.texto.toLowerCase() === 'parcialmente'
    );

    function handleAnswer() {
        if (!currentQuestion) return;
        if (currentAnswer == null) {
            setErrorMessage('Selecione uma opção antes de continuar.');
            return;
        }

        setErrorMessage(null);

        if (currentAnswer === optionYes?.id || currentAnswer === optionNo?.id) {
            setTypeResult((prev) => ({
                ...prev,
                [currentType!]: currentAnswer === optionYes?.id,
            }));

            setTypePoints((prev) => ({
                ...prev,
                [currentType!]: 3,
            }));

            goToNextType();
            return;
        }

        if (currentAnswer === optionPartial?.id) {
            setTypePoints((prev) => ({
                ...prev,
                [currentType!]: Math.min((prev[currentType!] || 0) + 1, 3),
            }));

            const nextQ = pickRandomQuestion(currentType!);

            if (!nextQ) {
                goToNextType();
                return;
            }

            setCurrentQuestion(nextQ);
            setCurrentAnswer(null);
            return;
        }
    }

    function goToNextType() {
        const types = [...new Set(questions.map((q) => q.tipo_id))].sort(
            (a, b) => a - b
        );

        const index = types.indexOf(currentType!);

        // Tem próximo tipo?
        if (index < types.length - 1) {
            const nextType = types[index + 1];
            setCurrentType(nextType);
            setCurrentAnswer(null);
            return;
        }

        // Não tem → terminou
        setFinished(true);
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">
                        Carregando questionário...
                    </p>
                </div>
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <p className="text-center mt-10">
                Erro: Nenhuma pergunta disponível.
            </p>
        );
    }

    if (finished) {
        return (
            <div className="flex items-center justify-center py-6">
                <Card className="max-w-md">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <CheckCircle2 className="h-16 w-16 text-primary" />
                            <CardTitle className="text-2xl">
                                Resultado enviado
                            </CardTitle>
                            <p className="text-muted-foreground">
                                O gráfico será mostrado a seguir.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-6 gap-6">
            <div className="w-full max-w-2xl h-2 bg-muted rounded overflow-hidden">
                <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(totalPoints / 45) * 100}%` }}
                />
            </div>

            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        {currentQuestion.texto}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {errorMessage && (
                        <Alert variant="destructive">
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}

                    <RadioGroup
                        value={
                            currentAnswer !== null
                                ? currentAnswer.toString()
                                : ''
                        }
                        onValueChange={(value) =>
                            setCurrentAnswer(Number(value))
                        }
                        className="space-y-3"
                    >
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors cursor-pointer ${
                                    currentAnswer === option.id
                                        ? 'bg-primary/5 border-primary'
                                        : 'border-border hover:bg-accent'
                                }`}
                                onClick={() => setCurrentAnswer(option.id)}
                            >
                                <RadioGroupItem
                                    value={option.id.toString()}
                                    id={`option-${option.id}`}
                                />
                                <Label
                                    htmlFor={`option-${option.id}`}
                                    className="flex-1 cursor-pointer font-normal"
                                >
                                    {option.texto}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>

                    <Button
                        onClick={handleAnswer}
                        disabled={currentAnswer == null}
                        className="w-full"
                        size="lg"
                    >
                        Próxima
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
