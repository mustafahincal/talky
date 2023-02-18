import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Chat } from "../../types/chat";

const ChatPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Container className="vh-100">
      chat page
      <button onClick={handleClick}>geri button</button>
    </Container>
  );
};

export default ChatPage;
