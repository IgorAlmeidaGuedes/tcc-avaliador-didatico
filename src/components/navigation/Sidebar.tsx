import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface TopbarProps {
    userName: string | null;
}

export default function Topbar({ userName }: TopbarProps) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);

            const { error } = await supabase.auth.signOut();

            if (error) {
                alert('Erro ao desconectar. Tente novamente.');
                return;
            }

            navigate('/login');
        } catch {
            alert('Erro inesperado ao desconectar.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header
            style={{
                width: '100%',
                height: '60px',
                backgroundColor: '#2f3640',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 20px',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 50,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            {/* Nome do App */}
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>
                Avaliador Didático
            </h2>

            {/* Links */}
            <nav
                style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                }}
            >
                <NavLink
                    to="/dashboard/"
                    end
                    style={({ isActive }) => ({
                        color: isActive ? '#00a8ff' : 'white',
                        textDecoration: 'none',
                        fontWeight: isActive ? 'bold' : 'normal',
                    })}
                >
                    Página Inicial
                </NavLink>

                <NavLink
                    to="/dashboard/form"
                    style={({ isActive }) => ({
                        color: isActive ? '#00a8ff' : 'white',
                        textDecoration: 'none',
                        fontWeight: isActive ? 'bold' : 'normal',
                    })}
                >
                    Formulário
                </NavLink>

                <NavLink
                    to="/dashboard/reports"
                    style={({ isActive }) => ({
                        color: isActive ? '#00a8ff' : 'white',
                        textDecoration: 'none',
                        fontWeight: isActive ? 'bold' : 'normal',
                    })}
                >
                    Relatórios
                </NavLink>
            </nav>

            {/* Usuário + Botão Tema + Logout */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                }}
            >
                <ThemeToggle />

                <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                    {userName ? `👋 ${userName}` : 'Usuário'}
                </span>

                <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#e84118',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                    }}
                >
                    {isLoading ? 'Saindo...' : 'Sair'}
                </button>
            </div>
        </header>
    );
}
