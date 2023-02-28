import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import { Chat } from "../../types/chat";
import { Message } from "../../types/message";

const ENDPOINT = "http://localhost:4000";
let socket: any, selectedChatCompare: Chat;
socket = io(ENDPOINT);

const Conversation = () => {
  const {
    selectedChat,
    getAllMessagesByChatId,
    messages,
    setMessages,
    sendMessage,
  } = useChatContext();
  const { currentUser } = useAuthContext();
  const [newMessage, setNewMessage] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedChat?._id) {
      getAllMessagesByChatId(selectedChat._id);

      socket.emit("join-chat", selectedChat._id);

      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    socket.on("message-received", (newMessage: any) => {
      console.log("hey");
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        console.log("give notification");
      } else {
        getAllMessagesByChatId(newMessage.chat._id);
      }
    });
  }, [socket]);

  const sendNewMessage = async () => {
    const data = await sendMessage({
      chatId: selectedChat?._id,
      content: newMessage,
    });
    setNewMessage("");
    socket.emit("new-message", data);
  };
  const getChatName = (chat: Chat | undefined) => {
    if (chat?.isGroupChat) {
      return chat.chatName;
    }

    const user = chat?.users.find((user) => user._id != currentUser?._id);
    return user?.name;
  };
  const isSender = (message: Message): boolean => {
    return currentUser?._id === message.sender._id;
  };

  return (
    <div className="rounded h-100 p-3 " style={{ background: "#89C4E1" }}>
      <div
        key={selectedChat?._id}
        className="h-100 w-100 p-4 d-flex flex-column "
        style={{ background: "#CAF0F8" }}
      >
        <h2 className="px-1 py-2 mb-4 bg-dark text-white d-flex justify-content-center align-items-center">
          {getChatName(selectedChat) || "Select a Chat"}
        </h2>
        <div className="chat-container">
          {selectedChat ? (
            <div className="d-flex flex-column justify-content-between w-100">
              <div className="d-flex flex-column  overflow-auto chat-messages">
                {messages.map((message, index) => (
                  <div
                    className={` mb-2 d-flex align-items-center gap-2 ${
                      isSender(message) && "justify-content-end"
                    }`}
                    key={index}
                  >
                    <img
                      src={`${process.env.REACT_APP_PUBLIC}${currentUser?.image}`}
                      alt=""
                      width={"30px"}
                      height={"30px"}
                    />
                    <span className="bg-white p-1 rounded align-self-start">
                      {message.content}
                    </span>
                  </div>
                ))}
              </div>
              <div className="d-flex mt-3 chat-input">
                <Form.Control
                  type="email"
                  placeholder="Enter Message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button
                  variant="primary"
                  type="submit"
                  onClick={sendNewMessage}
                >
                  Send
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
