import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import useRedirectSignedInUser from '@/hooks/useRedirectSignedInUser';

const signInSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
	useRedirectSignedInUser();
	const { login, loginWithGoogle } = useAuth();
	const [errorMessage, setErrorMessage] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
	});

	const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
		const credential = credentialResponse.credential;
		if (!credential) return;

		loginWithGoogle(credential);
	};

	const onGoogleLoginError = () => {
		console.log('Google error');
	};

	const onSubmit = async ({ username, password }: SignInFormData) => {
		try {
			await login(username, password);
			setErrorMessage('');
		} catch (err: any) {
			setErrorMessage('Invalid username or password. Please try again.');
		}
	};

	return (
		<div className="p-6 bg-gray-50 max-w-sm mx-auto space-y-4 bg-white shadow-lg rounded-lg">
			<h2 className="text-3xl font-extrabold text-center text-blue-600">Welcome Back</h2>
			<p className="text-sm text-gray-500 text-center mb-4">
				Sign in to your FanZone account
			</p>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<Input {...register('username')} placeholder="Username" />
					{errors.username && <p className="text-red-500">{errors.username.message}</p>}
				</div>
				<div>
					<Input {...register('password')} type="password" placeholder="Password" />
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}
				</div>
				{errorMessage && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
						🚫 {errorMessage}
					</div>
				)}
				<Button type="submit" className="w-full">
					Sign In
				</Button>
			</form>

			<div className="flex justify-center">
				<GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginError} />
			</div>

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
