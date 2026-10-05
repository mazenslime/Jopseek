import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BriefcaseBusiness, CalendarDays, FileText, Mail, UserCircle2 } from 'lucide-react';

type state = 'pendding' | 'accepted' | 'rejected' | '';

type Resume = {
    id?: string;
    Fillname?: string;
    Fileuri?: string;
    ContactDetiles?: string;
    Summary?: string;
    Skills?: string;
    Expirince?: string;
    Education?: string;
    Userid?: string;
    created_at?: string;
    updated_at?: string;
};

type Application = {
    id: string | '';
    Status: state;
    Aigenratedscore: number | 0;
    Aigenratedfeedback: string | '';
    Jobid: string | '';
    ResumId: string | '';
    Userid: string | '';
    Deleted_at: string | '';
    created_at: string | '';
    updated_at: string | '';
    applicant?: { id?: string; name?: string; email?: string } | null;
    resume?: Resume | null;
};

export default function ShowVacancy({ Appplication }: { Appplication: Application }) {
    const applicantName = Appplication.applicant?.name || 'Applicant unavailable';
    const applicantEmail = Appplication.applicant?.email || 'Email unavailable';
    const resume = Appplication.resume;

    return (
        <>
            <Head title={Appplication.Status || 'Application'} />
            <main className="min-h-screen bg-[#f7f8fa] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <Link href="/Jopapplication" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#173c3a]">
                        <ArrowLeft className="size-4" />Back to applications
                    </Link>

                    <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d86b3d]">Application</p>
                                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{Appplication.Status}</h1>
                                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                                    <span className="inline-flex items-center gap-2"><UserCircle2 className="size-4" />{applicantName}</span>
                                    <span className="inline-flex items-center gap-2"><Mail className="size-4" />{applicantEmail}</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                            <h2 className="text-xl font-semibold">Resume summary</h2>
                            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                                {resume?.Summary || 'No resume summary added yet.'}
                            </p>

                            <h2 className="mt-8 text-xl font-semibold">Skills</h2>
                            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                                {resume?.Skills || 'No skills listed.'}
                            </p>

                            <h2 className="mt-8 text-xl font-semibold">Experience</h2>
                            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                                {resume?.Expirince || 'No experience details added yet.'}
                            </p>

                            <h2 className="mt-8 text-xl font-semibold">Education</h2>
                            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                                {resume?.Education || 'No education details added yet.'}
                            </p>
                        </section>

                        <aside className="space-y-6">
                            <section className="rounded-3xl bg-[#173c3a] p-6 text-white shadow-lg">
                                <p className="text-xs uppercase tracking-[0.18em] text-[#f2b28f]">Applicant</p>
                                <div className="mt-5 space-y-3 text-sm">
                                    <div className="flex items-center gap-3"><BriefcaseBusiness className="size-4" /><span>{resume?.Fillname || applicantName}</span></div>
                                    <div className="flex items-center gap-3"><Mail className="size-4" /><span>{applicantEmail}</span></div>
                                    {resume?.ContactDetiles && (
                                        <div className="flex items-center gap-3"><FileText className="size-4" /><span>{resume.ContactDetiles}</span></div>
                                    )}
                                </div>
                            </section>

                            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d86b3d]">Application details</p>
                                <div className="mt-5 space-y-4 text-sm">
                                    <div className="flex items-center gap-3">
                                        <CalendarDays className="size-4 text-slate-400" />
                                        <span className="text-slate-600">Submitted {Appplication.created_at ? new Date(Appplication.created_at).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CalendarDays className="size-4 text-slate-400" />
                                        <span className="text-slate-600">Updated {Appplication.updated_at ? new Date(Appplication.updated_at).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                    {Appplication.Aigenratedfeedback && (
                                        <div className="rounded-xl bg-slate-50 p-3 text-slate-700">
                                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Assessment</p>
                                            <p className="mt-2 whitespace-pre-line text-sm">{Appplication.Aigenratedfeedback}</p>
                                        </div>
                                    )}
                                    {resume?.Fileuri && (
                                        <a
                                            href={resume.Fileuri}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex w-full items-center justify-center rounded-xl bg-[#173c3a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#245854]"
                                        >
                                            View resume file
                                        </a>
                                    )}
                                </div>
                            </section>
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}
