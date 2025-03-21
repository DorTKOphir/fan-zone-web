import { Request, Response, NextFunction } from 'express';
import commentModel from '../models/commentModel';

const commentMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const comment = await commentModel.findById(req.params.commentId);

		if (!comment) {
			res.status(404).json({ error: 'Comment not found' });
			return;
		}

		if (String(comment.author) !== String((req as any).user._id)) {
			res.status(403).json({ error: 'Unauthorized: You are not the author of this comment' });
			return;
		}

		next();
	} catch (error) {
		res.status(500).json({ error: 'Error checking comment ownership' });
	}
};

export default commentMiddleware;
