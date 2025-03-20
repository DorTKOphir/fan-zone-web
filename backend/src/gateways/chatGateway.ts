import { Server, Socket } from "socket.io";
import { IMessage } from "../models/messageModel";

class ChatGateway {
  private readonly io: Server;
  private readonly userSockets: Map<string, string>;

  constructor(io: Server) {
    this.io = io;
    this.userSockets = new Map<string, string>();
    this.initializeSocketEvents();
  }

  public sendMessage(msg: IMessage): void {
    const receiverSocketId = this.userSockets.get(msg.receiver.toString());
    if (receiverSocketId) {
      this.io.to(receiverSocketId).emit("newMessage", msg);
      this.io.to(receiverSocketId).emit('chatListUpdate');  
    }
  }

  private initializeSocketEvents(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      // Register user with their socket ID
      socket.on("register", (userId: string) => this.registerUser(socket, userId));

      // Handle user disconnect
      socket.on("disconnect", () => this.handleDisconnect(socket));
    });
  }

  private registerUser(socket: Socket, userId: string): void {
    this.userSockets.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  }
  
  private handleDisconnect(socket: Socket): void {
    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === socket.id) {
        this.io.to(socketId).disconnectSockets();
        this.userSockets.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  }
}

export default ChatGateway;
