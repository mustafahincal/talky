import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import { Chat } from "../../types/chat";

const Chats = () => {
  const { chats, getAllChats, setSelectedChat } = useChatContext();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    getAllChats();
  }, []);

  const getChatName = (chat: Chat) => {
    if (chat.isGroupChat) {
      return chat.chatName;
    }

    const user = chat.users.find((user) => user._id != currentUser?._id);
    return user?.name;
  };

  return (
    <div
      className="rounded h-100 d-flex flex-column gap-3 p-3"
      style={{ background: "#89C4E1" }}
    >
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            onClick={() => setSelectedChat(chat)}
            className="p-3 rounded cursor-pointer"
            style={{ background: "#CAF0F8" }}
            key={chat._id}
          >
            <span>{getChatName(chat)}</span>
          </div>
        ))
      ) : (
        <div className="p-3 rounded text-center bg-dark text-light">
          <span>Start Talking</span>
        </div>
      )}
    </div>
  );
};

export default Chats;
