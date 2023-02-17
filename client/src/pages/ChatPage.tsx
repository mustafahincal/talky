import React from "react";
import { Chat } from "../types/chat";

type chatProps = {
  chats: Chat[];
};
const ChatPage = ({ chats }: chatProps) => {
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}> {chat.chatName} </div>
      ))}
    </div>
  );
};

export default ChatPage;
