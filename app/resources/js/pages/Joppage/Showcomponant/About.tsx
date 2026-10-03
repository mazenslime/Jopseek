type Props = {
  description: string;
};

export default function About({ description }: Props) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 sm:p-6">
      <h2 className="text-base font-semibold text-stone-900">About the role</h2>
      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-stone-600">
        {description || 'No role description has been provided.'}
      </p>
    </section>
  );
}