import { Head, Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { login } from '@/routes';
import { useAppearance } from '@/hooks/use-appearance';

export default function Welcome() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] transition-colors dark:bg-[#0a0a0a] dark:text-white lg:justify-center lg:p-8">
                <button
                    type="button"
                    onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                    className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                    {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </button>
                <main className="h-100 w-full">
                    <motion.div
                        className="mx-auto w-full translate-y-30 items-center text-center sm:w-1/2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-5xl font-bold text-[#d86b3d]">Welcomee</h1>
                        <span className="inline-block text-4xl font-bold italic text-[#1b1b18] dark:text-white sm:text-5xl">
                            to wazayif Zearo
                        </span>
                        <p className="text-slate-600 dark:text-slate-300">
                            Lorem ipsum dolor sit amet.
                        </p>
                        <div className="mx-auto mt-5 flex w-full justify-center sm:w-1/2">
                            <Link
                                className="w-1/2 cursor-pointer rounded-lg bg-[#d86b3d] px-4 py-2 text-xl font-bold text-white"
                                href={login()}
                            >
                                Login
                            </Link>
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
