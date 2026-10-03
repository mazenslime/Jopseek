import { useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { FormEvent } from 'react';
import { Link } from '@inertiajs/react';
import {update } from '@/routes/Jopapplication';

type Option = { id: string; name?: string; Name?: string };
export type application = {
    id?: string;
    Status?:string
};

type Props = {
    application?: application;
};

export default function ApplicationForm({ application}: Props) {
    const editing = Boolean(application?.id);
    const { data, setData, post, put, processing, errors } = useForm({
        Status: application?.Status ?? '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const options = { onSuccess: () => undefined };
        if (editing) {
            put(update.url(application!.id!), options);
        }
    }

    return (
        <form onSubmit={submit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Job title" error={errors.Status} className="sm:col-span-2">
                    <select value={data.Status} onChange={(e)=>{setData({'Status':e.target.value})}}>
                        <option value="pendding">pendding</option>
                        <option value="accepted">accepted</option>
                        <option value="rejected">rejected</option>
                    </select>
                </Field>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <Link href="/Jopvacancies" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"><ArrowLeft className="size-4" />Cancel</Link>
                <button type="submit" disabled={processing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173c3a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#245854] disabled:opacity-60">{processing && <LoaderCircle className="size-4 animate-spin" />}{processing ? 'Saving...' : editing ? 'Save changes' : 'Create application'}</button>
            </div>
        </form>
    );
}

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
    return <div className={`space-y-2 ${className}`}><label className="block text-sm font-medium text-slate-700">{label}</label>{children}{error && <p className="text-sm text-red-600">{error}</p>}</div>;
}
