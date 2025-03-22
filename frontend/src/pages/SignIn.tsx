import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import useRedirectSignedInUser from '@/hooks/useRedirectSignedInUser';

const signInSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
	useRedirectSignedInUser();
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = ({ username, password }: SignInFormData) => {
		login(username, password);
	};

	return (
		<div className="p-6 max-w-sm mx-auto space-y-4 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold text-center">Sign In</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<Input {...register('username')} placeholder="Username" />
					{errors.username && (
						<p className="text-red-500">{errors.username.message}</p>
					)}
				</div>
				<div>
					<Input
						{...register('password')}
						type="password"
						placeholder="Password"
					/>
					{errors.password && (
						<p className="text-red-500">{errors.password.message}</p>
					)}
				</div>
				<Button type="submit" className="w-full">
					Sign In
				</Button>
			</form>
			<p className="text-center text-sm">
				If you don't have an account,{' '}
				<Link to="/sign-up" className="text-blue-500">
					sign up
				</Link>
				.
			</p>
		</div>
	);
}
