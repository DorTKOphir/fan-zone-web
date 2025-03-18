import express from 'express';
import matchController from '../controllers/matchController';

const router = express.Router();

router.get('/', matchController.getAll);

export default router;
