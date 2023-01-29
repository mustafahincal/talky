import { user } from "./user";

export type chat = {
  isGroupChat: boolean;
  users: user | user[];
  _id: string;
  chatName: string;
};
