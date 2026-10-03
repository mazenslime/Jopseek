import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Archive,
    ArrowLeft,
    ArrowRight,
    BriefcaseBusiness,
    FolderPlus,
    Layers3,
} from 'lucide-react';
import { destroy as destroyCategory, index } from '@/routes/Jopcategoury';
import { useEffect, useMemo, useState } from 'react';
import CreateCategory from './create';
import UpdateCategory from './update';
import Pagenation from '../Pagenation';
const prams=new URLSearchParams()
type Category = {
    id: string;
    Name: string;
};

type CategoryPagination = {
    current_page: number;
    data: Category[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
    links?: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};

type Props = {
    jopcateg: CategoryPagination;
    archiveCount?: number;
};
export default function Categoury({ jopcateg }: Props) {
    const { url } = usePage();
    const prams= new URLSearchParams(url);
    const { flash } = usePage().props as {
        flash?: {
            message?: string;
        };
    };
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        if (flash) {
            console.log(flash.message);
        }
    }, [flash]);

    return (
        <>
            <Head title="Categories" />
            <main className="min-h-full bg-[#f5f7fb] px-4 py-8 text-[#172033] sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-8">
                    <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#61708a]">
                                Job management
                            </p>
                            <h1 className="text-4xl font-semibold tracking-tight text-[#172033]">
                                Categories
                            </h1>
                            <p className="mt-2 max-w-lg text-sm leading-6 text-[#61708a]">
                                Organize vacancies into simple, searchable groups for your team.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsCreateOpen(true)}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#3157d5] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2747b7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3157d5]"
                        >
                            <FolderPlus className="size-4" />
                            Add category
                        </button>
                    </header>
                    <div className='flex gap-2'>
                        <Link

                        className={` px-2 py-1 rounded-lg text-gray-600 font-bold text-xl ${prams.has('Archive')?'bg-none':'text-white bg-black'}`}
                         href={index.url({
                            query:{
                                Archive:true
                            }
                        })}>
                            Arcive
                        </Link>
                         <Link
                         className={` px-2 py-1 rounded-lg text-gray-600 font-bold text-xl ${!prams.has('Archive')?'bg-none':'text-white bg-black'}`}
                         href={index.url()}>
                            categoury
                        </Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-[#dfe5ef] bg-white p-5 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <span className="flex size-10 items-center justify-center rounded-lg bg-[#e9edff] text-[#3157d5]">
                                    <Layers3 className="size-5" />
                                </span>
                                <span className="text-xs font-medium uppercase tracking-wider text-[#8a96a8]">
                                    Total
                                </span>
                            </div>
                            <p className="text-3xl font-semibold text-[#172033]">{jopcateg.total}</p>
                            <p className="mt-1 text-sm text-[#61708a]">Active job categories</p>
                        </div>
                        <div className="rounded-xl border border-[#dfe5ef] bg-[#172033] p-5 text-white shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <span className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-[#9eb1ff]">
                                    <BriefcaseBusiness className="size-5" />
                                </span>
                                <span className="text-xs font-medium uppercase tracking-wider text-[#aeb8c9]">
                                    Workspace
                                </span>
                            </div>
                            <p className="text-xl font-semibold">Ready to organize</p>
                            <p className="mt-1 text-sm text-[#aeb8c9]">Keep every vacancy easy to find</p>
                        </div>
                    </div>

                    <section className="overflow-hidden rounded-xl border border-[#dfe5ef] bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-[#e8ecf2] px-5 py-4 sm:px-6">
                            <div>
                                <h2 className="font-semibold text-[#172033]">All categories</h2>
                                <p className="mt-1 text-sm text-[#61708a]">
                                    {jopcateg.total === 0 ? 'No categories yet' : `${jopcateg.total} categories available`}
                                </p>
                            </div>
                            <span className="rounded-full bg-[#edf1f7] px-3 py-1 text-xs font-semibold text-[#61708a]">
                                Page {jopcateg.current_page} of {jopcateg.last_page}
                            </span>
                        </div>

                        {jopcateg.data.length > 0 ? (
                            <div className="divide-y divide-[#e8ecf2]">
                                {jopcateg.data.map((category, position) => (
                                    <div key={category.id} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                                        <div>
                                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f3ff] text-sm font-semibold text-[#3157d5]">
                                            {String(position + 1).padStart(2, '0')}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate font-medium text-[#172033]">{category.Name}</p>
                                            <p className="mt-1 text-xs text-[#8a96a8]">Available for job vacancies</p>
                                        </div>
                                        </div>
                                        <div className='flex gap-x-2 '>
                                                <Link
                                                href={destroyCategory.url({ Jopcategoury: category.id })}
                                                method='delete'
                                                as="button"
                                                className='cursor-pointer rounded-lg bg-amber-500 px-2 py-1 text-white transition hover:bg-amber-600'
                                            >
                                                Archive
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedCategory(category)}
                                                className='bg-blue-500 cursor-pointer text-white px-2 py-1 rounded-lg'
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-16 text-center">
                                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#edf1f7] text-[#61708a]">
                                    <FolderPlus className="size-6" />
                                </div>
                                <h3 className="mt-5 font-semibold text-[#172033]">No categories yet</h3>
                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#61708a]">
                                    Add your first category to start organizing job vacancies.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsCreateOpen(true)}
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3157d5] hover:text-[#2747b7]"
                                >
                                    Create your first category
                                    <ArrowRight className="size-4" />
                                </button>
                            </div>
                        )}

                        {jopcateg.links && jopcateg.links.length > 3 && (
                            <nav className="flex items-center justify-between border-t border-[#e8ecf2] px-5 py-4 sm:px-6" aria-label="Pagination">
                                <Link
                                    href={jopcateg.links[0].url ?? '#'}
                                    aria-disabled={!jopcateg.links[0].url}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[#61708a] hover:text-[#172033] aria-disabled:pointer-events-none aria-disabled:opacity-40"
                                >
                                    <ArrowLeft className="size-4" />
                                    Previous
                                </Link>
                                <span className="text-sm text-[#8a96a8]">Showing {jopcateg.from ?? 0}-{jopcateg.to ?? 0}</span>
                                <Link
                                    href={jopcateg.links[jopcateg.links.length - 1].url ?? '#'}
                                    aria-disabled={!jopcateg.links[jopcateg.links.length - 1].url}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[#61708a] hover:text-[#172033] aria-disabled:pointer-events-none aria-disabled:opacity-40"
                                >
                                    Next
                                    <ArrowRight className="size-4" />
                                </Link>
                            </nav>
                        )}
                    </section>
                </div>
            <Pagenation links={jopcateg.links ??[]} from={jopcateg.from} to={jopcateg.to} />
            </main>

            {isCreateOpen && <CreateCategory onClose={() => setIsCreateOpen(false)} />}
            {selectedCategory && <UpdateCategory category={selectedCategory} onClose={() => setSelectedCategory(null)} />}
        </>
    );
}
