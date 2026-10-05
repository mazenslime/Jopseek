import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { FileText, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export type ResumeOption = {
    id: string;
    Fillname: string;
};

type Props = {
    id: string;
    title: string;
    company: string;
    location: string;
    onClose: () => void;
    Resumes: ResumeOption[];
};

const MAX_RESUMES = 5;

export default function FormApplay({
    id,
    title,
    company,
    location,
    onClose,
    Resumes,
}: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        ResumeIds: string[];
        ResumeFiles: File[];
    }>({
        ResumeIds: [],
        ResumeFiles: [],
    });
    const [fileSelectionMessage, setFileSelectionMessage] = useState('');
    const resumeCount = data.ResumeIds.length + data.ResumeFiles.length;

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(`/Myapp/${id}`);
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) =>
                event.target === event.currentTarget && onClose()
            }
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="application-title"
                className="my-auto w-full max-w-lg overflow-hidden rounded-lg border border-stone-200 bg-white shadow-2xl"
            >
                <header className="flex items-start justify-between gap-4 border-b border-stone-100 px-5 py-5 sm:px-6">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-emerald-800 uppercase">
                            Job application
                        </p>
                        <h2
                            id="application-title"
                            className="mt-1 text-lg font-semibold text-stone-900"
                        >
                            {title}
                        </h2>
                        <p className="mt-1 text-sm text-stone-500">
                            {company} · {location}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close application form"
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
                    >
                        <X aria-hidden="true" className="size-4" />
                    </button>
                </header>

                <form
                    onSubmit={submit}
                    className="space-y-6 p-5 sm:p-6"
                    encType="multipart/form-data"
                >
                    <div>
                        <label
                            htmlFor="resume-upload"
                            className="mb-2 block text-sm font-medium text-stone-800"
                        >
                            Resume / curriculum vitae{' '}
                            <span className="text-rose-600">*</span>
                        </label>
                        <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4">
                            <div className="mb-3 flex items-center gap-3 text-sm text-stone-600">
                                <FileText
                                    aria-hidden="true"
                                    className="size-5 text-emerald-800"
                                />
                                <span>
                                    Select saved resumes or upload PDFs (up to{' '}
                                    {MAX_RESUMES} total).
                                </span>
                            </div>

                            {Resumes.length > 0 && (
                                <fieldset className="mb-4 space-y-2">
                                    <legend className="mb-2 text-sm font-medium text-stone-700">
                                        Saved resumes
                                    </legend>
                                    {Resumes.map((resume) => {
                                        const isSelected =
                                            data.ResumeIds.includes(resume.id);

                                        return (
                                            <label
                                                key={resume.id}
                                                className="flex items-center gap-2 text-sm text-stone-600"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={resume.id}
                                                    checked={isSelected}
                                                    disabled={
                                                        !isSelected &&
                                                        resumeCount >=
                                                            MAX_RESUMES
                                                    }
                                                    onChange={(event) => {
                                                        setData(
                                                            'ResumeIds',
                                                            event.target.checked
                                                                ? [
                                                                      ...data.ResumeIds,
                                                                      resume.id,
                                                                  ]
                                                                : data.ResumeIds.filter(
                                                                      (
                                                                          resumeId,
                                                                      ) =>
                                                                          resumeId !==
                                                                          resume.id,
                                                                  ),
                                                        );
                                                    }}
                                                    className="size-4 rounded border-stone-300 text-emerald-800 focus:ring-emerald-800"
                                                />
                                                <span>{resume.Fillname}</span>
                                            </label>
                                        );
                                    })}
                                </fieldset>
                            )}

                            <input
                                id="resume-upload"
                                type="file"
                                name="ResumeFiles"
                                accept=".pdf,application/pdf"
                                multiple
                                disabled={resumeCount >= MAX_RESUMES}
                                onChange={(event) => {
                                    const selectedFiles = Array.from(
                                        event.currentTarget.files ?? [],
                                    );
                                    const remainingSlots =
                                        MAX_RESUMES - resumeCount;

                                    setData('ResumeFiles', [
                                        ...data.ResumeFiles,
                                        ...selectedFiles.slice(
                                            0,
                                            remainingSlots,
                                        ),
                                    ]);
                                    setFileSelectionMessage(
                                        selectedFiles.length > remainingSlots
                                            ? `Only ${remainingSlots} more resume${remainingSlots === 1 ? '' : 's'} can be added.`
                                            : '',
                                    );
                                    event.currentTarget.value = '';
                                }}
                                className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-800 file:px-3 file:py-2 file:font-medium file:text-white hover:file:bg-emerald-900 disabled:opacity-50"
                            />
                            <p className="mt-2 text-xs text-stone-500">
                                {resumeCount} of {MAX_RESUMES} resumes selected.
                                PDF files only, up to 5 MB each.
                            </p>
                            {fileSelectionMessage && (
                                <p
                                    role="status"
                                    className="mt-2 text-sm text-rose-700"
                                >
                                    {fileSelectionMessage}
                                </p>
                            )}

                            {data.ResumeFiles.length > 0 && (
                                <ul className="mt-3 space-y-2">
                                    {data.ResumeFiles.map((file, index) => (
                                        <li
                                            key={`${file.name}-${index}`}
                                            className="flex items-center justify-between gap-3 text-sm text-stone-600"
                                        >
                                            <span className="truncate">
                                                {file.name}
                                            </span>
                                            <button
                                                type="button"
                                                aria-label={`Remove ${file.name}`}
                                                onClick={() =>
                                                    setData(
                                                        'ResumeFiles',
                                                        data.ResumeFiles.filter(
                                                            (_, fileIndex) =>
                                                                fileIndex !==
                                                                index,
                                                        ),
                                                    )
                                                }
                                                className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-stone-500 hover:bg-stone-200 hover:text-stone-900"
                                            >
                                                <X
                                                    aria-hidden="true"
                                                    className="size-4"
                                                />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {errors.ResumeIds && (
                            <p
                                role="alert"
                                className="mt-2 text-sm text-rose-700"
                            >
                                {errors.ResumeIds}
                            </p>
                        )}
                        {errors.ResumeFiles && (
                            <p
                                role="alert"
                                className="mt-2 text-sm text-rose-700"
                            >
                                {errors.ResumeFiles}
                            </p>
                        )}
                        {Object.entries(errors)
                            .filter(([field]) =>
                                field.startsWith('ResumeFiles.'),
                            )
                            .map(([field, message]) => (
                                <p
                                    key={field}
                                    role="alert"
                                    className="mt-2 text-sm text-rose-700"
                                >
                                    {message}
                                </p>
                            ))}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-stone-100 pt-5">
                        <Button
                            type="button"
                            className="border border-stone-300 text-stone-700 hover:bg-stone-100"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-800 text-white hover:bg-emerald-900"
                        >
                            {processing ? 'Submitting…' : 'Submit application'}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
}
