import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';

export default function AppearanceToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return (
        <button
            type="button"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-pressed={isDark}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            className="grid size-10 place-items-center rounded-md border border-[#d9e1d7] text-[#294333] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-[#34443a] dark:text-lime-200 dark:hover:bg-[#1b2820] dark:focus-visible:outline-lime-300"
        >
            {isDark ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
        </button>
    );
}