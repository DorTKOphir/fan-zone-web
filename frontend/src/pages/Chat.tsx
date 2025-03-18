import React, { useEffect, useState } from "react";
import { connectSocket, disconnectSocket, getUserChats, getChatHistory, sendMessage, onNewMessage } from "../services/chat";
import { Message } from "../models/message";
import { ChatListItem } from "../models/chatListItem";
import { useAuth } from "../providers/AuthProvider";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import api from "../services/api";

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ChatListItem[]>([]);

  useEffect(() => {
    connectSocket(user._id);
    fetchChats();
    return () => disconnectSocket();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat._id);
      setSearchResults([]); // Clear search results when selecting a chat
    }
  }, [selectedChat]);

  useEffect(() => {
    const messageListener = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };
    onNewMessage(messageListener);
    return () => {
      if (selectedChat) {
        onNewMessage(() => {}); // Remove listener when chat changes
      }
    };
  }, [selectedChat]);

  const fetchChats = async () => {
    try {
      const chatList = await getUserChats();
      setChats(chatList);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const response = await getChatHistory(user._id, chatId);
      setMessages(response.messages);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    try {
      const message = await sendMessage(user._id, selectedChat._id, newMessage);
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await api.get<ChatListItem[]>(`/users/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Chat List + Search */}
      <div className="w-1/4 border-r p-3 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">Chats</h3>
        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for users..."
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <ChatList 
          chats={searchResults.length > 0 ? searchResults : chats} 
          selectedChat={selectedChat} 
          onSelectChat={setSelectedChat} 
        />
      </div>

      {/* Chat Window */}
      <div className="flex flex-col flex-1">
        <div className="p-3 border-b">
          <h3>{selectedChat ? selectedChat.username : "Select a chat"}</h3>
        </div>
        <ChatMessages messages={messages} userId={user._id} />
        <div className="flex items-center gap-2 p-3 border-t">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
