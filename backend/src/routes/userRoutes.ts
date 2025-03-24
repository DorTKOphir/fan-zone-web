import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import UserController from '../controllers/userController';
import { upload } from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post('/upload-profile-picture', authMiddleware, upload.single('profilePicture'), UserController.uploadProfilePicture.bind(UserController));
router.get("/", authMiddleware, UserController.getUser.bind(UserController));
router.patch("/", authMiddleware, UserController.updateUser.bind(UserController));
router.get("/search", authMiddleware, UserController.searchUsers.bind(UserController));
router.get('/:userId', authMiddleware, UserController.getUserById.bind(UserController));

export default router;
