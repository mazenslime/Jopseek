import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Jops } from '@/routes';
import type { Vacancy } from '../Typs';
import About from './Showcomponant/About';
import Apply from './Showcomponant/Apply';
import Hero from './Showcomponant/Hero';
import MoreData from './Showcomponant/MoreData';
import FormApplay from './Showcomponant/FormApplay';

export type Props = {
    vacances: Vacancy[];
};

export default function Show({ vacances }: Props) {
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const vacancy = vacances[0];

    if (!vacancy) {
        return (
            <main className="min-h-[60vh] bg-stone-50 px-5 py-16 text-stone-900 sm:px-8">
                <div className="mx-auto max-w-3xl rounded-lg border border-stone-200 bg-white px-6 py-14 text-center">
                    <h1 className="text-2xl font-semibold">This job is no longer available</h1>
                    <p className="mt-2 text-sm text-stone-500">Explore current opportunities to find another role.</p>
                    <Link href={Jops.url()} className="mt-6 inline-flex h-10 items-center rounded-lg bg-emerald-800 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900">
                        Browse jobs
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-stone-50 px-5 py-8 text-stone-900 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-6xl">
                <nav aria-label="Breadcrumb" className="mb-5 text-sm text-stone-500">
                    <Link href={Jops.url()} className="transition hover:text-emerald-800">Jobs</Link>
                    <span aria-hidden="true" className="px-2 text-stone-300">/</span>
                    <span className="text-stone-800">Job details</span>
                </nav>

                <Hero vacancy={vacancy} />

                <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
                    <div className="space-y-5">
                        <About description={vacancy.Description} />
                        <MoreData requiredSkills={vacancy.Requiredskills} />
                    </div>
                    <Apply vacancy={vacancy} onApply={() => setIsApplyOpen(true)} />
                </div>
            </div>

            {isApplyOpen && (
                <FormApplay
                    id={vacancy.id}
                    title={vacancy.Title}
                    company={vacancy.company?.name ?? 'Company'}
                    location={vacancy.Location}
                    onClose={() => setIsApplyOpen(false)}
                />
            )}
        </main>
    );
}