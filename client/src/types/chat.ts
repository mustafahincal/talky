import { User } from "./user";

export type Chat = {
  isGroupChat: boolean;
  users: User | User[];
  _id: string;
  chatName: string;
};

export type ChatContextType = {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
};
