import { Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CalendarDays, MapPin, Trash2 } from 'lucide-react';
import { Deletapp, Jops, ShowJop } from '@/routes';
import type { Vacancy } from '../Typs';

interface Application {
    id: number;
    jobTitle: string;
    vacans: Vacancy;
    location: string;
    appliedAt: string;
    status: "Pending" | "Interview" | "Accepted" | "Rejected";
}



const statusStyles: Record<Application['status'], string> = {
    Pending: 'border-amber-200 bg-amber-50 text-amber-800',
    Interview: 'border-sky-200 bg-sky-50 text-sky-800',
    Accepted: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    Rejected: 'border-rose-200 bg-rose-50 text-rose-800',
};

type Props = {
    applications: Application[];
};

export default function MyApplications({ applications }: Props) {
    const interviews = applications.filter((application) => application.status === 'Interview').length;
    const inReview = applications.filter((application) => application.status === 'Pending').length;
    const offers = applications.filter((application) => application.status === 'Accepted').length;
    return (
        <main className="min-h-screen bg-stone-50 px-5 py-8 text-stone-900 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Career workspace</p>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">My applications</h1>
                        <p className="mt-2 text-sm text-stone-500">Every opportunity, all in one place.</p>
                    </div>
                    <Link
                        href={Jops.url()}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        Explore jobs <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                </div>

                <section aria-label="Your applications">
                    {applications.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
                            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                                <BriefcaseBusiness aria-hidden="true" className="size-5" />
                            </div>
                            <h2 className="text-lg font-semibold">Your next opportunity starts here</h2>
                            <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500">You haven’t applied to any roles yet. Find a position that feels right for you.</p>
                            <Link href={Jops.url()} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950">
                                Browse open jobs <ArrowRight aria-hidden="true" className="size-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {applications.map((application) => (
                                <article key={application.id} className="flex flex-col gap-5 rounded-lg border border-stone-200 bg-white p-5 shadow-sm shadow-stone-900/[0.02] transition hover:border-stone-300 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex min-w-0 items-start gap-4">
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                                            <BriefcaseBusiness aria-hidden="true" className="size-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <Link href={ShowJop({ id: application.vacans.id })} className="text-base font-semibold text-stone-900 decoration-emerald-700 underline-offset-4 hover:underline sm:text-lg">
                                                {application.vacans.Title}
                                            </Link>
                                            <p className="mt-1 text-sm text-stone-500">{application.vacans.company?.name ?? 'Company details unavailable'}</p>
                                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-stone-500">
                                                <span className="inline-flex items-center gap-1.5"><MapPin aria-hidden="true" className="size-4 text-stone-400" />{application.vacans.Location}</span>
                                                {application.vacans.Salary && <span>{application.vacans.Salary}</span>}
                                                <span className="inline-flex items-center gap-1.5"><CalendarDays aria-hidden="true" className="size-4 text-stone-400" />Applied {formatAppliedAt(application.appliedAt)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-4 border-t border-stone-100 pt-4 lg:justify-end lg:border-0 lg:pt-0">
                                        <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${statusStyles[application.status]}`}>
                                            <span aria-hidden="true" className="text-black mr-2 size-1.5 rounded-full bg-current" />
                                            {application.status}
                                            
                                        </span>
                                        <span aria-hidden="true" className="" >
                                            {application.status === 'Interview' && (
                                                <span className="inline-flex items-center gap-1.5 rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-800">
                                                    <CalendarDays aria-hidden="true" className="size-4 text-sky-400" /> Interview scheduled
                                                </span>
                                            )   }
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={ShowJop({ id: application.vacans.id })}
                                                aria-label={`View ${application.vacans.Title}`}
                                                title="View job"
                                                className="inline-flex size-10 items-center justify-center rounded-lg border border-stone-200 text-stone-600 transition hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                                            >
                                                <ArrowUpRight aria-hidden="true" className="size-4" />
                                            </Link>
                                            <Link
                                                 method="delete"
                                                href={`/Myapp/${application.id}`}
                                                aria-label={`Delete application for ${application.vacans.Title}`}
                                                title="Delete application"
                                                className="inline-flex size-10 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                                            >
                                                <Trash2 aria-hidden="true" className="size-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
            </section>
           </div>
        </main>
    );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
    return (
        <div className="border-b border-stone-100 px-5 py-4 last:border-b-0 even:border-l sm:border-b-0 sm:py-5 sm:[&:nth-child(n+3)]:border-l">
            <p className="text-2xl font-semibold tabular-nums text-stone-900">{value}</p>
            <p className="mt-1 text-xs font-medium text-stone-500 sm:text-sm">{label}</p>
        </div>
    );
}

function formatAppliedAt(appliedAt: string): string {
    const date = new Date(appliedAt);

    if (Number.isNaN(date.getTime())) {
        return appliedAt || 'Date unavailable';
    }

    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}