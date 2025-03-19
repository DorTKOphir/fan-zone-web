import { IPost } from '@/models/post';
import api from './api';

export const getPostById = async (postId: string): Promise<IPost> => {
	try {
		const response = await api.get(`/posts/${postId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
