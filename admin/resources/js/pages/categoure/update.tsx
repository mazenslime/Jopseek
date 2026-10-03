import { useForm } from '@inertiajs/react';
import { FolderPen, LoaderCircle } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { update as updateCategory } from '@/routes/Jopcategoury';

type Category = {
    id: string;
    Name: string;
};

type Props = {
    category: Category;
    onClose: () => void;
};

type CategoryForm = {
    id: string;
    Name: string;
};

export default function UpdateCategory({ category, onClose }: Props) {
    const { data, setData, put, processing, errors } = useForm<CategoryForm>({
        Name: category.Name,
        id: category.id,
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        put(updateCategory.url(category.id), {
            onSuccess: () => onClose(),
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-lg rounded-b-2xl border border-[#dfe5ef] bg-white shadow-xl">
                <div className="border-b border-[#2747b7] bg-[#3157d5] px-6 py-8 text-white sm:px-10">
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-white/15">
                            <FolderPen className="size-6" />
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg font-medium text-white transition hover:bg-white/20"
                            aria-label="Close update category"
                        >
                            ×
                        </button>
                    </div>
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-white/70">
                        Job management
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight text-white">
                        Edit category
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-white/75">
                        Keep this category name clear and easy for your team to recognize.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-8 p-6 sm:p-10">
                    <div className="space-y-2">
                        <label htmlFor="Name" className="text-sm font-medium text-[#172033]">
                            Category name
                        </label>
                        <input id="id" type="hidden" name="id" value={data.id} />
                        <Input
                            id="Name"
                            name="Name"
                            value={data.Name}
                            onChange={(event) => setData('Name', event.target.value)}
                            placeholder="e.g. Software Engineering"
                            aria-invalid={Boolean(errors.Name)}
                            aria-describedby={errors.Name ? 'category-error' : undefined}
                            autoFocus
                            className='text-black'
                        />
                        {errors.Name && (
                            <p id="category-error" className="text-sm text-red-500">
                                {errors.Name}
                            </p>
                        )}
                        <p className="text-sm text-[#61708a]">
                            Changes will apply wherever this category is used.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                        <Button className='text-gray-500' type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="text-blue-500 cursor-pointer" type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="text-blue-500 animate-spin cursor-pointer" />}
                            {processing ? 'Saving changes...' : 'Save changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}