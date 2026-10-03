import { Link, usePage } from '@inertiajs/react';
import { BriefcaseBusiness } from 'lucide-react';
import type { Props } from '../Typs';
import Jop from './Jop';
import Search from './Search';

export default function Joppage({ vacancies }: Props) {
    const { auth } = usePage().props;

    return (
        <main className="min-h-screen bg-stone-50 px-5 py-8 text-stone-900 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase text-emerald-800">Opportunities</p>
                        <h1 className="text-3xl font-semibold sm:text-4xl">Find work that moves you forward.</h1>
                        <p className="mt-2 text-sm text-stone-500">Welcome back, {auth.user.name}. Your next chapter could start here.</p>
                    </div>
                </header>

                <Search />

                <section aria-label="Job listings" className="mt-6">
                    <div className="mb-3 flex items-center justify-between gap-4 px-1">
                        <h2 className="text-sm font-semibold text-stone-800">Latest opportunities</h2>
                        <p className="text-xs text-stone-500">
                            {vacancies.from ?? 0}–{vacancies.to ?? 0} of {vacancies.total}
                        </p>
                    </div>

                    {vacancies.data.length > 0 ? (
                        <div className="space-y-3">
                            {vacancies.data.map((job) => <Jop key={job.id} Jop={job} />)}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
                            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                                <BriefcaseBusiness aria-hidden="true" className="size-5" />
                            </div>
                            <h2 className="text-lg font-semibold">No matching jobs yet</h2>
                            <p className="mt-2 text-sm text-stone-500">Try a different search or broaden your filters.</p>
                        </div>
                    )}

                    {vacancies.last_page > 1 && (
                        <nav aria-label="Job listing pages" className="mt-6 flex flex-wrap justify-center gap-1">
                            {vacancies.links.map((page, index) => (
                                page.url ? (
                                    <Link
                                        key={`${page.label}-${index}`}
                                        href={page.url}
                                        aria-current={page.active ? 'page' : undefined}
                                        className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm transition ${page.active ? 'border-emerald-800 bg-emerald-800 text-white' : 'border-stone-200 bg-white text-stone-700 hover:border-emerald-700 hover:text-emerald-800'}`}
                                    >
                                        {page.label}
                                    </Link>
                                ) : (
                                    <span key={`${page.label}-${index}`} aria-hidden="true" className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-stone-100 px-3 text-sm text-stone-300">
                                        {page.label}
                                    </span>
                                )
                            ))}
                        </nav>
                    )}
                </section>
            </div>
        </main>
    );
}