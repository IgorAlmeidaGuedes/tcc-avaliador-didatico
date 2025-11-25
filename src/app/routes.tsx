import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom';

import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

// Páginas públicas
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

import { Layout } from '@/components/Layout';

// Proteção
import PrivateRoute from '../components/PrivateRoute';

// Páginas internas
import HomePage from '../pages/Dashboard/Home';
import FormPage from '../pages/Dashboard/Form';
import ReportsPage from '../pages/Dashboard/Reports';
import ReportDetailsPage from '../pages/Dashboard/ReportDetails';
import Information from '../pages/Dashboard/Information';

export default function AppRoutes() {
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 🔥 NOVO: escuta mudanças de login/logout
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            window.location.reload();
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const loadUser = async () => {
            const { data, error: sessionError } =
                await supabase.auth.getSession();

            if (sessionError) {
                console.error('❌ Erro na sessão:', sessionError);
            }

            if (!data.session) {
                setIsUserLogged(false);
                setUserName(null);
                setIsLoading(false);
                return;
            }

            const userId = data.session.user.id;

            const { data: user, error: userError } = await supabase
                .from('usuarios')
                .select('nome, auth_user_id')
                .eq('auth_user_id', userId)
                .single();

            if (userError) console.error('❌ Erro na query:', userError);

            setIsUserLogged(true);
            setUserName(user?.nome ?? null);

            setIsLoading(false);
        };

        loadUser();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Carregando...
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                {/* ROTA RAIZ */}
                <Route
                    path="/"
                    element={
                        isUserLogged ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Login />
                        )
                    }
                />

                {/* ROTAS PÚBLICAS */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ROTAS PRIVADAS COM LAYOUT */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute isUserLogged={isUserLogged}>
                            <Layout userName={userName}>
                                <Outlet />
                            </Layout>
                        </PrivateRoute>
                    }
                >
                    <Route index element={<HomePage />} />
                    <Route path="form" element={<FormPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="reports/:id" element={<ReportDetailsPage />} />
                    <Route path="information" element={<Information />} />
                </Route>
            </Routes>
        </Router>
    );
}
