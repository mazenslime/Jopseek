import { Head } from '@inertiajs/react';
import { Vacancy,Category,Company } from './Index';

import VacancyForm from './Form';
export default function EditVacancy({ vacancy, companies, categories,onClose}: { vacancy:Vacancy; companies:Company[]; categories:Category[]; onClose: () => void; }) {
    return <><Head title={`Edit ${vacancy.Title}`} /><main className="min-h-screen bg-[#f7f8fa] px-4 py-8 text-slate-900 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d86b3d]">Job management</p><h1 className="mt-3 text-3xl font-bold tracking-tight">Edit vacancy</h1><p className="mt-2 mb-8 text-sm text-slate-500">Update the role details, category, or hiring company.</p><VacancyForm vacancy={vacancy} companies={companies} categories={categories} onClose={onClose}/></div></main></>;
}
 