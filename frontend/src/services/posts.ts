import { Match } from '@/models/match';
import User from '@/models/user';
import api from './api';
import { Post } from '@/models/post';

export const getPostsByMatchId = async (matchId: string): Promise<Post[]> => {
	const response = await api.get(`/posts/match/${matchId}`);
	return response.data;
};

export const updatePost = async (postId: string, updatedData: Partial<Post>): Promise<Post> => {
	const response = await api.patch(`/posts/${postId}`, updatedData);
	return response.data;
};

export const createPost = async (postData: {
	content: string;
	author: string;
	matchId: string;
	dateCreated: string;
}) => {
	const response = await api.post(`/posts`, postData);
	return response.data;
};

export const deletePost = async (postId: string): Promise<void> => {
	await api.delete(`/posts/${postId}`);
};

export const getPostById = async (postId: string): Promise<Post> => {
	try {
		const response = await api.get(`/posts/${postId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getPostSuggestion = async (match: Match): Promise<string> => {
	try {
		const response = await api.post(`/posts/getSuggestion`, { match });
		return response.data.suggestion;
	} catch (error) {
		throw error;
	}
};

export const getPostByAuthorId = async (authorId: string): Promise<Post[]> => {
	try {
		const response = await api.get(`/posts/author/${authorId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const handleLike = async (
	postId: string,
	posts: Post[],
	user: User | null,
	setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
) => {
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

export const handlePostCreated = (
	matchId: string | undefined,
	setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
) => {
	if (matchId) {
		getPostsByMatchId(matchId).then(setPosts);
	}
};

export const handleDelete = async (
	postId: string,
	setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
) => {
	await deletePost(postId);
	setPosts((prev) => prev.filter((p) => p._id !== postId));
};

export const handleUpdate = async (
	postId: string,
	newContent: string,
	setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
) => {
	const updatedPost = await updatePost(postId, { content: newContent });
	setPosts((prev) => prev.map((p) => (p._id === postId ? updatedPost : p)));
};
