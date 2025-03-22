import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect } from 'react';

const signUpSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
	const { signUp, user } = useAuth();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = async ({ username, email, password }: SignUpFormData) => {
		signUp(username, email, password);
	};

	return (
		<div className="p-6 max-w-sm mx-auto space-y-4 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold text-center">Sign Up</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<Input {...register('username')} placeholder="Username" />
					{errors.username && <p className="text-red-500">{errors.username.message}</p>}
				</div>
				<div>
					<Input {...register('email')} type="email" placeholder="Email" />
					{errors.email && <p className="text-red-500">{errors.email.message}</p>}
				</div>
				<div>
					<Input {...register('password')} type="password" placeholder="Password" />
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}
				</div>
				<Button type="submit" className="w-full">
					Sign Up
				</Button>
			</form>
			<p className="text-center text-sm">
				Already have an account?{' '}
				<Link to="/sign-in" className="text-blue-500">
					Sign in
				</Link>
				.
			</p>
		</div>
	);
}
