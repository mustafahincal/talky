import { Message, SendMessageRequest } from "./message";
import { User } from "./user";

export type Chat = {
  isGroupChat: boolean;
  users: User[];
  _id: string;
  chatName: string;
};

export type ChatContextType = {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  selectedChat: Chat | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | undefined>>;
  messages: Message[];
  getAllChats: () => void;
  getAllMessagesByChatId: (chatId: string) => void;
  sendMessage: (data: SendMessageRequest) => void;
};
