import { Router } from "express";
import CommentController from "../controllers/commentController";
import authMiddleware from "../middlewares/authMiddleware";
import commentMiddleware from "../middlewares/commentMiddleware";

const router = Router();

router.post("/:postId/comments", authMiddleware, CommentController.create.bind(CommentController));
router.patch("/:commentId", authMiddleware, commentMiddleware, CommentController.update.bind(CommentController));
router.delete("/:commentId", authMiddleware, commentMiddleware, CommentController.delete.bind(CommentController));

export default router;
