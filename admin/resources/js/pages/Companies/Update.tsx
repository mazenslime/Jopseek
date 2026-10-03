import { update as updateCompany } from '@/routes/companies';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type CompanyItem = {
    id: string;
    name: string;
    Adderses: string;
    Indastry: string;
    Website: string | null;
    Ownerid: string;
    created_at: string;
    updated_at: string;
};

type UpdateCompanyProps = {
    company: CompanyItem;
    onClose: () => void;
};

export default function UpdateCompany({ company, onClose }: UpdateCompanyProps) {
    const { data, setData, put, processing, errors } = useForm({
        Name: company.name,
        Adderses: company.Adderses,
        Indastry: company.Indastry,
        Website: company.Website ?? '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(updateCompany.url(company.id), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d86b3d]">Workspace</p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Update company</h2>
                    </div>
                    <button type="button" onClick={onClose} className="text-sm text-slate-500 hover:text-slate-800">
                        Close
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Company name</label>
                        <input
                            type="text"
                            value={data.Name}
                            onChange={(e) => setData('Name', e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                        />
                        {errors.Name && <p className="mt-1 text-xs text-red-500">{errors.Name}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
                        <input
                            type="text"
                            value={data.Adderses}
                            onChange={(e) => setData('Adderses', e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                        />
                        {errors.Adderses && <p className="mt-1 text-xs text-red-500">{errors.Adderses}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Industry</label>
                        <input
                            type="text"
                            value={data.Indastry}
                            onChange={(e) => setData('Indastry', e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                        />
                        {errors.Indastry && <p className="mt-1 text-xs text-red-500">{errors.Indastry}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Website</label>
                        <input
                            type="url"
                            value={data.Website}
                            onChange={(e) => setData('Website', e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                            placeholder="https://example.com"
                        />
                        {errors.Website && <p className="mt-1 text-xs text-red-500">{errors.Website}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-[#173c3a] px-4 py-2 text-sm font-medium text-white hover:bg-[#245854] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}