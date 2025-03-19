import { Router } from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/:userId', UserController.getById.bind(UserController));
router.patch('/:userId', authMiddleware, UserController.update.bind(UserController));

export default router;
