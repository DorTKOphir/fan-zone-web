import { PostResponse } from '@/models/post';
import api from './api';

export const getPostById = async (postId: string): Promise<PostResponse> => {
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
