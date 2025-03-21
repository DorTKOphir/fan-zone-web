'use client';

import PostItem from '@/components/PostItem';
import { Post } from '@/models/post';
import { useAuth } from '@/providers/AuthProvider';
import { getPostByAuthorId, handleDelete, handleLike, handleUpdate } from '@/services/posts';
import { uploadProfilePicture } from '@/services/user';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

const Profile = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const { user, updateUser } = useAuth();

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
		fetchProfileData();
	}, [user]);

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
				await updateUser();
				setImageFile(null);
			} catch (error) {
				setError('Failed to upload profile picture');
			} finally {
				setLoading(false);
			}
		}
	};

	const onLike = async (postId: string) => handleLike(postId, posts, user, setPosts);
	const onDelete = async (postId: string) => handleDelete(postId, setPosts);
	const onUpdate = async (postId: string, newContent: string) =>
		handleUpdate(postId, newContent, setPosts);

	return (
		<div className="max-w-3xl mx-auto mt-10 px-4">
			{loading ? (
				<div className="space-y-4">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-24 w-24 rounded-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			) : error ? (
				<div className="text-red-500">{error}</div>
			) : (
				<>
					<div className="flex items-center space-x-6 mb-8">
						<div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
							{user?.fullProfilePicture ? (
								<img
									src={user.fullProfilePicture}
									alt="Profile"
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full bg-muted flex items-center justify-center text-xl text-muted-foreground">
									{user?.username[0]}
								</div>
							)}
						</div>

						<div>
							<h1 className="text-3xl font-bold">{user?.username}</h1>
							<p className="text-muted-foreground">{user?.email}</p>
						</div>
					</div>

					<div className="mb-6 space-y-2">
						<Label htmlFor="fileInput" className="text-base font-semibold">
							Change Profile Picture
						</Label>

						<div className="flex items-center gap-4">
							<Input
								id="fileInput"
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								className="w-full max-w-sm"
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
								<p className="text-sm text-muted-foreground">
									Selected file:{' '}
									<span className="font-medium">{imageFile.name}</span>
								</p>
							</div>
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
				</>
			)}
		</div>
	);
};

export default Profile;
