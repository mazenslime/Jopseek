
import { Link } from '@inertiajs/react';
import { ArrowUpRight, BriefcaseBusiness, MapPin } from 'lucide-react';
import { ShowJop } from '@/routes';
import type { Vacancy } from '../Typs';

export type Pro = {
    Jop: Vacancy;
};

export default function Jop({ Jop }: Pro) {
    return (
        <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm shadow-stone-900/[0.02] transition hover:border-stone-300 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                        <BriefcaseBusiness aria-hidden="true" className="size-5" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-stone-900">
                            <Link className="decoration-emerald-700 underline-offset-4 hover:underline" href={ShowJop.url({ id: Jop.id })}>
                                {Jop.Title}
                            </Link>
                        </h3>
                        <p className="mt-1 text-sm font-medium text-stone-600">{Jop.company?.name ?? 'Company details unavailable'}</p>
                        {Jop.Description && <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-stone-500">{Jop.Description}</p>}
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-500">
                            <span className="inline-flex items-center gap-1.5"><MapPin aria-hidden="true" className="size-4 text-stone-400" />{Jop.Location}</span>
                            {Jop.Salary && <span className="font-medium text-stone-700">{Jop.Salary}</span>}
                            {Jop.categoury?.Name && <span>{Jop.categoury.Name}</span>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-stone-100 pt-4 sm:shrink-0 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                    {Jop.Type && <span className="inline-flex items-center rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">{Jop.Type}</span>}
                    <Link
                        href={ShowJop.url({ id: Jop.id })}
                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                        View job <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}