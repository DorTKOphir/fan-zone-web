import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PostItem from '@/components/PostItem';
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { getPostByAuthorId, handleDelete, handleLike, handleUpdate } from '@/services/posts';
import { Post } from '@/models/post';
import { updateUser, uploadProfilePicture } from '@/services/user';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Define the Zod schema for validation
const schema = z.object({
	username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
	email: z.string().email({ message: 'Please enter a valid email' }),
});

const Profile = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(schema),
	});

	const { user, reloadUser } = useAuth();
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [saving, setSaving] = useState(false);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		const fetchProfileData = async () => {
			if (user) {
				try {
					const userPosts = await getPostByAuthorId(user._id);
					setPosts(userPosts);
				} catch (err) {
					setError('Failed to load profile or posts');
				}
			}
			setLoading(false);
		};

		const initUpdtableFields = () => {
			if (user) {
				setValue('username', user.username);
				setValue('email', user.email);
			}
		};

		fetchProfileData();
		initUpdtableFields();
	}, [user, setValue]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (file) {
			setImageFile(file);
		}
	};

	const handleUpload = async (event?: React.MouseEvent<HTMLButtonElement>) => {
		event?.preventDefault();

		if (imageFile && user) {
			try {
				setLoading(true);
				await uploadProfilePicture(imageFile);
				await reloadUser();
				setImageFile(null);
			} catch (error) {
				setError('Failed to upload profile picture');
			} finally {
				setLoading(false);
			}
		}
	};

	const onSubmit = async (data: { username: string; email: string }) => {
		if (!user) return;

		setSaving(true);
		try {
			await updateUser({ ...user, username: data.username, email: data.email });
			await reloadUser();
			setEditMode(false);
		} catch (error) {
			setError('Failed to update profile');
		} finally {
			setSaving(false);
		}
	};

	const onLike = async (postId: string) => handleLike(postId, posts, user, setPosts);
	const onDelete = async (postId: string) => handleDelete(postId, setPosts);
	const onUpdate = async (postId: string, newContent: string, newImage: File | null, imageDeleted: boolean) =>
		handleUpdate(postId, newContent, newImage, imageDeleted, setPosts);

	return (
		<div>
			<div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
				{loading ? (
					<div className="space-y-4">
						<Skeleton className="h-8 w-32" />
						<Skeleton className="h-24 w-24 rounded-full" />
						<Skeleton className="h-10 w-full" />
					</div>
				) : error ? (
					<div className="text-red-500 text-center">{error}</div>
				) : (
					<>
						<div className="flex flex-col items-center space-y-4">
							<div className="w-24 h-24 rounded-full border overflow-hidden">
								{user?.fullProfilePicture ? (
									<img
										src={user.fullProfilePicture}
										alt="Profile"
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl font-bold">
										{user?.username[0]}
									</div>
								)}
							</div>
							{editMode ? (
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="w-full space-y-4"
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
									<div>
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											{...register('email')}
											className={errors.email ? 'border-red-500' : ''}
										/>
										{errors.email && (
											<p className="text-red-500 text-sm">
												{errors.email.message}
											</p>
										)}
									</div>
									<div className="flex justify-center gap-4">
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
								<div className="text-center">
									<h1 className="text-2xl font-bold">{user?.username}</h1>
									<p className="text-gray-500">{user?.email}</p>
									<Button className="mt-4" onClick={() => setEditMode(true)}>
										Edit Profile
									</Button>
								</div>
							)}
						</div>

						<div className="mt-6">
							<Label htmlFor="fileInput" className="font-semibold">
								Change Profile Picture
							</Label>
							<div className="flex items-center gap-4 mt-2">
								<Input
									id="fileInput"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
								/>
								<Button
									variant="secondary"
									onClick={handleUpload}
									disabled={!imageFile}
								>
									Upload
								</Button>
							</div>
							{imageFile && (
								<div className="mt-4 flex items-center gap-4">
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
					</>
				)}
			</div>
			<div>
				<h2 className="text-2xl font-bold mb-4">User's Posts</h2>
				<div className="space-y-6">
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
						<p className="text-muted-foreground">No posts found.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
