import { Request, Response } from "express";
import userModel from "../models/userModel";
import messageModel, { IMessage } from "../models/messageModel";
import { chatGateway } from "../server";

class ChatController {
    async sendMessage (req: Request, res: Response) {
        try {
          const { senderId, receiverId, content } = req.body;

          const sender = await userModel.findById(senderId);
          const receiver = await userModel.findById(receiverId);

          if (!sender || !receiver || !content || content.trim() === '') {
            console.error('Sender or receiver not found');
            return res.status(404).json({ error: "Sender or receiver not found." });
          }
      
          const message = new messageModel({ sender: senderId, receiver: receiverId, content });
          message.save().then((msg: IMessage) => {
            chatGateway.sendMessage(msg);      
            console.log(`Sent message successfully from ${senderId} to -> ${receiverId}`);
            return res.status(201).json(message);
          });
        } catch (error) {
          console.error("Error sending message: ", error);
          return res.status(500).json({ error: "Internal server error" });
        }
    };
      
    async getChatHistory (req: Request, res: Response) {
        try {
          const { firstUserId, secondUserId } = req.params;
      
          const firstUser = await userModel.findById(firstUserId);
          const secondUser = await userModel.findById(secondUserId);

          if (!firstUser || !secondUser) {
            console.error('User not found');
            return res.status(404).json({ error: "User not found." });
          }

          const messages = await messageModel.find({
            $or: [
              { sender: firstUserId, receiver: secondUserId },
              { sender: secondUserId, receiver: firstUserId },
            ],
          })
            .sort({ timestamp: 'ascending' })
            .populate("sender", "username")
            .populate("receiver", "username");

            console.log(`Fetched messages between user: ${firstUserId} and ${secondUserId}`);
            return res.status(200).json(messages);
        } catch (error) {
            console.error("Error fetching chat history:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
    
    async getAllChatsByUserId(req: Request, res: Response) {
      try {
        const currentUserId = (req as any).user._id;
    
        const userIds = await messageModel.distinct("sender", { receiver: currentUserId })
        .then((senders) => 
          messageModel.distinct("receiver", { sender: currentUserId })
            .then((receivers) => [...new Set([...senders, ...receivers])])
        );
    
        let users = await userModel.find(
          { _id: { $in: userIds } },
          "_id username profilePicture"
        );

        users.forEach((user) => {
          if (user.profilePicture) {
            user.profilePicture = `${process.env.BASE_URL}${user.profilePicture}`;
          }
          return user;
        })
    
        console.log('Successfully fetched all chatted users');
        return res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching chatted users:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }    
}

export default new ChatController();