import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import type { Vacancy } from '../../Typs';

type Props = {
  vacancy: Vacancy;
  onApply: () => void;
};

export default function Apply({ vacancy, onApply }: Props) {
  return (
    <aside className="rounded-lg border border-stone-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6">
      <p className="text-xs font-semibold uppercase text-stone-500">Interested in this role?</p>
      <p className="mt-2 text-2xl font-semibold text-stone-900">{vacancy.Salary || 'Salary not listed'}</p>
      <p className="mt-1 text-sm text-stone-500">{vacancy.Type ?? 'Position'}{vacancy.categoury?.Name ? ` · ${vacancy.categoury.Name}` : ''}</p>
      <div className="my-5 border-t border-stone-100" />
      <p className="flex items-start gap-2 text-sm text-stone-600">
        <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-stone-400" />
        <span>{vacancy.Location || 'Location not specified'}</span>
      </p>
      <Button className="mt-6 h-11 w-full bg-emerald-800 font-semibold text-white hover:bg-emerald-900" onClick={onApply}>
        Apply for this job
      </Button>
    </aside>
  );
}