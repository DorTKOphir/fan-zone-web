import { Router } from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, UserController.getUser.bind(UserController));
router.patch("/", authMiddleware, UserController.updateUser.bind(UserController));

export default router;
