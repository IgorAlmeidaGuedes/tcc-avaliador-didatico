import { Home, FileText, BarChart3, Info, LogOut } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { supabase } from '@/services/supabase';
import { useNavigate } from 'react-router-dom';

interface AppSidebarProps {
    userName?: string | null;
}

export function AppSidebar({ userName }: AppSidebarProps) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert('Não foi possível desconectar. Tente novamente.');
            return;
        }

        navigate('/login');
    };

    const menuItems = [
        { title: 'Página Inicial', url: '/dashboard', icon: Home },
        { title: 'Formulário', url: '/dashboard/form', icon: FileText },
        { title: 'Relatórios', url: '/dashboard/reports', icon: BarChart3 },
        { title: 'Sobre', url: '/dashboard/Information', icon: Info },
    ];

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-semibold px-4 py-6">
                        Avaliador Didático
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className="flex items-center gap-3"
                                            activeClassName="text-primary font-semibold"
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border p-4">
                <div className="text-sm mb-3 text-sidebar-foreground/80">
                    👋 {userName ?? 'Carregando...'}
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm rounded-md bg-destructive text-destructive-foreground hover:opacity-90 transition"
                >
                    <LogOut className="h-4 w-4" />
                    Sair
                </button>
            </SidebarFooter>
        </Sidebar>
    );
}
