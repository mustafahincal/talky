import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAccessChats, fetchAllChats } from "../services/chatService";
import {
  fetchAllMessagesByChatId,
  fetchSendMessage,
} from "../services/messageService";
import { Chat, ChatContextType } from "../types/chat";
import { Message, SendMessageRequest } from "../types/message";
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

  const getAllMessagesByChatId = (chatId: string) => {
    fetchAllMessagesByChatId(chatId)
      .then((response: any) => {
        setMessages(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMessage = (data: SendMessageRequest) => {
    fetchSendMessage(data)
      .then((response) => {
        //console.log(response);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const accessChat = (userId: string) => {
    fetchAccessChats(userId)
      .then((response) => {
        console.log(response);
        getAllChats();
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
    sendMessage,
    accessChat,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext) as ChatContextType;
