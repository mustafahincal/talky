import React from "react";
import { chat } from "../types/chat";

type chatProps = {
  chats: chat[];
};
const Chat = ({ chats }: chatProps) => {
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}> {chat.chatName} </div>
      ))}
    </div>
  );
};

export default Chat;
