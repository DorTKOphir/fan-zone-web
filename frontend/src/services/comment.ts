import api from './api';
import { Comment } from '@/models/comment';

export const addCommentOnPost = async (postId: string, commentContent: string): Promise<Comment> => {
	try {
		const response = await api.post(`/comments/${postId}`, {
			content: commentContent,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteComment = async (commentId: string) => {
	try {
		await api.delete(`/comments/${commentId}`);
	} catch (error) {
		throw error;
	}
};
