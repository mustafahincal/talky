import { Chat } from "./chat";
import { User } from "./user";

export type Message = {
  _id: string;
  sender: User;
  chat: Chat;
  content: string;
};
