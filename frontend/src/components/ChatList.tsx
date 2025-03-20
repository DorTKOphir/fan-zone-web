import React, { useEffect, useState } from "react";
import { ChatListItem } from "../models/chatListItem";
import { onChatListUpdate, getUserChats } from "../services/chat";

interface ChatListProps {
  selectedChat: ChatListItem | null;
  onSelectChat: (chat: ChatListItem) => void;
}

const ChatList: React.FC<ChatListProps> = ({ selectedChat, onSelectChat }) => {
  const [chats, setChats] = useState<ChatListItem[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const userChats = await getUserChats();
      setChats(userChats);
    };

    fetchChats();
    onChatListUpdate(fetchChats);

    return () => {
      onChatListUpdate(() => {});
    };
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat._id}
            className={`p-3 cursor-pointer border-b ${selectedChat?._id === chat._id ? "bg-gray-200" : "bg-white"}`}
            onClick={() => onSelectChat(chat)}
          >
            {chat.username}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-3">No chats available</p>
      )}
    </div>
  );
};

export default ChatList;
