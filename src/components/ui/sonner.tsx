import * as React from 'react';
import { Toaster } from 'sonner';

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

export const ToastMessage: React.FC<{ message: string }> = ({ message }) => {
    return <div>{message}</div>;
};

export { Toaster };
