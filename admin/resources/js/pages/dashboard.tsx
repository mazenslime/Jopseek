import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowUpRight,
    BriefcaseBusiness,
    Building2,
    Check,
    Clock3,
    FileText,
    UsersRound,
    X,
} from 'lucide-react';
import { index as applicationsIndex } from '@/routes/Jopapplication';
import { index as vacanciesIndex } from '@/routes/Jopvacancies';
import { dashboard } from '@/routes';

type DashboardProps = {
    stats: {
        applicants: number;
        companies: number;
        vacancies: number;
        applications: number;
        pendingApplications: number;
        acceptedApplications: number;
        rejectedApplications: number;
    };
    recentApplications: Array<{
        id: string;
        applicant_name: string | null;
        job_title: string | null;
        company_name: string | null;
        status: string;
        created_at: string;
    }>;
    recentVacancies: Array<{
        id: string;
        title: string;
        company_name: string | null;
        location: string;
        created_at: string;
    }>;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

function formatDate(value: string) {
    return dateFormatter.format(new Date(value));
}

const applicationStatusStyles: Record<string, string> = {
    pendding: 'bg-amber-400/10 text-amber-300 ring-amber-300/20',
    accepted: 'bg-emerald-400/10 text-emerald-300 ring-emerald-300/20',
    rejected: 'bg-rose-400/10 text-rose-300 ring-rose-300/20',
};

export default function Dashboard({ stats, recentApplications, recentVacancies }: DashboardProps) {
    const summaryCards = [
        {
            label: 'Total applications',
            value: stats.applications,
            detail: `${stats.applicants.toLocaleString()} registered applicants`,
            icon: FileText,
            iconStyle: 'bg-blue-500/15 text-blue-300',
        },
        {
            label: 'Pending review',
            value: stats.pendingApplications,
            detail: 'Awaiting a decision',
            icon: Clock3,
            iconStyle: 'bg-amber-500/15 text-amber-300',
        },
        {
            label: 'Accepted',
            value: stats.acceptedApplications,
            detail: 'Applications accepted',
            icon: Check,
            iconStyle: 'bg-emerald-500/15 text-emerald-300',
        },
        {
            label: 'Rejected',
            value: stats.rejectedApplications,
            detail: 'Applications declined',
            icon: X,
            iconStyle: 'bg-rose-500/15 text-rose-300',
        },
    ];

    const statusRows = [
        { label: 'Pending review', count: stats.pendingApplications, bar: 'bg-amber-400' },
        { label: 'Accepted', count: stats.acceptedApplications, bar: 'bg-emerald-400' },
        { label: 'Rejected', count: stats.rejectedApplications, bar: 'bg-rose-400' },
    ];
    const largestStatusCount = Math.max(...statusRows.map(({ count }) => count), 1);

    return (
        <>
            <Head title="Dashboard" />
            <main className="min-h-full flex-1 ">
                <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
                    <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                <span className="size-1.5 rounded-full bg-emerald-400" />
                                Live platform overview
                            </div>
                            <h1 className="text-3xl font-semibold tracking-tight  sm:text-4xl">
                                Welcome back, Admin.
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 ">
                                Here’s what’s happening across your job platform. Review applications and keep an eye on new opportunities.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={applicationsIndex()}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-[#141e31] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-[#1a2740]"
                            >
                                <FileText className="size-4" aria-hidden="true" />
                                Manage applications
                            </Link>
                            <Link
                                href={vacanciesIndex()}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400"
                            >
                                Browse vacancies
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </header>

                    <section aria-label="Platform statistics" className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                        {summaryCards.map(({ label, value, detail, icon: Icon, iconStyle }) => (
                            <div
                                key={label}
                                className="rounded-xl border border-slate-800 bg-[#141e31] p-5 shadow-xl shadow-black/10"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-400">{label}</p>
                                        <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                                            {value.toLocaleString()}
                                        </p>
                                        <p className="mt-1.5 text-xs text-slate-500">{detail}</p>
                                    </div>
                                    <span className={`rounded-lg p-2.5 ${iconStyle}`}>
                                        <Icon className="size-5" aria-hidden="true" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)]">
                        <div className="overflow-hidden rounded-xl border border-slate-800 ">
                            <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
                                <div>
                                    <h2 className="font-semibold text-white">Recent applications</h2>
                                    <p className="mt-1 text-xs text-slate-400">
                                        The latest submissions from job seekers.
                                    </p>
                                </div>
                                <Link
                                    href={applicationsIndex()}
                                    className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 transition hover:text-blue-200"
                                >
                                    View all <ArrowUpRight className="size-3.5" aria-hidden="true" />
                                </Link>
                            </div>
                            {recentApplications.length > 0 ? (
                                <div className="divide-y divide-slate-800/80 p-3">
                                    {recentApplications.map((application) => {
                                        const applicantName = application.applicant_name ?? 'Applicant account unavailable';
                                        const initial = applicantName.charAt(0).toUpperCase();
                                        const statusLabel = application.status === 'pendding'
                                            ? 'Pending review'
                                            : application.status.charAt(0).toUpperCase() + application.status.slice(1);

                                        return (
                                            <article
                                                key={application.id}
                                                className="flex flex-col gap-4 rounded-lg px-3 py-4 transition text-black sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ">
                                                        {initial}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-medium ">
                                                            {application.job_title ?? 'Vacancy unavailable'}
                                                        </p>
                                                        <p className="mt-1 truncate text-xs ">
                                                            {applicantName}
                                                            <span className="px-1.5 ">·</span>
                                                            {application.company_name ?? 'Company unavailable'}
                                                        </p>
                                                        <p className="mt-1.5 text-xs ">
                                                            Applied {formatDate(application.created_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${
                                                        applicationStatusStyles[application.status] ??
                                                        'bg-slate-700/50 text-slate-300 ring-slate-600'
                                                    }`}
                                                >
                                                    {statusLabel}
                                                </span>
                                            </article>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="px-6 py-12 text-center text-sm">
                                    No applications have been submitted yet.
                                </p>
                            )}
                        </div>

                        <aside className="flex flex-col gap-5">
                            <section className="rounded-xl border border-slate-800 bg-[#141e31] p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="font-semibold text-white">Application status</h2>
                                        <p className="mt-1 text-xs text-slate-400">A breakdown of submitted applications.</p>
                                    </div>
                                    <span className="rounded-full bg-slate-700/70 px-2.5 py-1 text-[11px] text-slate-300">
                                        {stats.applications.toLocaleString()} total
                                    </span>
                                </div>
                                <div className="mt-5 flex flex-col gap-4">
                                    {statusRows.map(({ label, count, bar }) => (
                                        <div key={label}>
                                            <div className="mb-2 flex items-center justify-between text-xs">
                                                <span className="text-slate-300">{label}</span>
                                                <span className="font-medium text-slate-200">{count.toLocaleString()}</span>
                                            </div>
                                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-700/70">
                                                <div
                                                    className={`h-full rounded-full ${bar}`}
                                                    style={{ width: `${(count / largestStatusCount) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#111a2b]">
                                <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
                                    <div>
                                        <h2 className="font-semibold text-white">Latest vacancies</h2>
                                        <p className="mt-1 text-xs text-slate-400">Recently posted opportunities.</p>
                                    </div>
                                    <Link
                                        href={vacanciesIndex()}
                                        aria-label="View all vacancies"
                                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                    >
                                        <ArrowUpRight className="size-4" aria-hidden="true" />
                                    </Link>
                                </div>
                                {recentVacancies.length > 0 ? (
                                    <div className="divide-y divide-slate-800/80">
                                        {recentVacancies.map((vacancy) => (
                                            <div key={vacancy.id} className="flex items-start gap-3 px-5 py-4">
                                                <span className="rounded-lg bg-violet-500/15 p-2 text-violet-300">
                                                    <BriefcaseBusiness className="size-4" aria-hidden="true" />
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-slate-100">
                                                        {vacancy.title}
                                                    </p>
                                                    <p className="mt-1 truncate text-xs text-slate-400">
                                                        {vacancy.company_name ?? 'Company unavailable'} · {vacancy.location}
                                                    </p>
                                                    <time className="mt-1.5 block text-[11px] text-slate-500">
                                                        Posted {formatDate(vacancy.created_at)}
                                                    </time>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="px-5 py-8 text-center text-sm text-slate-400">
                                        No vacancies have been published yet.
                                    </p>
                                )}
                            </section>

                            <section className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl border border-slate-800 bg-[#141e31] p-4">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <UsersRound className="size-4" aria-hidden="true" />
                                        <span className="text-xs">Applicants</span>
                                    </div>
                                    <p className="mt-3 text-2xl font-semibold text-white">
                                        {stats.applicants.toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-[#141e31] p-4">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Building2 className="size-4" aria-hidden="true" />
                                        <span className="text-xs">Companies</span>
                                    </div>
                                    <p className="mt-3 text-2xl font-semibold text-white">
                                        {stats.companies.toLocaleString()}
                                    </p>
                                </div>
                            </section>
                        </aside>
                    </section>
                </div>
            </main>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
