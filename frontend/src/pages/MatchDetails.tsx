import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Match } from '@/models/match';
import Post from '@/models/post';
import { useAuth } from '@/providers/AuthProvider';
import { getMatchById } from '@/services/matches';
import { deletePost, getPostsByMatchId, updatePost } from '@/services/posts';
import PostItem from '@/components/PostItem';
import NewPostForm from '@/components/NewPostForm';

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

		const updatedPost = await updatePost(postId, { likes: updatedLikes });

		setPosts((prev) => prev.map((p) => (p._id === postId ? updatedPost : p)));
	};

	const handlePostCreated = () => {
		if (matchId) {
			getPostsByMatchId(matchId).then(setPosts);
		}
	};

	const handleDelete = async (postId: string) => {
		await deletePost(postId);
		setPosts((prev) => prev.filter((p) => p._id !== postId));
	};

	const handleUpdate = async (postId: string, newContent: string) => {
		const updatedPost = await updatePost(postId, { content: newContent });
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

					<NewPostForm matchId={matchId!} onPostCreated={handlePostCreated} />

					<h2 className="text-xl font-semibold mt-6">Posts</h2>
					{posts.length === 0 ? (
						<p className="text-gray-500">
							No posts yet. Be the first to share your thoughts!
						</p>
					) : (
						<div className="space-y-4">
							{posts.map((post) => (
								<PostItem
									key={post._id}
									post={post}
									onLike={handleLike}
									onDelete={handleDelete}
									onUpdate={handleUpdate}
								/>
							))}
						</div>
					)}
				</div>
			) : (
				<p>Loading match details...</p>
			)}
		</div>
	);
}
