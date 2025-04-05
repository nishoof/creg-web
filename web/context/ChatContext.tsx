"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  isOpen: boolean;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(true); // Default to open

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages, isOpen, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};