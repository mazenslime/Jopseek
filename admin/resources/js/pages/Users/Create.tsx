import { store } from '@/routes/Users';
import { useForm } from '@inertiajs/react';

type CreateUserProps = {
	onClose: () => void;
};

export default function CreateUser({ onClose }: CreateUserProps) {
	const { data, setData, post, processing, errors } = useForm({
		name: '',
		email: '',
		password: '',
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		post(store.url(), {
			onSuccess: () => onClose(),
		});
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
			<div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
				<div className="mb-5 flex items-center justify-between">
					<h2 className="text-xl font-semibold text-slate-900">Create user</h2>
					<button type="button" onClick={onClose} className="text-sm text-slate-500 hover:text-slate-800">
						Close
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
						<input
							type="text"
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
							value={data.email}
							onChange={(e) => setData('email', e.target.value)}
							className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-0 focus:border-[#173c3a]"
						/>
						{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
						<input
							type="password"
							value={data.password}
							onChange={(e) => setData('password', e.target.value)}
							className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-0 focus:border-[#173c3a]"
						/>
						{errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
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
							{processing ? 'Saving...' : 'Create user'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
