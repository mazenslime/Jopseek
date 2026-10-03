import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * @typedef {{ url: string | null, label: string, active: boolean }} PaginationLink
 */

/**
 * @param {{ links: PaginationLink[], from?: number | null, to?: number | null }} props
 */
export default function Pagenation({ links, from = 0, to = 0 }) {
	if (links.length <= 3) {
		return null;
	}

	const previousUrl = links[0]?.url;
	const nextUrl = links[links.length - 1]?.url;

	return (
		<nav
			className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
			aria-label="Pagination"
		>
			<Link
				href={previousUrl ?? '#'}
				aria-disabled={!previousUrl}
				className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 aria-disabled:pointer-events-none aria-disabled:opacity-40"
			>
				<ArrowLeft className="size-4" />
				Previous
			</Link>

			<span className="text-center text-sm text-slate-400">
				Showing {from}-{to}
			</span>

			<Link
				href={nextUrl ?? '#'}
				aria-disabled={!nextUrl}
				className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 aria-disabled:pointer-events-none aria-disabled:opacity-40"
			>
				Next
				<ArrowRight className="size-4" />
			</Link>
		</nav>
	);
}
