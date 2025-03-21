import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import UserController from '../controllers/userController';

const router = express.Router();

router.get("/", authMiddleware, UserController.getUser.bind(UserController));
router.patch("/", authMiddleware, UserController.updateUser.bind(UserController));
router.get("/search", authMiddleware, UserController.searchUsers.bind(UserController));

export default router;
