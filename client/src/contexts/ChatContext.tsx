import React, { createContext, useContext, useState } from "react";
import { fetchAllChats } from "../services/chatService";
import { Chat, ChatContextType } from "../types/chat";

export const ChatContext = createContext<ChatContextType | null>(null);

type props = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<props> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const getAllChats = () => {
    fetchAllChats()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const values: ChatContextType = {
    chats,
    setChats,
    getAllChats,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext) as ChatContextType;
