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

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            setIsLoading(false);
            return;
        }

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) {
                if (signUpError.message?.toLowerCase().includes('already')) {
                    setError(
                        'Este e-mail já está registrado. Tente fazer login.'
                    );
                    return;
                }

                setError('Erro ao criar usuário.');
                return;
            }

            if (!data?.user) {
                setError('Erro inesperado ao registrar sua conta.');
                return;
            }

            const { error: insertError } = await supabase
                .from('usuarios')
                .insert([
                    {
                        nome: name,
                        email,
                        auth_user_id: data.user.id,
                    },
                ]);

            if (insertError) {
                if (insertError.message?.toLowerCase().includes('duplicate')) {
                    setError('Este e-mail já possui cadastro no sistema.');
                    return;
                }

                setError('Erro ao salvar informações do usuário.');
                return;
            }

            setSuccessMessage(
                'Conta criada com sucesso! Confirme o cadastro no seu e-mail.'
            );
        } catch {
            setError('Erro desconhecido durante o cadastro.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Cadastro
                    </CardTitle>
                    <CardDescription>
                        Crie sua conta para começar a usar o sistema
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4">
                        {error && (
                            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        {successMessage && (
                            <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
                                {successMessage}
                            </p>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nome Completo</Label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="Seu nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirmar Senha
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            className="w-full"
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? 'Criando conta...' : 'Cadastrar'}
                        </Button>

                        <p className="text-sm text-muted-foreground text-center">
                            Já tem uma conta?{' '}
                            <Link
                                to="/login"
                                className="text-primary hover:underline font-medium"
                            >
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
