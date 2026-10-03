import { Head, Link } from '@inertiajs/react';
import { Archive, ArrowLeft, ArrowUpRight, Building2, CalendarDays, Globe2, MapPin, ShieldCheck, UserRound } from 'lucide-react';
import { index as companiesIndex } from '@/routes/companies';
type Company = {
	id: string;
	name?: string;
	Name?: string;
	Adderses?: string | null;
	Indastry?: string | null;
	Website?: string | null;
	Ownerid?: string | null;
	created_at?: string | null;
	updated_at?: string | null;
	Owner?: Owner;
};

type Owner = {
	Deleted_at?: string | null;
	Role?: string | null;
	created_at?: string | null;
	email: string;
	email_verified_at?: string | null;
	id: string;
	name: string;
	updated_at?: string | null;
};

type props={
	company:Company
	user:Owner
}

function formatDate(value?: string | null) {
	if (!value) {
		return 'Not available';
	}

	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(new Date(value));
}

export default function CompaniesShow({company,user}:props) {
    console.log(company);
	console.log(user)
	if (!company) {
		return (
			<>
				<Head title="Company not found" />
				<div className="min-h-screen bg-[#f7f8fa] p-6 text-slate-900 lg:p-10">
					<div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d86b3d]">Company directory</p>
						<h1 className="mt-3 text-3xl font-bold tracking-tight">Company not found</h1>
						<p className="mt-2 text-slate-500">This company may have been removed or is no longer available.</p>
						<Link href={companiesIndex()} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#173c3a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#245854]">
							<ArrowLeft className="size-4" />
							Back to companies
						</Link>
					</div>
				</div>
			</>
		);
	}

	const name = company.name ?? company.Name ?? 'Unnamed company';
	const initials = name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0])
		.join('')
		.toUpperCase();
	const website = company.Website?.trim() || null;
	const websiteUrl = website && /^https?:\/\//i.test(website) ? website : website ? `https://${website}` : null;

	return (
		<>
			<Head title={name} />
			<div className="min-h-screen bg-[#f7f8fa] p-4 text-slate-900 sm:p-6 lg:p-10">
				<div className="mx-auto max-w-6xl">
					<div className="mb-6 flex items-center justify-between gap-4">
						<Link href={companiesIndex()} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#173c3a]">
							<ArrowLeft className="size-4" />
							Back to companies
						</Link>
						<span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 sm:inline-flex sm:items-center sm:gap-1.5">
							<ShieldCheck className="size-3.5" />
							Profile active
						</span>
					</div>

					<header className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
						<div className="h-2 bg-[#173c3a]" />
						<div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex items-center gap-4 sm:gap-5">
								<div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#dfece8] text-xl font-bold text-[#173c3a] sm:size-20 sm:text-2xl">
									{initials || <Building2 className="size-8" />}
								</div>
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d86b3d]">Company profile</p>
									<h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{name}</h1>
									<p className="mt-2 text-sm text-slate-500">{company.Indastry || 'Industry not specified'}</p>
								</div>
							</div>
							{websiteUrl && (
								<a href={websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173c3a] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-[#173c3a]/15 transition hover:bg-[#245854]">
									Visit website
									<ArrowUpRight className="size-4" />
								</a>
							)}
						</div>
					</header>
					<main className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
						<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(15,23,42,0.03)] sm:p-8">
							<div className="mb-6">
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d86b3d]">At a glance</p>
								<h2 className="mt-2 text-xl font-semibold text-slate-900">Company information</h2>
							</div>
							<div className="grid gap-6 sm:grid-cols-2">
								<InfoItem icon={MapPin} label="Location" value={company.Adderses || 'Address not specified'} />
								<InfoItem icon={Building2} label="Industry" value={company.Indastry || 'Not specified'} />
								<InfoItem icon={Globe2} label="Website" value={website || 'No website added'} href={websiteUrl} />
								<InfoItem icon={UserRound} label="Owner" value={user.name || 'No owner assigned'} />
							</div>
						</section>

						<aside className="space-y-6">
							<section className="rounded-3xl border border-slate-200 bg-[#173c3a] p-6 text-white shadow-[0_12px_40px_rgba(23,60,58,0.16)] sm:p-8">
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f2b28f]">Assigned owner</p>
								<h2 className="mt-2 text-xl font-semibold">{user.name || 'No owner assigned'}</h2>
								{company.Owner ? <>
									<a href={`mailto:${user.email}`} className="mt-2 block break-all text-sm text-white/70 hover:text-white hover:underline">{company.Owner.email}</a>
									<div className="mt-6 space-y-4">
										<TimelineItem icon={CalendarDays} label="Owner account created" value={formatDate(company.Owner.created_at)} />
										<TimelineItem icon={CalendarDays} label="Owner account updated" value={formatDate(company.Owner.updated_at)} />
									</div>
								</> : <p className="mt-6 text-sm text-white/70">Owner reference: {user.name || 'Not available'}</p>}
							</section>
							<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(15,23,42,0.03)] sm:p-8">
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d86b3d]">Record history</p>
								<h2 className="mt-2 text-xl font-semibold text-slate-900">Company timeline</h2>
								<div className="mt-6 space-y-4">
									<TimelineItem icon={CalendarDays} label="Created" value={formatDate(company.created_at)} dark={false} />
									<TimelineItem icon={CalendarDays} label="Last updated" value={formatDate(company.updated_at)} dark={false} />
								</div>
							</section>
						</aside>
					</main>
				</div>
			</div>
		</>
	);
}

function InfoItem({ icon: Icon, label, value, href }: { icon: typeof MapPin; label: string; value: string; href?: string | null }) {
	return (
		<div className="flex gap-3">
			<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5f3] text-[#173c3a]"><Icon className="size-4" /></div>
			<div className="min-w-0">
				<p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">{label}</p>
				{href ? <a href={href} target="_blank" rel="noreferrer" className="mt-1 block truncate text-sm font-medium text-[#173c3a] hover:underline">{value}</a> : <p className="mt-1 wrap-break-word text-sm font-medium text-slate-700">{value}</p>}
			</div>
		</div>
	);
}

function TimelineItem({ icon: Icon, label, value, dark = true }: { icon: typeof CalendarDays; label: string; value: string; dark?: boolean }) {
	return (
		<div className={`flex items-center gap-3 border-b pb-5 last:border-0 last:pb-0 ${dark ? 'border-white/10' : 'border-slate-100'}`}>
			<div className={`flex size-10 items-center justify-center rounded-xl ${dark ? 'bg-white/10 text-[#f2b28f]' : 'bg-[#eef5f3] text-[#173c3a]'}`}><Icon className="size-4" /></div>
			<div><p className={`text-xs ${dark ? 'text-white/60' : 'text-slate-400'}`}>{label}</p><p className={`mt-1 text-sm font-medium ${dark ? 'text-white' : 'text-slate-700'}`}>{value}</p></div>
		</div>
	);
}
