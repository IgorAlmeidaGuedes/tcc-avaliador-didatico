import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    isUserLogged: boolean;
    children: JSX.Element;
}

export default function PrivateRoute({
    isUserLogged,
    children,
}: PrivateRouteProps) {
    if (!isUserLogged) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
