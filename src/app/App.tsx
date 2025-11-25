import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';

const queryClient = new QueryClient();

console.log('VITE_SUPABASE_URL =', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY =', import.meta.env.VITE_SUPABASE_ANON_KEY);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <AppRoutes />
            </TooltipProvider>
        </QueryClientProvider>
    );
}
