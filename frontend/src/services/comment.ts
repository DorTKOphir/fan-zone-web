import api from './api';
import { Comment, NewComment } from '@/models/comment';

export const addCommentOnPost = async (comment: NewComment): Promise<Comment> => {
	try {
		const response = await api.post(`/comments/${comment.postId}`, {
			content: comment.content,
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
