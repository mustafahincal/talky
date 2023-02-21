import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import { Chat } from "../../types/chat";

const Conversation = () => {
  const { selectedChat, getAllMessagesByChatId, messages } = useChatContext();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (selectedChat?._id) {
      getAllMessagesByChatId(selectedChat._id);
    }
  }, [selectedChat]);

  const getChatName = (chat: Chat | undefined) => {
    if (chat?.isGroupChat) {
      return chat.chatName;
    }

    const user = chat?.users.find((user) => user._id != currentUser?._id);
    return user?.name;
  };

  return (
    <div className="rounded h-100 p-3" style={{ background: "#89C4E1" }}>
      <div
        key={selectedChat?._id}
        className="h-100 w-100 p-4"
        style={{ background: "#CAF0F8" }}
      >
        <h2 className="px-1 py-2 bg-dark text-white d-flex justify-content-center align-items-center">
          {getChatName(selectedChat)}
        </h2>
        {!selectedChat ? (
          <div>Select a Chat</div>
        ) : (
          <div>
            {messages.map((message) => (
              <div
                className="mb-2 d-flex align-items-center gap-2"
                key={message._id}
              >
                <span className="text-white bg-danger p-1 rounded text-sm">
                  {message.sender.name}
                </span>
                <span className="bg-white p-1 rounded align-self-start">
                  {message.content}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
