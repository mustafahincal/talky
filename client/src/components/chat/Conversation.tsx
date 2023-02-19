import React from "react";
import { Container } from "react-bootstrap";
import { useChatContext } from "../../contexts/ChatContext";

const Conversation = () => {
  const { selectedChat } = useChatContext();
  return (
    <div
      className="rounded h-100 cursor-pointer p-3"
      style={{ background: "#89C4E1" }}
    >
      <div className="h-100 w-100" style={{ background: "#CAF0F8" }}>
        {!selectedChat ? (
          <div>Select a Chat</div>
        ) : (
          <div>{selectedChat?.["_id"]}</div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
