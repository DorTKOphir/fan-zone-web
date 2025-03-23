import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Match } from '@/models/match';
import { getMatchById } from '@/services/matches';
import PostItem from '@/components/PostItem';
import NewPostForm from '@/components/NewPostForm';
import { usePosts } from '@/hooks/usePosts';
import { getPostsByMatchId } from '@/services/posts';
import { Skeleton } from '@/components/ui/skeleton';

export default function MatchDetails() {
	const { matchId } = useParams<{ matchId: string }>();
	const [match, setMatch] = useState<Match | null>(null);
	const [matchLoading, setMatchLoading] = useState<boolean>(true);

	const fetchPosts = useCallback(async () => {
		if (matchId) {
			return getPostsByMatchId(matchId);
		}
		return [];
	}, [matchId]);

	const { posts, loading: postsLoading, onLike, onPostCreated, onDelete, onUpdate } = usePosts(fetchPosts);

	useEffect(() => {
		if (matchId) {
			setMatchLoading(true);
			getMatchById(matchId)
				.then(setMatch)
				.finally(() => setMatchLoading(false));
		}
	}, [matchId]);

	return (
		<div className="container mx-auto p-6">
			<div className="space-y-4">
				{/* Match info */}
				{matchLoading ? (
					<div className="space-y-2">
						<Skeleton className="h-8 w-1/3" />
						<Skeleton className="h-4 w-1/4" />
					</div>
				) : match ? (
					<>
						<h1 className="text-2xl font-bold">
							{match.homeTeam} vs {match.awayTeam}
						</h1>
						<p className="text-gray-500">
							Date: {new Date(match.date).toLocaleDateString()}
						</p>
					</>
				) : (
					<p className="text-red-500">Match not found</p>
				)}

				{/* New Post Form */}
				{match && <NewPostForm match={match} onPostCreated={onPostCreated} />}

				{/* Posts section */}
				<h2 className="text-xl font-semibold mt-6">Posts</h2>

				{postsLoading ? (
					<div className="space-y-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="space-y-2">
								<Skeleton className="h-6 w-1/2" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-60 w-full rounded-md" />
							</div>
						))}
					</div>
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
