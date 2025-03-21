import User from '@/models/user';
import { useAuth } from '@/providers/AuthProvider';
import { getPostByAuthorId } from '@/services/posts';
import { updateUser } from '@/services/user';
import { useState, useEffect } from 'react';

interface Post {
	_id: string;
	content: string;
	dateCreated: string;
	author: User;
}

const Profile = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const { user } = useAuth();

	useEffect(() => {
		const fetchProfileData = async () => {
			if (user) {
				try {
					const userPostsData = await getPostByAuthorId(user._id);
					const userPosts = userPostsData.map((userPostData) => ({
						...userPostData,
						author: user,
					}));
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

	const handleUpload = async () => {
		if (imageFile && user) {
			try {
				setLoading(true);
				const formData = new FormData();
				formData.append('profilePic', imageFile);

				// const response = await updateUser({_id: user._id, profilePicUrl: });

				// setUser((prevUser) => ({
				//   ...prevUser!,
				//   profilePicUrl: response.data.profilePicUrl,
				// }));
				setLoading(false);
			} catch (error) {
				setError('Failed to upload profile picture');
				setLoading(false);
			}
		}
	};

	return (
		<div className="w-[70%] mx-auto mt-10 p-4">
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<>
					<div className="flex items-center space-x-6 mb-8">
						<div className="w-24 h-24 rounded-full overflow-hidden">
							{user?.profilePicture ? (
								<img
									src={`http://localhost:5000${user.profilePicture}`}
									alt="Profile"
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full bg-gray-200 text-center flex items-center justify-center text-xl text-gray-600">
									{user?.username[0]}
								</div>
							)}
						</div>

						<div>
							<h1 className="text-3xl font-bold">{user?.username}</h1>
							<p className="text-lg text-gray-500">{user?.email}</p>
						</div>
					</div>

					<div className="mb-6">
						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="hidden"
							id="fileInput"
						/>
						<label
							htmlFor="fileInput"
							className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
						>
							Upload Profile Picture
						</label>
						{imageFile && (
							<div className="mt-2 text-sm text-gray-500">
								<p>Selected file: {imageFile.name}</p>
								<button
									onClick={handleUpload}
									className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
								>
									Upload
								</button>
							</div>
						)}
					</div>

					<div>
						<h2 className="text-2xl font-bold mb-4">User's Posts</h2>
						<div className="space-y-6">
							{posts.length > 0 ? (
								posts.map((post) => (
									<div
										key={post._id}
										className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition"
									>
										<div className="flex justify-between mb-3">
											<span className="font-semibold text-lg">
												{post.author.username}
											</span>
											<span className="text-sm text-gray-500">
												{new Date(post.dateCreated).toLocaleString()}
											</span>
										</div>
										<p className="text-gray-700">{post.content}</p>
										<button
											className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
											onClick={() => alert(`Viewing Post ${post._id}`)}
										>
											View Details
										</button>
									</div>
								))
							) : (
								<div>No posts found.</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Profile;
