import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { FileText, X } from 'lucide-react';
import type { FormEvent } from 'react';

type Props = {
    id: string;
    title: string;
    company: string;
    location: string;
    onClose: () => void;
}

export default function FormApplay({ id, title, company, location, onClose }: Props) {
    const { setData, post, processing, errors } = useForm<{ Photo: File | null }>({ Photo: null });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(`/Myapp/${id}`);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/50 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <section role="dialog" aria-modal="true" aria-labelledby="application-title" className="my-auto w-full max-w-lg overflow-hidden rounded-lg border border-stone-200 bg-white shadow-2xl">
                <header className="flex items-start justify-between gap-4 border-b border-stone-100 px-5 py-5 sm:px-6">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase text-emerald-800">Job application</p>
                        <h2 id="application-title" className="mt-1 text-lg font-semibold text-stone-900">{title}</h2>
                        <p className="mt-1 text-sm text-stone-500">{company} · {location}</p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close application form" className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-900">
                        <X aria-hidden="true" className="size-4" />
                    </button>
                </header>

                <form onSubmit={submit} className="space-y-6 p-5 sm:p-6" encType="multipart/form-data">
                    <div>
                        <label htmlFor="resume-upload" className="mb-2 block text-sm font-medium text-stone-800">Resume / curriculum vitae <span className="text-rose-600">*</span></label>
                        <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4">
                            <div className="mb-3 flex items-center gap-3 text-sm text-stone-600">
                                <FileText aria-hidden="true" className="size-5 text-emerald-800" />
                                <span>Choose a resume file to include with your application.</span>
                            </div>
                            <input
                                id="resume-upload"
                                type="file"
                                name="Photo"
                                required
                                onChange={(event) => setData('Photo', event.target.files?.[0] ?? null)}
                                className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-800 file:px-3 file:py-2 file:font-medium file:text-white hover:file:bg-emerald-900"
                            />
                        </div>
                        {errors.Photo && <p role="alert" className="mt-2 text-sm text-rose-700">{errors.Photo}</p>}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-stone-100 pt-5">
                        <Button type="button"  className="border border-stone-300 text-stone-700 hover:bg-stone-100" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={processing} className="bg-emerald-800 text-white hover:bg-emerald-900">
                            {processing ? 'Submitting…' : 'Submit application'}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
}
