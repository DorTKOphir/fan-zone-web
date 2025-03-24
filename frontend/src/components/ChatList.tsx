import React from "react";
import { ChatListItem } from "../models/chatListItem";
import { DEFAULT_PROFILE_PIC } from "@/constants/images";

interface ChatListProps {
  chats: ChatListItem[];
  selectedChat: ChatListItem | null;
  onSelectChat: (chat: ChatListItem) => void;
}


const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onSelectChat,
}) => {
  return (
    <div className="flex flex-col overflow-y-auto">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat._id}
            className={`p-3 cursor-pointer border-b flex items-center gap-3 ${
              selectedChat?._id === chat._id ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => onSelectChat(chat)}
          >
            <img
              src={chat.fullProfilePicture || DEFAULT_PROFILE_PIC}
              alt={`${chat.username}'s profile`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{chat.username}</span>
          </div>
        ))
      ) : (
				<p className="text-center text-gray-500 mt-3">No chats found. Start chatting!</p>
      )}
    </div>
  );
};

export default ChatList;
