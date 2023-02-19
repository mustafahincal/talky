import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchAllChats,
  fetchAllMessagesByChatId,
} from "../services/chatService";
import { Chat, ChatContextType } from "../types/chat";
import { Message } from "../types/message";
import { User } from "../types/user";
import { useAuthContext } from "./AuthContext";

export const ChatContext = createContext<ChatContextType | null>(null);

type props = {
  children: React.ReactNode;
};

export const ChatProvider: React.FC<props> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [messages, setMessages] = useState<Message[]>([]);

  const getAllChats = () => {
    fetchAllChats()
      .then((response: any) => {
        setChats(response);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const getAllMessagesByChatId = (chatId: number) => {
    fetchAllMessagesByChatId(chatId)
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
    selectedChat,
    setSelectedChat,
    getAllMessagesByChatId,
    messages,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext) as ChatContextType;
