import { router, usePage } from '@inertiajs/react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useState } from 'react';
import { index } from '@/actions/App/Http/Controllers/JopAPPController';
import { Link } from '@inertiajs/react';

const filters = ['All', 'Full-time', 'Remote', 'Hybrid', 'Contract'];

export default function Search() {
    const { url } = usePage();
    const queryParams = new URL(url, 'http://localhost').searchParams;
    const [search, setSearch] = useState(queryParams.get('query') ?? '');
    const activeFilter = queryParams.get('Fillter') ?? 'All';

    function submitSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        router.get(index.url({ mergeQuery: { query: search.trim() } }));
    }

    return (
        <section aria-label="Search and filter jobs" className="rounded-lg border border-stone-200 bg-white p-4 sm:p-5">
            <form onSubmit={submitSearch} className="flex gap-2">
                <label className="relative min-w-0 flex-1">
                    <span className="sr-only">Search job titles</span>
                    <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search job titles"
                        className="h-11 w-full rounded-lg border border-stone-200 bg-stone-50 pl-10 pr-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                    />
                </label>
                <button type="submit" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-emerald-800 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
                    <SearchIcon aria-hidden="true" className="size-4 sm:hidden" />
                    <span className="hidden sm:inline">Search</span>
                </button>
                {search && (
                    <Link href={index.url()} aria-label="Clear search" title="Clear search" className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition hover:bg-stone-50 hover:text-stone-900">
                        <X aria-hidden="true" className="size-4" />
                    </Link>
                )}
            </form>

            <nav aria-label="Filter by work arrangement" className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {filters.map((filter) => {
                    const href = filter === 'All' ? index.url() : index.url({ mergeQuery: { Fillter: filter } });
                    const active = activeFilter === filter;

                    return (
                        <Link
                            key={filter}
                            href={href}
                            aria-current={active ? 'page' : undefined}
                            className={`inline-flex h-9 shrink-0 items-center rounded-md border px-3 text-sm font-medium transition ${active ? 'border-emerald-800 bg-emerald-800 text-white' : 'border-stone-200 bg-white text-stone-600 hover:border-emerald-700 hover:text-emerald-800'}`}
                        >
                            {filter}
                        </Link>
                    );
                })}
            </nav>
        </section>
    );
}