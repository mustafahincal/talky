import React from "react";
import { Container } from "react-bootstrap";
import { Chat } from "../types/chat";

type chatProps = {
  chats: Chat[];
};
const ChatPage = ({ chats }: chatProps) => {
  return <Container className="vh-100">chat page</Container>;
};

export default ChatPage;
