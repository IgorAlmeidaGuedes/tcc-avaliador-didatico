import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/navigation/AppSidebar';
import { ThemeToggle } from './../theme/ThemeToggle';

interface LayoutProps {
    children?: React.ReactNode;
    userName?: string | null;
}

export function Layout({ children, userName }: LayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar userName={userName} />

                <main className="flex-1 w-full">
                    <div
                        className="
    sticky top-0 z-20 bg-background/80 backdrop-blur-sm 
    border-b border-border h-12 px-4 
    flex items-center justify-between
"
                    >
                        <SidebarTrigger />

                        <ThemeToggle />
                    </div>

                    <div className="p-2 md:p-8 lg:p-12">{children}</div>
                </main>
            </div>
        </SidebarProvider>
    );
}
