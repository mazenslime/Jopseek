import { Link } from '@inertiajs/react';
import { BriefcaseBusiness } from 'lucide-react';
import AppearanceToggle from '../../components/appearance-toggle';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-svh overflow-hidden bg-[#f4f7f2] text-[#17241d] transition-colors duration-300 dark:bg-[#111814] dark:text-[#f1f4ed]">
            <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10 lg:py-6">
                <Link href={home()} className="flex items-center gap-3" aria-label="Wazayif Zearo home">
                    <span className="grid size-10 place-items-center rounded-md bg-emerald-800 text-white dark:bg-lime-300 dark:text-[#152019]">
                        <BriefcaseBusiness aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-sm font-bold sm:text-base">Wazayif Zearo</span>
                </Link>
                <AppearanceToggle />
            </header>

            <main className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pb-8 sm:px-8 lg:min-h-[calc(100svh-100px)] lg:grid-cols-[0.92fr_1fr] lg:gap-16 lg:px-10 lg:pb-10">
                <aside className="relative hidden min-h-150 overflow-hidden rounded-md bg-[#20382c] lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1500&q=85"
                        alt="Colleagues sharing ideas around a table"
                        className="absolute inset-0 size-full object-cover"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#102018]/90 via-[#102018]/15 to-[#102018]/10" />
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white xl:p-10">
                        <p className="text-xs font-bold uppercase">Wazayif Zearo</p>
                        <p className="mt-3 max-w-md font-serif text-4xl leading-tight">Your next chapter starts with one good move.</p>
                        <p className="mt-4 text-sm text-white/80">Discover roles. Build what comes next.</p>
                    </div>
                </aside>

                <section className="mx-auto w-full max-w-md py-10 sm:py-14 lg:mx-0 lg:max-w-lg lg:py-8">
                    <p className="mb-3 text-xs font-bold uppercase text-emerald-800 dark:text-lime-300">Your career, moving forward</p>
                    <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
                    <p className="mt-3 text-sm leading-6 text-[#5c6a60] dark:text-[#b3c0b5]">{description}</p>
                    <div className="mt-8">{children}</div>
                </section>
            </main>
        </div>
    );
}
