import api from "../services/api";
import { io, Socket } from "socket.io-client";
import { Message } from "../models/message";
import { ChatListItem } from "../models/chatListItem";

const SOCKET_URL = "http://localhost:5000";

let socket: Socket | null = null;

/** Initialize WebSocket connection */
export const connectSocket = (userId: string) => {
  socket = io(SOCKET_URL, {
    auth: { token: localStorage.getItem("accessToken") },
  });
  socket.emit("register", userId);
};

/** Disconnect WebSocket */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/** Listen for new messages */
export const onNewMessage = (callback: (message: Message) => void) => {
  socket?.on("newMessage", callback);
};

/** Send a message */
export const sendMessage = async (
  senderId: string,
  receiverId: string,
  content: string
): Promise<Message> => {
  const response = await api.post<Message>("/chat/send", { senderId, receiverId, content });
  return response.data;
};

/** Fetch chat history between two users */
export const getChatHistory = async (user1: string, user2: string): Promise<{ messages: Message[] }> => {
  const response = await api.get<{ messages: Message[] }>(`/chat/history/${user1}/${user2}`);
  return response.data;
};

/** Fetch all chats for the logged-in user */
export const getUserChats = async (): Promise<ChatListItem[]> => {
  const response = await api.get<ChatListItem[]>("/chat/chats");
  return response.data;
};
