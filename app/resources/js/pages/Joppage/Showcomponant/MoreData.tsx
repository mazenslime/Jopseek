import { Check } from 'lucide-react';

type Props = {
    requiredSkills: string;
};

export default function MoreData({ requiredSkills }: Props) {
    const requirements = requiredSkills
        .split(/[.,;]/)
        .map((requirement) => requirement.trim())
        .filter(Boolean);

    return (
        <section className="rounded-lg border border-stone-200 bg-white p-5 sm:p-6">
            <h2 className="text-base font-semibold text-stone-900">Requirements &amp; qualifications</h2>
            {requirements.length > 0 ? (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {requirements.map((requirement) => (
                        <li key={requirement} className="flex items-start gap-2.5 text-sm leading-6 text-stone-600">
                            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-emerald-700" />
                            <span>{requirement}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4 text-sm text-stone-500">No specific requirements have been listed.</p>
            )}
        </section>
    );
}