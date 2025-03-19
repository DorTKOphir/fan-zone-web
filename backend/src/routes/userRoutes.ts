import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import UserController from '../controllers/userController';

const router = express.Router();

router.post("/search", authMiddleware, UserController.searchUsers.bind(UserController));

export default router;
