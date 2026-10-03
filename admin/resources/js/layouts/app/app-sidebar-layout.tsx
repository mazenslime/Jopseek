import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                <AppContent variant="sidebar" className="min-w-0 flex-1 overflow-x-clip">
                    {children}
                </AppContent>
            </div>
        </AppShell>
    );
}
