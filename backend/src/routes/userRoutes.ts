import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import UserController from '../controllers/userController';
import { upload } from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post('/upload-profile-picture', authMiddleware, upload.single('profilePicture'), UserController.uploadProfilePicture.bind(UserController));
router.post("/search", authMiddleware, UserController.searchUsers.bind(UserController));

export default router;
