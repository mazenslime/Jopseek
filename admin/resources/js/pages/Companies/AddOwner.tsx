import { Head, Link, useForm } from '@inertiajs/react';

export default function AddOwner({ company }: { company?: { id: string; Name: string } }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!company?.id) {
            return;
        }

        post(`/companies/${company.id}/add-owner`, {
            onSuccess: () => {
                window.location.href = '/companies';
            },
        });
    };

    return (
        <>
            <Head title="Add owner" />
            <div className="min-h-screen bg-[#f7f8fa] p-4 text-slate-900 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d86b3d]">Company setup</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Add owner</h1>
                            {company?.Name && (
                                <p className="mt-2 text-sm text-slate-500">For: {company.Name}</p>
                            )}
                        </div>
                        <Link href="/companies" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                            Back to companies
                        </Link>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Owner name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-[#173c3a]"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-[#173c3a]"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-[#173c3a]"
                                />
                                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Link
                                    href="/companies"
                                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-[#173c3a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#245854] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing ? 'Saving...' : 'Create owner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
