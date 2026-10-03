import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import { motion } from 'motion/react';
import AppearanceToggle from '../components/appearance-toggle';
import { Jops, login, Rejester } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Find your next opportunity" />
            <div className="min-h-screen overflow-hidden bg-[#f4f7f2] text-[#17241d] transition-colors duration-300 dark:bg-[#111814] dark:text-[#f1f4ed]">
                <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10 lg:py-6">
                    <Link href="/" className="flex items-center gap-3" aria-label="Wazayif Zearo home">
                        <span className="grid size-10 place-items-center rounded-md bg-emerald-800 text-white dark:bg-lime-300 dark:text-[#152019]">
                            <BriefcaseBusiness aria-hidden="true" className="size-5" />
                        </span>
                        <span className="text-sm font-bold sm:text-base">Wazayif Zearo</span>
                    </Link>

                    <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-3">
                        <AppearanceToggle />
                        {!auth.user && (
                            <>
                                <Link href={login()} className="hidden rounded-md px-3 py-2 text-sm font-semibold text-[#294333] transition hover:bg-white sm:inline-flex dark:text-[#d8e2d8] dark:hover:bg-[#1b2820]">
                                    Sign in
                                </Link>
                                <Link href={Rejester()} className="hidden items-center gap-2 rounded-md bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 sm:inline-flex dark:bg-lime-300 dark:text-[#152019] dark:hover:bg-lime-200">
                                    Join free <ArrowUpRight aria-hidden="true" className="size-4" />
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="mx-auto grid min-h-[calc(100svh-88px)] w-full max-w-7xl items-center gap-10 px-5 pb-10 pt-4 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:px-10 lg:pb-12 lg:pt-2">
                    <motion.section
                        aria-labelledby="welcome-heading"
                        className="max-w-2xl py-5 sm:py-8 lg:py-12"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                    >
                        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase text-emerald-800 dark:text-lime-300">
                            <span aria-hidden="true" className="h-px w-7 bg-current" />
                            Your next chapter starts here
                        </p>
                        <h1 id="welcome-heading" className="max-w-xl font-serif text-[2.8rem] leading-[1.04] sm:text-6xl lg:text-7xl">
                            Find work that <span className="italic text-emerald-800 dark:text-lime-300">moves you forward.</span>
                        </h1>
                        <p className="mt-6 max-w-lg text-base leading-7 text-[#5c6a60] sm:text-lg dark:text-[#b3c0b5]">
                            Make your next move with opportunities built around your skills, ambitions, and the life you want to lead.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                            {auth.user ? (
                                <Link href={Jops()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 dark:bg-lime-300 dark:text-[#152019] dark:hover:bg-lime-200">
                                    Explore opportunities <ArrowUpRight aria-hidden="true" className="size-4" />
                                </Link>
                            ) : (
                                <Link href={Rejester()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 dark:bg-lime-300 dark:text-[#152019] dark:hover:bg-lime-200">
                                    Start your search <ArrowUpRight aria-hidden="true" className="size-4" />
                                </Link>
                            )}
                            {!auth.user && (
                                <Link href={login()} className="inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-[#294333] transition hover:bg-white dark:text-[#d8e2d8] dark:hover:bg-[#1b2820]">
                                    I already have an account
                                </Link>
                            )}
                        </div>

                        <div className="mt-10 flex items-center gap-3 border-t border-[#d9e1d7] pt-5 text-sm text-[#5c6a60] dark:border-[#34443a] dark:text-[#b3c0b5]">
                            <span className="grid size-8 place-items-center rounded-full bg-[#e3ebe1] text-emerald-900 dark:bg-[#25372b] dark:text-lime-200">
                                <BriefcaseBusiness aria-hidden="true" className="size-4" />
                            </span>
                            A more considered way to find your next role.
                        </div>
                    </motion.section>

                    <motion.figure
                        className="relative isolate aspect-4/3 w-full overflow-hidden rounded-md bg-[#20382c] sm:aspect-5/4 lg:aspect-[0.86]"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1500&q=85"
                            alt="Colleagues sharing ideas around a table"
                            className="absolute inset-0 size-full object-cover"
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#102018]/85 via-[#102018]/10 to-transparent" />
                        <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                            <p className="text-xs font-bold uppercase">Make room for what comes next</p>
                            <p className="mt-2 max-w-sm font-serif text-2xl leading-tight sm:text-3xl">A good opportunity can change everything.</p>
                        </figcaption>
                    </motion.figure>
                </main>
            </div>
        </>
    );
}

