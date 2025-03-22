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

export const getPostByAuthorId = async (authorId: string): Promise<PostResponse[]> => {
	try {
		const response = await api.get(`/posts/author/${authorId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
