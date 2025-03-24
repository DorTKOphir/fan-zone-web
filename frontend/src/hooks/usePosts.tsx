import { useEffect, useState } from 'react';
import { Post } from '@/models/post';
import { deletePost, updateLikes, updatePost } from '@/services/posts';
import { useAuth } from '@/providers/AuthProvider';

export function usePosts(fetchPosts: () => Promise<Post[]>) {
	const { user } = useAuth();
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadPosts = async () => {
			setLoading(true);
			try {
				const data = await fetchPosts();
				setPosts(data);
			} catch (err) {
				setError('Failed to load posts');
			} finally {
				setLoading(false);
			}
		};

		loadPosts();
	}, [fetchPosts]);

	const onLike = async (postId: string) => {
		if (!user) return;

		const post = posts.find((p) => p._id === postId);
		if (!post) return;

		const isLiked = post.likes.includes(user._id);
		const updatedLikes = isLiked
			? post.likes.filter((id) => id !== user._id)
			: [...post.likes, user._id];

		const updatedPost = await updateLikes(postId, { likes: updatedLikes });

		setPosts((prev) => prev.map((p) => (p._id === postId ? updatedPost : p)));
	};

	const onPostCreated = async () => {
		setLoading(true);
		try {
			const data = await fetchPosts();
			setPosts(data);
		} catch (err) {
			setError('Failed to load posts');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async (postId: string) => {
		await deletePost(postId);
		setPosts((prev) => prev.filter((p) => p._id !== postId));
	};

	const onUpdate = async (
		postId: string,
		newContent: string,
		newImage: File | null,
		imageDeleted: boolean,
	) => {
		const updatedPost = await updatePost(postId, {
			content: newContent,
			image: newImage,
			imageDeleted,
		});

		setPosts((prev) => prev.map((p) => (p._id === postId ? updatedPost : p)));
	};

	return {
		posts,
		loading,
		error,
		onLike,
		onPostCreated,
		onDelete,
		onUpdate,
	};
}
