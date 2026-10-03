import companies from '@/routes/companies';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

type CreateCompanyProps = {
    onClose: () => void;
};

export default function CreateCompany({ onClose }: CreateCompanyProps) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        Name: '',
        Adderses: '',
        Indastry: '',
        Website: '',
        owner_name: '',
        owner_email: '',
        owner_password: '',
    });

    const canGoNext = !!data.Name && !!data.Adderses && !!data.Indastry;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('start')
        post(companies.store.url(), {
            onSuccess: () => onClose(),
        });
        console.log('end'); 
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d86b3d]">Workspace</p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Create company</h2>
                    </div>
                    <button type="button" onClick={onClose} className="text-sm text-slate-500 hover:text-slate-800">
                        Close
                    </button>
                </div>

                <div className="mb-5 flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step === 1 ? 'bg-[#173c3a] text-white' : 'bg-slate-200 text-slate-600'}`}>
                        1
                    </div>
                    <div className="h-px flex-1 bg-slate-200" />
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step === 2 ? 'bg-[#173c3a] text-white' : 'bg-slate-200 text-slate-600'}`}>
                        2
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 && (
                        <>
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

                            <div className="flex justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!canGoNext}
                                    className="rounded-xl bg-[#173c3a] px-4 py-2 text-sm font-medium text-white hover:bg-[#245854] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Owner name</label>
                                <input
                                    type="text"
                                    value={data.owner_name}
                                    onChange={(e) => setData('owner_name', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                                />
                                {errors.owner_name && <p className="mt-1 text-xs text-red-500">{errors.owner_name}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Owner email</label>
                                <input
                                    type="email"
                                    value={data.owner_email}
                                    onChange={(e) => setData('owner_email', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                                />
                                {errors.owner_email && <p className="mt-1 text-xs text-red-500">{errors.owner_email}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Owner password</label>
                                <input
                                    type="password"
                                    value={data.owner_password}
                                    onChange={(e) => setData('owner_password', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                                />
                                {errors.owner_password && <p className="mt-1 text-xs text-red-500">{errors.owner_password}</p>}
                            </div>

                            <div className="flex justify-between gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-[#173c3a] px-4 py-2 text-sm font-medium text-white hover:bg-[#245854] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing ? 'Saving...' : 'Create company'}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
