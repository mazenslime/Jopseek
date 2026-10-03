import { Button } from "@/components/ui/button";
import { destroy, index } from "@/routes/Users";
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from "react";
import CreateUser from './Create';
import UpdateUser from './Update';
import Pagenation from "../Pagenation";
import { Archive } from "lucide-react";
import Archived from "@/components/Arctiv-Archive";

type UserItem = {
	id: string;
	name: string;
	email: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
};

type UsersData = {
	current_page: number;
	data: UserItem[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: Array<{ url: string | null; label: string; active: boolean }>;
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
};

type FlashData = {
	success?: string;
	error?: string;
};

export default function UsersIndex({ users, flash }: { users: UsersData; flash?: FlashData }) {
	const { url } = usePage();
	const isArchiveView = new URLSearchParams(url).has('Archive');
	const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [visibleAlert, setVisibleAlert] = useState<string | null>(flash?.success ?? flash?.error ?? null);
	const [alertType, setAlertType] = useState<'success' | 'error' | null>(flash?.success ? 'success' : flash?.error ? 'error' : null);
	const totalUsers = users?.total ?? users?.data?.length ?? 0;
	const activeUsers = users?.data?.filter((user) => user.email_verified_at).length ?? 0;

	useEffect(() => {
		if (!flash?.success && !flash?.error) {
			setVisibleAlert(null);
			setAlertType(null);
			return;
		}

		setVisibleAlert(flash.success ?? flash.error ?? null);
		setAlertType(flash.success ? 'success' : 'error');

		if (flash.success) {
			const timer = window.setTimeout(() => {
				setVisibleAlert(null);
				setAlertType(null);
			}, 3000);

			return () => window.clearTimeout(timer);
		}
	}, [flash]);

	return (
		<div className="min-h-screen bg-[#f7f8fa] p-4 text-slate-900 sm:p-6 lg:p-8">
			<div className="mx-auto max-w-7xl">
				{visibleAlert && (
					<div
						className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-medium ${
							alertType === 'success'
								? 'border-emerald-200 bg-emerald-50 text-emerald-800'
								: 'border-red-200 bg-red-50 text-red-700'
						}`}
					>
						{visibleAlert}
					</div>
				)}
				<header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
					<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d86b3d]">Workspace directory</p>
							<h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Users</h1>
							<p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
								Manage team members, roles, and workspace access in one place.
							</p>
						</div>

						<div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
							<div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
								<p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Total users</p>
								<p className="mt-1 text-2xl font-bold text-slate-900">{totalUsers}</p>
							</div>

							<button
								type="button"
								onClick={() => setIsCreateOpen(true)}
								className="inline-flex items-center justify-center rounded-xl bg-[#173c3a] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#173c3a]/15 transition hover:bg-[#245854]"
							>
								+ Add user
							</button>
						</div>
					</div>

					<div className="mt-6 grid gap-4 sm:grid-cols-3">
						<div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
							<p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">Active</p>
							<p className="mt-2 text-2xl font-semibold text-emerald-900">{activeUsers}</p>
						</div>
						<div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
							<p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-700">Invited</p>
							<p className="mt-2 text-2xl font-semibold text-amber-900">{Math.max(totalUsers - activeUsers, 0)}</p>
						</div>
						<div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
							<p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">Page</p>
							<p className="mt-2 text-2xl font-semibold text-sky-900">{users.current_page}</p>
						</div>
					</div>
				</header>

				<nav className="mt-6 flex gap-2" aria-label="User list filters">
					<Archived href="Users"/>
				</nav>

				<main className="mt-8">
					<div className="space-y-3">
						{users.data.map((user) => (
							<article
								key={user.id}
								className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition hover:shadow-[0_12px_28px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between "
							>
								<div className="w-1/3 flex items-center gap-3">
									<div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dfece8] text-sm font-semibold text-[#173c3a]">
										{user.name
											.split(' ')
											.map((part) => part[0])
											.join('')
											.slice(0, 2)
											.toUpperCase()}
									</div>
									<div>
										<h2 className="text-base font-semibold text-slate-900">{user.name}</h2>
										<p className="text-sm text-slate-500">{user.email}</p>
									</div>
								</div>

								<div className="flex w-1/3 items-center gap-3 sm:gap-6">
									<span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
										{user.email_verified_at ? 'Verified' : 'Pending'}
									</span>
									<div className="text-sm text-slate-500">
										<p>Created</p>
										<p className="font-medium text-slate-700">{new Date(user.created_at).toLocaleDateString()}</p>
									</div>
								</div>
                                <div className="flex w-1/3 items-center gap-3 sm:justify-end sm:gap-6">
										<Button className="bg-red-500 cursor-pointer text-white">
											<Link
												href={destroy.url({ User: user.id })}
												method="delete"
												as="button"
												className="cursor-pointer"
											>
												Delete
											</Link>
										</Button>
										<Button className="bg-blue-500 cursor-pointer text-white" onClick={() => setSelectedUser(user)}>
											Update
										</Button>
									</div>
							</article>
						))}
					</div>
				</main>
				
				<Pagenation links={users.links} from={users.from} to={users.to} />
				
			</div>

			{isCreateOpen && <CreateUser onClose={() => setIsCreateOpen(false)} />}
			{selectedUser && <UpdateUser user={selectedUser} onClose={() => setSelectedUser(null)} />}
		</div>
	);
}
