import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Match } from '@/models/match';
import { Post } from '@/models/post';
import { useAuth } from '@/providers/AuthProvider';
import { getMatchById } from '@/services/matches';
import {
	getPostsByMatchId,
	handleDelete,
	handleLike,
	handlePostCreated,
	handleUpdate,
} from '@/services/posts';
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

	const onLike = async (postId: string) => handleLike(postId, posts, user, setPosts);

	const onPostCreated = () => handlePostCreated(matchId, setPosts);

	const onDelete = async (postId: string) => handleDelete(postId, setPosts);

	const onUpdate = async (postId: string, newContent: string) =>
		handleUpdate(postId, newContent, setPosts);

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

					<NewPostForm match={match} onPostCreated={handlePostCreated} />

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
									onLike={onLike}
									onDelete={onDelete}
									onUpdate={onUpdate}
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
