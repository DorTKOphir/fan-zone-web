import { Comment } from '@/models/comment';
import api from './api';

export const getPostById = async (postId: string): Promise<any> => {
	try {
		const response = await api.get(`/posts/${postId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
