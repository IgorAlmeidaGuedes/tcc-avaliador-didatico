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

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem.');
            return;
        }

        setIsLoading(true);

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setMessage('Erro ao atualizar senha.');
        } else {
            setMessage(
                'Senha atualizada com sucesso! Você já pode fazer login.'
            );
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Definir nova senha
                    </CardTitle>
                    <CardDescription>
                        Informe sua nova senha para continuar
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Nova senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirmar senha
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        {message && (
                            <p
                                className={`text-sm text-center ${
                                    message.includes('sucesso')
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
                            {isLoading ? 'Atualizando...' : 'Atualizar senha'}
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
