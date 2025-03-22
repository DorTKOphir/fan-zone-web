import express from 'express';
import matchController from '../controllers/matchController';

const router = express.Router();

router.get('/', matchController.getAll);
router.get("/:id", matchController.getById);

export default router;
