import express from "express";
import ChatController from "../controllers/chatController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/send", authMiddleware ,ChatController.sendMessage.bind(ChatController));
router.get("/history/:user1/:user2", authMiddleware ,ChatController.getChatHistory.bind(ChatController));
router.get("/chats",authMiddleware, ChatController.getAllChatsByUserId.bind(ChatController));

export default router;
