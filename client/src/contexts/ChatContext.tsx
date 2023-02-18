import React, { createContext, useContext, useState } from "react";
import { Chat, ChatContextType } from "../types/chat";

export const ChatContext = createContext<ChatContextType | null>(null);

type props = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<props> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const values: ChatContextType = {
    chats,
    setChats,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext) as ChatContextType;
