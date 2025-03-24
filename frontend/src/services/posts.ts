import { Match } from '@/models/match';
import api from './api';
import { Post } from '@/models/post';

export const getPostsByMatchId = async (matchId: string): Promise<Post[]> => {
	const response = await api.get(`/posts/match/${matchId}`);
	return response.data;
};

export const updatePost = async (
	postId: string,
	{
		content,
		likes,
		image,
		imageDeleted,
	}: {
		content?: string;
		likes?: string[];
		image?: File | null;
		imageDeleted?: boolean;
	},
): Promise<Post> => {
	const formData = new FormData();

	if (content) formData.append('content', content);
	if (likes) formData.append('likes', JSON.stringify(likes));
	if (image) formData.append('image', image);
	if (imageDeleted) formData.append('imageDeleted', 'true');

	const response = await api.patch(`/posts/${postId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return response.data;
};

export const updateLikes = async (
	postId: string,
	{
		likes,
	}: {
		likes: string[];
	},
): Promise<Post> => {
	const response = await api.patch(`/posts/like/${postId}`, { likes });

	return response.data;
};

export const createPost = async (
	content: string,
	author: string,
	matchId: string,
	dateCreated: string,
	image: File | null,
) => {
	const formData = new FormData();

	formData.append('content', content);
	formData.append('author', author);
	formData.append('matchId', matchId);
	formData.append('dateCreated', dateCreated);

	if (image) {
		formData.append('image', image);
	}

	const response = await api.post(`/posts`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

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

export const getPostByAuthorId = async (authorId: string): Promise<Post[]> => {
	try {
		const response = await api.get(`/posts/author/${authorId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getPostSuggestion = async (match: Match): Promise<string> => {
	try {
		const response = await api.post(`/posts/suggestion`, { match });
		return response.data.suggestion;
	} catch (error) {
		throw error;
	}
};
