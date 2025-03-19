import { useAuth } from '@/providers/AuthProvider';
import { useState, useEffect } from 'react';

interface User {
	_id: string;
	username: string;
	email: string;
	profilePicUrl: string | null;
}

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
	const { user } = useAuth();

	// Fetch user profile
	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				// const userPosts = await getUserPosts(userId);
				// setPosts(userPosts);
				setLoading(false);
			} catch (err) {
				setError('Failed to load profile or posts');
				setLoading(false);
			}
		};
		fetchProfileData();
	}, [user]);

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
							{user?.profilePicUrl ? (
								<img
									src={user.profilePicUrl}
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
