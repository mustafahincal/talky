import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Conversation from "../../components/chat/Conversation";
import Chats from "../../components/chat/Chats";
import { Chat } from "../../types/chat";
import Header from "../../components/chat/Header";
import Footer from "../../components/chat/Footer";

const ChatPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="h-100 d-flex flex-column justify-content-between">
      <Header />
      <Container>
        <Row className="gap-3">
          <Col xs lg="3">
            <Chats />
          </Col>
          <Col>
            <Conversation />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ChatPage;
