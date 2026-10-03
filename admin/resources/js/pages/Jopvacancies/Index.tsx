import { Head, Link, usePage } from '@inertiajs/react';
import { Archive, ArrowRight, BriefcaseBusiness, Edit3, MapPin, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { destroy, index as vacanciesIndex } from '@/routes/Jopvacancies';
import Pagenation from '../Pagenation';
import CreateVacancy from './Create';
import Archived from '@/components/Arctiv-Archive';
import { Button } from '@/components/ui/button';
import EditVacancy from './Edit';
export type Company = { id: string; name: string };
export type Category = { id: string; Name: string };

export type Vacancy = {
    id: string;
    Title: string;
    Description: string;
    Location: string;
    Type: string;
    Salary: string | number;
    Requiredskills: string;
    Viewcount: number;
    company?: Company | null;
    categoury?: Category | null;
    created_at: string;
};
type Pagination = {
    current_page: number;
    data: Vacancy[];
    from: number | null;
    to: number | null;
    last_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
};
type Props = {
    vacancies: Pagination;
    companies: Company[];
    categories: Category[];
    flash?: { success?: string; error?: string };
};
export default function VacanciesIndex({ vacancies, companies, categories, flash }: Props) {
    const { url } = usePage();
    const { auth } = usePage().props;    
    const archive = new URLSearchParams(url).has('Archive');
    const [alert, setAlert] = useState(flash?.success ?? flash?.error ?? null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectvacanc,setselectvacanc]=useState<Vacancy|null>(null)

    useEffect(() => {
        setAlert(flash?.success ?? flash?.error ?? null);
        if (!flash?.success) return;
        const timer = window.setTimeout(() => setAlert(null), 3000);
        return () => window.clearTimeout(timer);
    }, [flash]);

    return (
        <>
            <Head title="Job vacancies" />
            <main className="min-h-screen bg-[#f7f8fa] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    {alert && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{alert}</div>}
                    <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d86b3d]">Job management</p>
                                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Job vacancies</h1>
                                <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">Create and manage open roles across every company and category.</p>
                            </div>
                            {
                                auth.user.Role!='admin'&&
                                <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173c3a] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#173c3a]/15 hover:bg-[#245854]"><Plus className="size-4" />Add vacancy</button>
                            }
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            <Stat label="Total vacancies" value={vacancies.total} />
                            <Stat label="Current page" value={`${vacancies.current_page} / ${vacancies.last_page}`} />
                            <Stat label="Views this page" value={vacancies.data.reduce((sum, vacancy) => sum + vacancy.Viewcount, 0)} />
                        </div>
                    </header>
                    {
                       auth.user.Role=='admin'&&    
                       <Archived href='Jopcategoury'/>
                    }
                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.03)]">
                        {vacancies.data.length ? vacancies.data.map((vacancy) => (
                            <article key={vacancy.id} className="flex flex-col gap-4 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                                <div className="flex min-w-0 items-start gap-4">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#dfece8] text-[#173c3a]"><BriefcaseBusiness className="size-5" /></div>
                                    <div className="min-w-0">
                                        <Link href={`/Jopvacancies/${vacancy.id}`} className="block truncate text-base font-semibold text-slate-900 hover:text-[#173c3a]">{vacancy.Title}</Link>
                                        <p className="mt-1 truncate text-sm text-slate-500">{vacancy.company?.name || 'Company unavailable'} · {vacancy.categoury?.Name || 'Uncategorized'}</p>
                                        <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400"><MapPin className="size-3.5" />{vacancy.Location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:justify-end">
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">{vacancy.Type === '1' ? 'Full time' : 'Part time'}</span>
                                    {/* <Link href={`/Jopvacancies/${vacancy.id}/edit`} aria-label={`Edit ${vacancy.Title}`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#173c3a]"><Edit3 className="size-4" /></Link> */}
                                    <Button 
                                    onClick={()=>{setselectvacanc(vacancy)}}
                                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#173c3a]">
                                        Update
                                    </Button>
                                    {!archive && <Link href={destroy.url({ Jopvacancy: vacancy.id })} method="delete" as="button" aria-label={`Archive ${vacancy.Title}`} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="size-4" /></Link>}
                                    <Link href={`/Jopvacancies/${vacancy.id}`} aria-label={`View ${vacancy.Title}`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#173c3a]"><ArrowRight className="size-4" /></Link>
                                </div>
                            </article>
                        )) : <div className="px-6 py-16 text-center"><BriefcaseBusiness className="mx-auto size-10 text-slate-300" /><h2 className="mt-4 font-semibold">No vacancies found</h2><p className="mt-2 text-sm text-slate-500">Create a vacancy to start building your hiring pipeline.</p></div>}
                    </section>
                    <Pagenation links={vacancies.links} from={vacancies.from ?? 0} to={vacancies.to ?? 0} />
                </div>
            </main>
            {isCreateOpen && <CreateVacancy  categories={categories} onClose={() => setIsCreateOpen(false)} />}
            {selectvacanc && <EditVacancy  vacancy={selectvacanc} companies={companies} categories={categories} onClose={() => setselectvacanc(null)} />}
        </>
    );
}

function Stat({ label, value }: { label: string; value: string | number }) {
    return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{value}</p></div>;
}
