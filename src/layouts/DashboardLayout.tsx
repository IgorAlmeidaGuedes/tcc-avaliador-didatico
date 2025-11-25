import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

interface DashboardLayoutProps {
    userName: string | null;
}

export default function DashboardLayout({ userName }: DashboardLayoutProps) {
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                backgroundColor: '#f5f6fa',
                fontFamily: 'sans-serif',
            }}
        >
            <Sidebar userName={userName} />

            <main
                style={{
                    flex: 1,
                    padding: '30px',
                    overflowY: 'auto',
                }}
            >
                <Outlet />
            </main>
        </div>
    );
}
