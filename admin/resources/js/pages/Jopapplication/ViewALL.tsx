import { Head, Link, usePage } from '@inertiajs/react';
import { Archive, ArrowRight, BriefcaseBusiness, Edit3, MapPin, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { destroy, index as Jopapplication } from '@/routes/Jopapplication';
import Pagenation from '../Pagenation';
import Archived from '@/components/Arctiv-Archive';

type state="pendding"|"accepted"|"rejected"|'';
type Application = {
	id:string|''
    Status:state
    Aigenratedscore:number|0
    Aigenratedfeedback:string|''
    Jobid:string|''
    ResumId:string|''
    Userid:string|''
    Deleted_at:string|''	
    created_at:string|''
	updated_at:string|''
};
type Pagination = {
    current_page: number|null;
    data: Application[]|[];
    from: number | null;
    to: number | null;
    last_page: number|null;
    total: number|0;
    links: Array<{ url: string | null; label: string; active: boolean }>;
};
type Props = {
    Application: Pagination
    flash?: { success?: string; error?: string };
};

export default function JopApplicationALL({Application,flash }: Props) {
    console.log(Application.data)
    const { url } = usePage();
    const archive = new URLSearchParams(url).has('Archive');
    const [alert, setAlert] = useState(flash?.success ?? flash?.error ?? null);
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
                                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Job Application</h1>
                                <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">View all appliction.</p>
                            </div>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            <Stat label="Total vacancies" value={Application.total} />
                            <Stat label="Current page" value={`${Application.current_page} / ${Application.last_page}`} />
                        </div>
                    </header>
                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.03)]">
                        {Application?.data?.length ? Application?.data?.map((JopApplication) => (
                            <article key={JopApplication.id} className="flex flex-col gap-4 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                                <div className="flex min-w-0 items-start gap-4">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#dfece8] text-[#173c3a]"><BriefcaseBusiness className="size-5" /></div>
                                    <div className="min-w-0">
                                        <Link href={`/Jopvacancies/${JopApplication.id}`} className="block truncate text-base font-semibold text-slate-900 hover:text-[#173c3a]">{JopApplication.Aigenratedfeedback}</Link>
                                        <p className="mt-1 truncate text-sm text-slate-500">{JopApplication.Aigenratedfeedback || 'Company unavailable'} · {JopApplication.Aigenratedfeedback|| 'Uncategorized'}</p>
                                        <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400"><MapPin className="size-3.5" />{JopApplication.Status}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:justify-end">
                                    <Link href={`/JopApplication/${JopApplication.id}/edit`} aria-label={`Edit ${JopApplication.Status}`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#173c3a]"><Edit3 className="size-4" /></Link>
                                    {!archive && <Link href={destroy.url({Jopapplication: JopApplication.id })} method="delete" as="button" aria-label={`Archive ${JopApplication.Status}`} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="size-4" /></Link>}
                                    <Link href={`/JopApplication/${JopApplication.id}`} aria-label={`View ${JopApplication.Status}`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#173c3a]"><ArrowRight className="size-4" /></Link>
                                </div>
                            </article>
                        )) : <div className="px-6 py-16 text-center"><BriefcaseBusiness className="mx-auto size-10 text-slate-300" /><h2 className="mt-4 font-semibold">No vacancies found</h2><p className="mt-2 text-sm text-slate-500">Create a vacancy to start building your hiring pipeline.</p></div>}
                    </section>
                    <Pagenation links={Application.links} from={Application.from ?? 0} to={Application.to ?? 0} />
                </div>
            </main>
        </>
    );
}

function Stat({ label, value }: { label: string; value: string | number }) {
    return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{value}</p></div>;
}
