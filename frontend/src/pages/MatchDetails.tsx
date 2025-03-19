import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Match } from '@/models/match';
import Post from '@/models/post';
import { useAuth } from '@/providers/AuthProvider';
import { getMatchById } from '@/services/matches';
import { getPostsByMatchId, updatePost } from '@/services/posts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaComment, FaHeart, FaRegHeart } from 'react-icons/fa';
import UserAvatar from '@/components/UserAvatar';

export default function MatchDetails() {
	const { matchId } = useParams<{ matchId: string }>();
	const [match, setMatch] = useState<Match | null>(null);
	const [posts, setPosts] = useState<Post[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		if (matchId) {
			getMatchById(matchId).then(setMatch);
			getPostsByMatchId(matchId).then(setPosts);
		}
	}, [matchId]);

	const handleLike = async (postId: string) => {
		if (!user) return;

		const post = posts.find((p) => p._id === postId);
		if (!post) return;

		const isLiked = post.likes.includes(user._id);
		const updatedLikes = isLiked
			? post.likes.filter((id) => id !== user._id)
			: [...post.likes, user._id];

		// Update post using the existing update API
		const updatedPost = await updatePost(postId, { likes: updatedLikes });

		setPosts((prev) => prev.map((p) => (p._id === postId ? updatedPost : p)));
	};

	if (!match) return <p>Loading match details...</p>;

	return (
		<div className="container mx-auto p-6">
			{match ? (
				<div className="space-y-4">
					<h1 className="text-2xl font-bold">
						{match.homeTeam} vs {match.awayTeam}
					</h1>
					<p className="text-gray-500">
						Date: {new Date(match.date).toLocaleDateString()}
					</p>

					<h2 className="text-xl font-semibold mt-6">Posts</h2>
					<div className="space-y-4">
						{posts.map((post) => (
							<Card key={post._id} className="p-4">
								<div className="flex items-center space-x-4">
									<UserAvatar profilePicUrl={post.author.profilePicUrl} />
									<div>
										<p className="font-semibold">{post.author.username}</p>
										<p className="text-sm text-gray-500">
											{new Date(post.dateCreated).toLocaleDateString()}
										</p>
									</div>
								</div>
								<p className="mt-2">{post.content}</p>
								<div className="flex items-center space-x-4 mt-4">
									<Button variant="ghost" onClick={() => handleLike(post._id)}>
										{post.likes.includes(user?._id ?? '') ? (
											<FaHeart className="text-red-500" />
										) : (
											<FaRegHeart />
										)}
										<span className="ml-1">{post.likes.length}</span>
									</Button>
									<Button variant="ghost">
										<FaComment />
										<span className="ml-1">{post.comments.length}</span>
									</Button>
								</div>
							</Card>
						))}
					</div>
				</div>
			) : (
				<p>Loading match details...</p>
			)}
		</div>
	);
}
