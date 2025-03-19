import React, { useEffect, useState } from "react";
import { 
  connectSocket, 
  disconnectSocket, 
  getUserChats, 
  getChatHistory, 
  sendMessage, 
  onNewMessage 
} from "../services/chat";
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

  // Connect to socket when user is available
  useEffect(() => {
    if (!user?._id) return; // Prevent running if user is not available

    connectSocket(user._id);
    fetchChats();

    return () => {
      disconnectSocket();
    };
  }, [user?._id]);

  // Fetch messages when a chat is selected
  useEffect(() => {
    if (!selectedChat || !user?._id) return;

    fetchMessages(selectedChat._id);
    setSearchResults([]); // Clear search results when selecting a chat
  }, [selectedChat, user?._id]);

  // Listen for new messages in the current chat
  useEffect(() => {
    if (!user?._id) return;

    const messageListener = (message: Message) => {
      setMessages((prev = []) => [...prev, message]);
    };

    onNewMessage(messageListener);

    return () => {
      onNewMessage(() => {}); // Unsubscribe from new messages when chat changes
    };
  }, [selectedChat, user?._id]);

  // Fetch user's chat list
  const fetchChats = async () => {
    if (!user?._id) return;

    try {
      const chatList = await getUserChats();
      setChats(chatList);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  // Fetch messages for a specific chat
  const fetchMessages = async (chatId: string) => {
    if (!user?._id) return;

    try {
      const messages = await getChatHistory(user._id, chatId);
      setMessages(messages);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !user?._id) return;

    try {
      const message = await sendMessage(user._id, selectedChat._id, newMessage);
      setMessages((prev = []) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  // Handle user search
  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery || !user?._id) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await api.get<ChatListItem[]>(`/users/search?usernameQuery=${trimmedQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users", error);
      setSearchResults([]);
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading chat...</p>
      </div>
    );
  }

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
            disabled={!user}
          />
          <Button className="cursor-pointer" onClick={handleSearch} disabled={!user}>
            Search
          </Button>
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
            disabled={!user}
          />
          <Button
            className="cursor-pointer"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !selectedChat || !user}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;