import { Link } from '@inertiajs/react';
import { BookOpen, Building2, FolderGit2, FolderKanban, LayoutGrid, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as categoriesIndex } from '@/routes/Jopcategoury';
import { index as usersIndex } from '@/routes/Users';
import type { NavItem } from '@/types';
import { index as VacanciesIndex} from '@/routes/Jopvacancies';
import { index as Jopapplication} from '@/routes/Jopapplication';
import companies from '@/routes/companies';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        Role:'admin'
    },
    {
        title: 'Users',
        href: usersIndex(),
        icon: Users,
        Role:'admin'

    },
    {
        title: 'Companies',
        href:companies.index(),
        icon: Building2,
        Role:'owner'

    },
    {
        title: 'Categories',
        href: categoriesIndex(),
        icon: FolderKanban,
        Role:'admin'
    },
    {
        title: 'jopvacancess',
        href:VacanciesIndex(),
        icon: FolderKanban,
        Role:'owner'
    },
    {
        title: 'Jopapplication',
        href:Jopapplication(),
        icon: FolderKanban,
        Role:'owner'
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
        Role:'admin'
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
        Role:'admin'
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-brand-primary/80 bg-brand-primary text-white">
            <SidebarHeader className="border-b border-white/10">
                <SidebarMenu>
            <SidebarTrigger className="w-full flex aspect-square size-8 items-center justify-center rounded-md bg-brand-accent text-white" />
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="text-white hover:bg-white/10 hover:text-white"
                        >
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-white/10">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
