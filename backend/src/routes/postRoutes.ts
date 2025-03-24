import { Router } from 'express';
import PostController from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';
import postMiddleware from '../middlewares/postMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.get('/:id', PostController.getById.bind(PostController));
router.post(
	'/',
	authMiddleware,
	upload.single('image'),
	PostController.create.bind(PostController),
);
router.patch(
	'/:id',
	authMiddleware,
	postMiddleware,
	upload.single('image'),
	PostController.update.bind(PostController),
);
router.patch('/like/:id', authMiddleware, PostController.updateLikes.bind(PostController));
router.delete('/:id', authMiddleware, postMiddleware, PostController.delete.bind(PostController));
router.get('/match/:matchId', PostController.getPostsByMatchId.bind(PostController));
router.get('/author/:authorId', PostController.getPostsByAuthorId.bind(PostController));
router.post('/suggestion', PostController.getPostSuggestion.bind(PostController));

export default router;
