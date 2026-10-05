import { useForm } from '@inertiajs/react';
import { FolderPlus, LoaderCircle } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { store } from '@/routes/Jopcategoury';

type CategoryForm = {
    Name: string;
};

type CreateCategoryProps = {
    onClose: () => void;
};

export default function CreateCategory({ onClose }: CreateCategoryProps) {
    const { data, setData, post, processing, errors } = useForm<CategoryForm>({
        Name: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(store.url(), {
            onSuccess: () => onClose(),
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-[#245854] bg-[#173c3a] px-6 py-8 text-white sm:px-10">
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-white/15">
                            <FolderPlus className="size-6" />
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg font-medium text-white transition hover:bg-white/20"
                            aria-label="Close create category"
                        >
                            ×
                        </button>
                    </div>
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-[#f2b28f]">
                        Job management
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight text-white">
                        Add a category
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-white/75">
                        Create a clear category to keep job vacancies easy to browse and manage.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-8 p-6 sm:p-10">
                    <div className="space-y-2">
                        <label htmlFor="Name" className="text-sm font-medium text-[#172033]">
                            Category name
                        </label>
                        <Input
                            id="Name"
                            name="Name"
                            value={data.Name}
                            onChange={(event) => setData('Name', event.target.value)}
                            placeholder="e.g. Software Engineering"
                            aria-invalid={Boolean(errors.Name)}
                            aria-describedby={errors.Name ? 'category-error' : undefined}
                            autoFocus
                            className="text-lg text-slate-900 focus-visible:ring-[#173c3a]"
                        />
                        {errors.Name && (
                            <p id="category-error" className="text-sm text-red-500">
                                {errors.Name}
                            </p>
                        )}
                        <p className="text-sm text-[#61708a]">
                            Use a short, recognizable name that applicants will understand.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                        <Button className="rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="rounded-xl bg-[#173c3a] text-white hover:bg-[#245854]" type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="animate-spin" />}
                            {processing ? 'Saving category...' : 'Save category'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}