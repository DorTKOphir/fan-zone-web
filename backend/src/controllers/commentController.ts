import { Request, Response } from 'express';
import commentModel from '../models/commentModel';
import postModel from '../models/postModel';

class CommentController {
	async create(req: Request, res: Response) {
		try {
			const { content } = req.body;
			const postId = req.params.postId;
			const author = (req as any).user._id;

			if (!content || !postId) {
				console.error('Content and postId are required');
				return res.status(400).json({ error: 'Content and postId are required' });
			}

			const newComment = new commentModel({
				content,
				author,
				dateCreated: new Date(),
			});

			(await newComment.save()).populate('author');

			await postModel.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

			console.log('Comment created successfully');
			res.status(201).json(newComment);
		} catch (error) {
			console.error('Error creating content');
			res.status(500).json({ error: 'Error creating comment' });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { content } = req.body;
			if (!content) {
				console.error('Content is required');
				return res.status(400).json({ error: 'Content is required' });
			}

			const updatedComment = await commentModel.findByIdAndUpdate(
				req.params.commentId,
				{ content },
				{ new: true },
			);

			if (!updatedComment) {
				console.error('Comment not found');
				return res.status(404).json({ error: 'Comment not found' });
			}

			console.log('Comment updated successfully');
			res.status(200).json(updatedComment);
		} catch (error) {
			console.error('Error updating comment');
			res.status(500).json({ error: 'Error updating comment' });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const commentId = req.params.commentId;
			const comment = await commentModel.findById(commentId);

			if (!comment) {
				console.error('Comment not found');
				return res.status(404).json({ error: 'Comment not found' });
			}

			await commentModel.findByIdAndDelete(commentId);

			await postModel.updateOne({ comments: commentId }, { $pull: { comments: commentId } });

			console.log('Comment deleted successfully');
			res.status(200).json({ message: 'Comment deleted successfully' });
		} catch (error) {
			console.error('Error deleting comment');
			res.status(500).json({ error: 'Error deleting comment' });
		}
	}
}

export default new CommentController();
