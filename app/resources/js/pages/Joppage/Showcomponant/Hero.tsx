import { BriefcaseBusiness, CalendarDays, Eye, MapPin } from 'lucide-react';
import type { Vacancy } from '../../Typs';

type Props = {
    vacancy: Vacancy;
};

export default function Hero({ vacancy }: Props) {
    const postedDate = new Date(vacancy.created_at);
    const postedLabel = Number.isNaN(postedDate.getTime())
        ? 'Recently posted'
        : `Posted ${new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(postedDate)}`;

    return (
        <header className="overflow-hidden rounded-lg border border-stone-200 bg-white">
            <div className="border-b border-stone-100 px-5 py-6 sm:px-8 sm:py-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                            <BriefcaseBusiness aria-hidden="true" className="size-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-emerald-800">{vacancy.company?.name ?? 'Company details unavailable'}</p>
                            <h1 className="mt-1 text-2xl font-semibold leading-tight text-stone-900 sm:text-3xl">{vacancy.Title}</h1>
                        </div>
                    </div>
                    <span className="inline-flex w-fit shrink-0 items-center rounded-md border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">
                        {vacancy.Type ?? 'Job opportunity'}
                    </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-stone-500">
                    <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" className="size-4 text-stone-400" />{vacancy.Location}</span>
                    <span className="inline-flex items-center gap-2"><CalendarDays aria-hidden="true" className="size-4 text-stone-400" />{postedLabel}</span>
                    <span className="inline-flex items-center gap-2"><Eye aria-hidden="true" className="size-4 text-stone-400" />{vacancy.Viewcount} views</span>
                    {vacancy.categoury?.Name && <span className="inline-flex items-center rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600">{vacancy.categoury.Name}</span>}
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 bg-stone-50 px-5 py-4 sm:px-8">
                <span className="text-xs font-medium uppercase text-stone-500">Compensation</span>
                <span className="text-lg font-semibold text-stone-900">{vacancy.Salary || 'Not specified'}</span>
            </div>
        </header>
    );
}