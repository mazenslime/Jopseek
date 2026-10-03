import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Building2, CalendarDays, Eye, MapPin, Tag } from 'lucide-react';

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

export default function ShowVacancy({Appplication}: { Appplication: Application }) {
    return <><Head title={Appplication.Status} /><main className="min-h-screen bg-[#f7f8fa] px-4 py-8 text-slate-900 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><Link href="/Jopvacancies" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#173c3a]"><ArrowLeft className="size-4" />Back to vacancies</Link><header className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d86b3d]">Job vacancy</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{Appplication.Status}</h1><div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500"><span className="inline-flex items-center gap-2"><Building2 className="size-4" />{Appplication.Userid || 'Company unavailable'}</span><span className="inline-flex items-center gap-2"><Tag className="size-4" />{Appplication.Jobid|| 'Uncategorized'}</span></div></div><Link href={`/Jopvacancies/${Appplication.id}/edit`} className="rounded-xl bg-[#173c3a] px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-[#245854]">Edit vacancy</Link></div></header><div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]"><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-xl font-semibold">Description</h2><p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{Appplication.Aigenratedfeedback}</p><h2 className="mt-8 text-xl font-semibold">Required skills</h2><p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{Appplication.Aigenratedscore}</p></section><aside className="space-y-6"><section className="rounded-3xl bg-[#173c3a] p-6 text-white shadow-lg"><p className="text-xs uppercase tracking-[0.18em] text-[#f2b28f]">Compensation</p></section><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d86b3d]">Activity</p><div className="mt-5 space-y-4 text-sm"><div className="flex items-center gap-3"></div><div className="flex items-center gap-3"><CalendarDays className="size-4 text-slate-400" /><span className="text-slate-600">Posted {new Date(Appplication.created_at).toLocaleDateString()}</span></div><div className="flex items-center gap-3"><CalendarDays className="size-4 text-slate-400" /><span className="text-slate-600">Updated {new Date(Appplication.updated_at).toLocaleDateString()}</span></div></div></section></aside></div></div></main></>;
}
