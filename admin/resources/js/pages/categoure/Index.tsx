import { Head, Link, usePage } from '@inertiajs/react';
import { Archive, FolderKanban, FolderPlus, Plus } from 'lucide-react';
import { useState } from 'react';
import { destroy as destroyCategory } from '@/routes/Jopcategoury';
import Archived from '@/components/Arctiv-Archive';
import CreateCategory from './create';
import UpdateCategory from './update';
import Pagenation from '../Pagenation';

type Category = {
    id: string;
    Name: string;
};

type CategoryPagination = {
    current_page: number;
    data: Category[];
    from: number | null;
    last_page: number;
    links?: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    to: number | null;
    total: number;
};

type Props = {
    jopcateg: CategoryPagination;
};

export default function Categoury({ jopcateg }: Props) {
    const isArchiveView = new URLSearchParams(usePage().url).has('Archive');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    return (
        <>
            <Head title="Categories" />
            <main className="min-h-screen bg-[#f7f8fa] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d86b3d]">
                                    Job management
                                </p>
                                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                    Categories
                                </h1>
                                <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
                                    Organize vacancies into clear groups your team can manage and browse.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsCreateOpen(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173c3a] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#173c3a]/15 transition hover:bg-[#245854]"
                            >
                                <Plus className="size-4" />
                                Add category
                            </button>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            <Stat label={isArchiveView ? 'Archived categories' : 'Total categories'} value={jopcateg.total} tone="emerald" />
                            <Stat label="Categories on this page" value={jopcateg.data.length} tone="amber" />
                            <Stat label="Current page" value={`${jopcateg.current_page} / ${jopcateg.last_page}`} tone="sky" />
                        </div>
                    </header>

                    <Archived href="Jopcategoury" />

                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.03)]">
                        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                            <h2 className="font-semibold text-slate-900">
                                {isArchiveView ? 'Archived categories' : 'All categories'}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {jopcateg.total === 0
                                    ? 'No categories found'
                                    : `${jopcateg.total} ${isArchiveView ? 'archived ' : ''}categories`}
                            </p>
                        </div>

                        {jopcateg.data.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {jopcateg.data.map((category) => (
                                    <article
                                        key={category.id}
                                        className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#dfece8] text-[#173c3a]">
                                                <FolderKanban className="size-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="truncate text-base font-semibold text-slate-900">
                                                    {category.Name}
                                                </h3>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Available for job vacancies
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 sm:justify-end">
                                            <Link
                                                href={destroyCategory.url({ Jopcategoury: category.id })}
                                                method="delete"
                                                as="button"
                                                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Archive className="size-4" />
                                                Archive
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedCategory(category)}
                                                className="rounded-xl bg-[#173c3a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#245854]"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#dfece8] text-[#173c3a]">
                                    <FolderPlus className="size-6" />
                                </div>
                                <h3 className="mt-5 font-semibold text-slate-900">No categories found</h3>
                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                    {isArchiveView
                                        ? 'Archived categories will appear here.'
                                        : 'Add your first category to start organizing job vacancies.'}
                                </p>
                                {!isArchiveView && (
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateOpen(true)}
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#173c3a] hover:text-[#245854]"
                                    >
                                        Create your first category
                                        <Plus className="size-4" />
                                    </button>
                                )}
                            </div>
                        )}
                    </section>

                    <Pagenation links={jopcateg.links ?? []} from={jopcateg.from} to={jopcateg.to} />
                </div>
            </main>

            {isCreateOpen && <CreateCategory onClose={() => setIsCreateOpen(false)} />}
            {selectedCategory && (
                <UpdateCategory category={selectedCategory} onClose={() => setSelectedCategory(null)} />
            )}
        </>
    );
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone: 'emerald' | 'amber' | 'sky' }) {
    const styles = {
        emerald: {
            container: 'border-emerald-100 bg-emerald-50',
            label: 'text-emerald-700',
            value: 'text-emerald-900',
        },
        amber: {
            container: 'border-amber-100 bg-amber-50',
            label: 'text-amber-700',
            value: 'text-amber-900',
        },
        sky: {
            container: 'border-sky-100 bg-sky-50',
            label: 'text-sky-700',
            value: 'text-sky-900',
        },
    };
    const style = styles[tone];

    return (
        <div className={`rounded-2xl border p-4 ${style.container}`}>
            <p className={`text-xs font-medium uppercase tracking-[0.18em] ${style.label}`}>{label}</p>
            <p className={`mt-2 text-2xl font-semibold ${style.value}`}>{value}</p>
        </div>
    );
}
