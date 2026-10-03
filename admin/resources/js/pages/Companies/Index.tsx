import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CreateCompany from './Create';
import UpdateCompany from './Update';
import { destroy, show } from '@/routes/companies';
import Pagenation from '../Pagenation';
import Archived from '@/components/Arctiv-Archive';
import { deleteMethod, Restor } from '@/actions/App/Http/Controllers/CompaniesController';
type CompanyItem = {
    id: string;
    name: string;
    Adderses: string;
    Indastry: string;
    Website: string | null;
    Ownerid: string;
    created_at: string;
    updated_at: string;
    Deleted_at:string|null
};

type CompaniesData = {
    current_page: number;
    data: CompanyItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

type FlashData = {
    success?: string;
    error?: string;
};

export default function CompaniesIndex({ companies, flash }: { companies: CompaniesData; flash?: FlashData }) {
    const [selectedCompany, setSelectedCompany] = useState<CompanyItem | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState<string | null>(flash?.success ?? flash?.error ?? null);
    const [alertType, setAlertType] = useState<'success' | 'error' | null>(flash?.success ? 'success' : flash?.error ? 'error' : null);
    const totalCompanies = companies?.total ?? companies?.data?.length ?? 0;
    const activeCompanies = companies?.data?.filter((company) => company.Website).length ?? 0;

    useEffect(() => {
        if (!flash?.success && !flash?.error) {
            setVisibleAlert(null);
            setAlertType(null);
            return;
        }

        setVisibleAlert(flash.success ?? flash.error ?? null);
        setAlertType(flash.success ? 'success' : 'error');

        if (flash.success) {
            const timer = window.setTimeout(() => {
                setVisibleAlert(null);
                setAlertType(null);
            }, 3000);

            return () => window.clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-[#f7f8fa] p-4 text-slate-900 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {visibleAlert && (
                    <div
                        className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-medium ${
                            alertType === 'success'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                : 'border-red-200 bg-red-50 text-red-700'
                        }`}
                    >
                        {visibleAlert}
                    </div>
                )}

                <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d86b3d]">Workspace directory</p>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Companies</h1>
                            <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
                                Manage business partners, locations, and company profiles in one place.
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
                                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Total companies</p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">{totalCompanies}</p>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={() => setIsCreateOpen(true)}
                                    className="inline-flex items-center justify-center rounded-xl bg-[#173c3a] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#173c3a]/15 transition hover:bg-[#245854]"
                                >
                                    + Add company
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">Active</p>
                            <p className="mt-2 text-2xl font-semibold text-emerald-900">{activeCompanies}</p>
                        </div>
                        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-700">Website</p>
                            <p className="mt-2 text-2xl font-semibold text-amber-900">{Math.max(totalCompanies - activeCompanies, 0)}</p>
                        </div>
                        <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">Page</p>
                            <p className="mt-2 text-2xl font-semibold text-sky-900">{companies.current_page}</p>
                        </div>
                    </div>
                </header>
                <Archived href='companies'/>
                <main className="mt-8">
                    <div className="space-y-3">
                        {companies.data.map((company) => (
                            <article
                                key={company.id}
                                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex w-full items-center gap-3 sm:w-1/3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dfece8] text-sm font-semibold text-[#173c3a]">
                                        <Link
                                        href={show.url({company:company.id})}
                                        >
                                        {company.name.split('')[0]}
                                        </Link>
                                    </div>
                                    <div>
                                        <h2 className="text-base font-semibold text-slate-900">{company.name}</h2>
                                        <p className="text-sm text-slate-500">{company.Indastry}</p>
                                    </div>
                                </div>

                                <div className="flex w-full items-center gap-3 sm:w-1/3 sm:gap-6">
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                                        {company.Website ? 'Online' : 'Offline'}
                                    </span>
                                    <div className="text-sm text-slate-500">
                                        <p>Location</p>
                                        <p className="font-medium text-slate-700">{company.Adderses}</p>
                                    </div>
                                </div>

                                <div className="flex w-full items-center gap-3 sm:w-1/3 sm:justify-end sm:gap-6">
                                {
                                    company.Deleted_at==null?                                    
                                    <Button className="cursor-pointer bg-red-500 text-white">
                                        <Link
                                        method='delete'
                                        as='button'
                                        href={deleteMethod.url({id:company.id})} className="cursor-pointer">
                                            Delete
                                        </Link>
                                    </Button>:
                                     <Button className="cursor-pointer bg-red-500 text-white">
                                        <Link
                                        method='delete'
                                        as='button'
                                        href={destroy.url({id:company.id})} className="cursor-pointer">
                                            Delete
                                        </Link>
                                    </Button>
                                }
                                    {company.Deleted_at==null?<Button
                                        className="cursor-pointer bg-blue-500 text-white"
                                        onClick={() => setSelectedCompany(company)}
                                    >
                                    Update
                                    </Button>:
                                    <Button className='bg-blue-400'>
                                     <Link
                                        method='get'
                                        as='button'
                                        href={Restor.url({id:company.id})}>
                                            restor
                                    </Link> 
                                    </Button>  
                                }
                                </div>
                            </article>
                        ))}
                    </div>
                    <Pagenation links={companies.links} from={companies.from} to={companies.to} />
                </main>
            </div>

            {isCreateOpen && <CreateCompany onClose={() => setIsCreateOpen(false)} />}
            {selectedCompany && <UpdateCompany company={selectedCompany} onClose={() => setSelectedCompany(null)} />}
        </div>
    );
}
