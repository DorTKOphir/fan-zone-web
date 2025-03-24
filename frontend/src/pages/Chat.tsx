import React, { useEffect, useState } from 'react';
import {
	connectSocket,
	disconnectSocket,
	getUserChats,
	getChatHistory,
	sendMessage,
	onNewMessage,
	onChatListUpdate,
} from '../services/chat';
import { Message } from '../models/message';
import { ChatListItem } from '../models/chatListItem';
import { useAuth } from '../providers/AuthProvider';
import ChatList from '../components/ChatList';
import ChatMessages from '../components/ChatMessages';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import api from '../services/api';

const Chat: React.FC = () => {
	const { user } = useAuth();
	const [chats, setChats] = useState<ChatListItem[]>([]);
	const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<ChatListItem[]>([]);

	useEffect(() => {
		if (!user?._id) return;

		connectSocket(user._id);
		fetchChats();
		onChatListUpdate(fetchChats);

		return () => {
			disconnectSocket();
			onChatListUpdate(() => {});
		};
	}, [user?._id]);

	useEffect(() => {
		if (!selectedChat || !user?._id) {
			setMessages([]);
			return;
		}

		fetchMessages(selectedChat._id);
		setSearchResults([]);
	}, [selectedChat, user?._id]);

	useEffect(() => {
		if (!user?._id) return;

		const messageListener = async (message: Message) => {
			const incomingId =
				message.sender._id === user._id ? message.receiver._id : message.sender._id;

			if (selectedChat && selectedChat._id === incomingId) {
				setMessages((prev) => [...prev, message]);
			}

			const newChats = await fetchChatsAndReturn();
			if (selectedChat) {
				const updated = newChats.find((c) => c._id === selectedChat._id);
				if (updated) setSelectedChat(updated);
			}
		};

		onNewMessage(messageListener);

		return () => {
			onNewMessage(() => {});
		};
	}, [selectedChat, user?._id]);

	const fetchChats = async () => {
		if (!user?._id) return;

		try {
			const chatList = await getUserChats();
			setChats(chatList);
		} catch (error) {
			console.error('Error fetching chats', error);
		}
	};

	const fetchChatsAndReturn = async (): Promise<ChatListItem[]> => {
		try {
			const chatList = await getUserChats();
			setChats(chatList);
			return chatList;
		} catch (error) {
			console.error('Error fetching chats', error);
			return [];
		}
	};

	const fetchMessages = async (chatId: string) => {
		if (!user?._id) return;

		try {
			const messages: Message[] = await getChatHistory(user._id, chatId);
			setMessages(messages);
		} catch (error) {
			console.error('Error fetching messages', error);
		}
	};

	const handleSendMessage = async () => {
		if (!newMessage.trim() || !selectedChat || !user?._id) return;

		try {
			const message = await sendMessage(user._id, selectedChat._id, newMessage);

			setMessages((prev = []) => [
				...prev,
				{
					...message,
					sender: { _id: user._id, username: user.username },
					receiver: { _id: selectedChat._id, username: selectedChat.username },
				},
			]);

			setNewMessage('');
			setSearchQuery('');
			setSearchResults([]);
		} catch (error) {
			console.error('Error sending message', error);
		}
	};

	const handleSearch = async () => {
		const trimmedQuery = searchQuery.trim();
		if (!trimmedQuery || !user?._id) {
			setSearchResults([]);
			return;
		}

		try {
			const response = await api.get<ChatListItem[]>(
				`/users/search?usernameQuery=${trimmedQuery}`,
			);
			setSearchResults(response.data);
		} catch (error) {
			console.error('Error searching users', error);
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
		<div className="flex h-[80vh] w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
			{/* Chat List + Search */}
			<div className="w-1/4 h-full p-4 border-r bg-gray-50 flex flex-col gap-4">
				<h3 className="text-lg font-semibold mb-2">Chats</h3>

				<div className="flex gap-2 my-3">
					<Input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyUp={() => handleSearch()}
						placeholder="Search for users..."
						disabled={!user}
					/>
					<Button className="cursor-pointer" onClick={handleSearch} disabled={!user}>
						Search
					</Button>
				</div>

				<div className="flex-1 overflow-y-auto min-h-0">
					<ChatList
						chats={searchQuery.trim() ? searchResults : chats}
						selectedChat={selectedChat}
						onSelectChat={(chat) => {
							setSelectedChat(chat);
							setSearchQuery('');
							setSearchResults([]);
						}}
					/>
				</div>
			</div>

			{/* Chat Window */}
			<div className="flex flex-col flex-1 h-full">
				<div className="p-3 border-b flex-shrink-0 bg-white text-gray-700 text-lg font-semibold shadow-sm">
					{selectedChat ? selectedChat.username : 'Select a conversation'}
				</div>

				<div className="flex-1 overflow-y-auto p-3 min-h-0">
					{selectedChat ? (
						<ChatMessages
							messages={messages}
							userId={user._id}
							selectedChatId={selectedChat._id}
						/>
					) : (
						<div className="h-full w-full flex items-center justify-center text-gray-400 italic">
							Start a conversation by selecting a user.
						</div>
					)}
				</div>

				<div className="p-3 border-t flex items-center gap-2 bg-white flex-shrink-0 h-[60px]">
					<Input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSendMessage();
						}}
						placeholder="Type a message"
						disabled={!user}
						className="flex-1"
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
