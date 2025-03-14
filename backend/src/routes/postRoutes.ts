import { Router } from 'express';
import PostController from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';
import postMiddleware from '../middlewares/postMiddleware';

const router = Router();

router.get('/:id', PostController.getById.bind(PostController));
router.post('/', authMiddleware, PostController.create.bind(PostController));
router.put('/:id', authMiddleware, postMiddleware, PostController.update.bind(PostController));
router.delete('/:id', authMiddleware, postMiddleware, PostController.delete.bind(PostController));
// router.get('/match/:matchId', authMiddleware, PostController.getPostsByMatchId.bind(PostController));

export default router;