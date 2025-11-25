import * as React from 'react';
import { Toaster } from 'sonner';

// Componente wrapper do Toaster
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <>
            {children}
            <Toaster position="top-right" />
        </>
    );
};

// Exemplo de componente toast individual (opcional)
export const ToastMessage: React.FC<{ message: string }> = ({ message }) => {
    return <div>{message}</div>;
};

export {
    Toaster, // Componente wrapper do Toaster
};
