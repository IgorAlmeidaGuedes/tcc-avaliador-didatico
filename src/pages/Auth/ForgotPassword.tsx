import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [messageType, setMessageType] = useState<'success' | 'error'>(
        'error'
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo:
                'https://tcc-avaliador-didatico.vercel.app/reset-password',
        });

        if (error) {
            setMessage('Erro ao enviar o link. Verifique o email informado.');
        } else {
            setMessage('Enviamos um link de recuperação para seu e-mail.');
            setMessageType('success');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Recuperar senha
                    </CardTitle>
                    <CardDescription>
                        Informe seu e-mail para receber o link de recuperação
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {message && (
                            <p
                                className={`text-sm text-center ${
                                    messageType === 'success'
                                        ? 'text-green-600'
                                        : 'text-red-500'
                                }`}
                            >
                                {message}
                            </p>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enviando...' : 'Enviar link'}
                        </Button>

                        <p className="text-sm text-muted-foreground text-center">
                            Lembrou sua senha?{' '}
                            <Link
                                to="/login"
                                className="text-primary hover:underline font-medium"
                            >
                                Voltar ao login
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
