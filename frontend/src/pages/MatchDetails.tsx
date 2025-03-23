import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Match } from '@/models/match';
import { useAuth } from '@/providers/AuthProvider';
import { getMatchById } from '@/services/matches';
import PostItem from '@/components/PostItem';
import NewPostForm from '@/components/NewPostForm';
import { usePosts } from '@/hooks/usePosts';
import { getPostsByMatchId } from '@/services/posts';

export default function MatchDetails() {
	const { matchId } = useParams<{ matchId: string }>();
	const [match, setMatch] = useState<Match | null>(null);

	const fetchPosts = useCallback(async () => {
		if (matchId) {
			return getPostsByMatchId(matchId);
		}
		return [];
	}, [matchId]);

	const { posts, loading, onLike, onPostCreated, onDelete, onUpdate } = usePosts(fetchPosts);

	useEffect(() => {
		if (matchId) {
			getMatchById(matchId).then(setMatch);
		}
	}, [matchId]);

	if (!match) return <p>Loading match details...</p>;

	return (
		<div className="container mx-auto p-6">
			<div className="space-y-4">
				<h1 className="text-2xl font-bold">
					{match.homeTeam} vs {match.awayTeam}
				</h1>
				<p className="text-gray-500">Date: {new Date(match.date).toLocaleDateString()}</p>

				<NewPostForm match={match} onPostCreated={onPostCreated} />

				<h2 className="text-xl font-semibold mt-6">Posts</h2>

				{loading ? (
					<p className="text-gray-500">Loading posts...</p>
				) : posts.length === 0 ? (
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
		</div>
	);
}
