import React, { useEffect, useRef } from "react";
import { Message } from "../models/message";

interface ChatMessagesProps {
  messages?: Message[];
  userId: string;
  selectedChatId: string | null;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages = [], userId, selectedChatId }) => {
  if (!selectedChatId) return null;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 flex ${msg.sender._id === userId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender._id === userId ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
            <div ref={bottomRef} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No messages yet</p>
      )}
    </div>
  );
};

export default ChatMessages;
