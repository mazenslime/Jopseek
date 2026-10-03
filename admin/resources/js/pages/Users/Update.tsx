
import { email } from '@/routes/password';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

type UserItem = {
	id: string;
	name: string;
	email: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
};

type UpdateUserProps = {
	user: UserItem;
	onClose: () => void;
};

export default function UpdateUser({ user, onClose }: UpdateUserProps) {
	const { data, setData, patch, processing, errors } = useForm({
		id: user.id,
		name: user.name,
		email: user.email,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		patch(`/Users/${user.id}`, {
			onSuccess: () => onClose(),
		});
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
			<div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
				<div className="mb-5 flex items-center justify-between">
					<h2 className="text-xl font-semibold text-slate-900">Update user</h2>
					<button type="button" onClick={onClose} className="text-sm text-slate-500 hover:text-slate-800">
						Close
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
						<input
							type="text"
							name="name"
							value={data.name}
							onChange={(e) => setData('name', e.target.value)}
							className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-0 focus:border-[#173c3a]"
						/>
						{errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
						<input
							type="email"
							name="email"
							value={data.email}
							onChange={(e) => setData('email', e.target.value)}
							className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-0 focus:border-[#173c3a]"
						/>
						{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
					</div>

					<div className="flex justify-end gap-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={processing}
							className="rounded-xl bg-[#173c3a] px-4 py-2 text-sm font-medium text-white hover:bg-[#245854] disabled:cursor-not-allowed disabled:opacity-70"
						>
							{processing ? 'Saving...' : 'Save changes'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}