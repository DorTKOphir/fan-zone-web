import PostItem from '@/components/PostItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { usePosts } from '@/hooks/usePosts';
import User from '@/models/user';
import { useAuth } from '@/providers/AuthProvider';
import { getPostByAuthorId } from '@/services/posts';
import { getUserById, updateUser, uploadProfilePicture } from '@/services/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
	username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
});

const Profile = () => {
	const { userId } = useParams<{ userId: string }>();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(schema),
	});

	const { user: loggedInUser, reloadUser } = useAuth();
	const [user, setUser] = useState<User | null>(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [saving, setSaving] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const signedInUser = userId === loggedInUser?._id;

	const fetchUser = async () => {
		if (userId) {
			try {
				const user = await getUserById(userId);
				setUser(user);
			} catch (err) {
				setError('Failed to load profile or posts');
			}
		}
	};

	useEffect(() => {
		fetchUser();
	}, [userId]);

	const fetchPosts = useCallback(async () => {
		if (user) {
			try {
				return getPostByAuthorId(user._id);
			} catch (err) {
				setError('Failed to load profile or posts');
				return [];
			}
		}
		return [];
	}, [user]);

	const { posts, loading, onLike, onDelete, onUpdate } = usePosts(fetchPosts);

	useEffect(() => {
		if (user) {
			setValue('username', user.username);
		}
	}, [user, setValue]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (file) {
			setImageFile(file);
		}
	};

	const handleUpload = async (event?: React.MouseEvent<HTMLButtonElement>) => {
		event?.preventDefault();

		if (imageFile) {
			try {
				setImageLoading(true);
				await uploadProfilePicture(imageFile);
				if (signedInUser) {
					await reloadUser();
				}
				await fetchUser();
				setImageFile(null);
			} catch (error) {
				setError('Failed to upload profile picture');
			} finally {
				setImageLoading(false);
			}
		}
	};

	const onSubmit = async (data: { username: string }) => {
		if (!loggedInUser) return;

		setSaving(true);
		try {
			await updateUser({ ...loggedInUser, username: data.username });
			if (signedInUser) {
				await reloadUser();
			}
			await fetchUser();
			setEditMode(false);
		} catch (error) {
			setError('Failed to update profile');
		} finally {
			setSaving(false);
		}
	};

	return (
		<div>
			<div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
				{imageLoading || loading ? (
					<div className="space-y-4">
						<Skeleton className="h-8 w-32" />
						<Skeleton className="h-20 w-20 rounded-full" />
						<Skeleton className="h-10 w-full" />
					</div>
				) : error ? (
					<div className="text-red-500 text-center">{error}</div>
				) : (
					<>
						<div className="flex flex-col items-center space-y-2">
							<div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-blue-300 hover:ring-blue-500 transition">
								{user?.fullProfilePicture ? (
									<img
										src={user.fullProfilePicture}
										alt="Profile"
										className="w-full h-full object-cover"
									/>
								) : (
									<FaUserCircle className="w-28 h-28 text-gray-500" />
								)}
							</div>
							{editMode ? (
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="w-full space-y-3"
								>
									<div>
										<Label htmlFor="username">Username</Label>
										<Input
											id="username"
											{...register('username')}
											className={errors.username ? 'border-red-500' : ''}
										/>
										{errors.username && (
											<p className="text-red-500 text-sm">
												{errors.username.message}
											</p>
										)}
									</div>
									<div className="flex cursor-pointer justify-center gap-4">
										<Button type="submit" disabled={saving}>
											{saving ? 'Saving...' : 'Save'}
										</Button>
										<Button
											variant="secondary"
											onClick={() => setEditMode(false)}
										>
											Cancel
										</Button>
									</div>
								</form>
							) : (
								<div className="w-full max-w-sm text-center space-y-2 bg-gray-50 rounded-xl p-2 shadow-md">
									<h1 className="text-2xl font-bold text-blue-700">
										{user?.username}
									</h1>
									<p className="text-gray-500 cursor-pointer text-sm">
										{user?.email}
									</p>
									{signedInUser && (
										<Button className="mt-1" onClick={() => setEditMode(true)}>
											Edit Profile
										</Button>
									)}
								</div>
							)}
						</div>

						{signedInUser && (
							<div className="mt-6">
								<Label htmlFor="fileInput" className="font-semibold">
									Change Profile Picture
								</Label>
								<div className="flex items-center gap-4 mt-1">
									<Input
										id="fileInput"
										type="file"
										accept="image/*"
										onChange={handleFileChange}
									/>
									<Button
										className="cursor-pointer"
										variant="secondary"
										onClick={handleUpload}
										disabled={!imageFile}
									>
										Upload
									</Button>
								</div>
								{imageFile && (
									<div className="flex items-center gap-4">
										<img
											src={URL.createObjectURL(imageFile)}
											alt="Preview"
											className="w-16 h-16 rounded-full object-cover border"
										/>
										<p className="text-sm text-gray-500">
											Selected file:{' '}
											<span className="font-medium">{imageFile.name}</span>
										</p>
									</div>
								)}
							</div>
						)}
					</>
				)}
			</div>
			<div>
				<h2 className="text-2xl font-bold mb-3">User's Posts</h2>
				<div className="space-y-3">
					{posts.length > 0 ? (
						posts.map((post) => (
							<PostItem
								key={post._id}
								post={post}
								onLike={onLike}
								onDelete={onDelete}
								onUpdate={onUpdate}
							/>
						))
					) : (
						<p className="text-center text-gray-500 text-lg mt-10">
							⚽ No posts yet. Get started by sharing something!
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
