import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/globals.css';

import { ThemeProvider } from '@/components/theme-provider';

console.log('URL =', import.meta.env.VITE_SUPABASE_URL);
console.log('KEY =', import.meta.env.VITE_SUPABASE_ANON_KEY);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
