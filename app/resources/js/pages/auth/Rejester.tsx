import { Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';

export default function Rejester() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const submit = (e: React.SubmitEvent) => {
        e.preventDefault();
        post('/Rejester');
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-5">
            <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-semibold">Full name</Label>
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(event) => setData('name', event.target.value)}
                    autoComplete="name"
                    required
                    placeholder="Your name"
                    className="h-11 border-[#d9e1d7] bg-white/80 focus-visible:ring-emerald-700 dark:border-[#34443a] dark:bg-[#151f19] dark:focus-visible:ring-lime-300"
                />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(event) => setData('email', event.target.value)}
                    autoComplete="email"
                    required
                    placeholder="email@example.com"
                    className="h-11 border-[#d9e1d7] bg-white/80 focus-visible:ring-emerald-700 dark:border-[#34443a] dark:bg-[#151f19] dark:focus-visible:ring-lime-300"
                />
                <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(event) => setData('password', event.target.value)}
                    autoComplete="new-password"
                    required
                    placeholder="Create a password"
                    className="h-11 border-[#d9e1d7] bg-white/80 focus-visible:ring-emerald-700 dark:border-[#34443a] dark:bg-[#151f19] dark:focus-visible:ring-lime-300"
                />
                <InputError message={errors.password} />
            </div>

            <Button
                type="submit"
                disabled={processing}
                data-test="register-button"
                className="mt-2 min-h-12 w-full bg-emerald-800 text-white hover:bg-emerald-900 dark:bg-lime-300 dark:text-[#152019] dark:hover:bg-lime-200"
            >
                {processing ? 'Creating account...' : 'Create account'}
            </Button>
            <p className="text-center text-sm text-[#5c6a60] dark:text-[#b3c0b5]">
                Already have an account?{' '}
                <Link href={login()} className="font-semibold text-emerald-800 underline-offset-4 hover:underline dark:text-lime-300">
                    Sign in
                </Link>
            </p>
        </form>
    );
}

Rejester.layout = {
    title: 'Create your account',
    description: 'Set up your profile and start finding your next opportunity.',
};