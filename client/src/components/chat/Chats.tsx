import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useChatContext } from "../../contexts/ChatContext";

const Chats = () => {
  const { chats, getAllChats, getChatName, setSelectedChat } = useChatContext();
  useEffect(() => {
    getAllChats();
  }, []);
  return (
    <div
      className="rounded h-100 d-flex flex-column gap-3 p-3"
      style={{ background: "#89C4E1" }}
    >
      {chats.map((chat) => (
        <div
          onClick={() => setSelectedChat(chat)}
          className="p-3 rounded cursor-pointer"
          style={{ background: "#CAF0F8" }}
          key={chat._id}
        >
          <span>{getChatName(chat)}</span>
        </div>
      ))}
    </div>
  );
};

export default Chats;
