import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Lottie from "react-lottie";
import { io } from "socket.io-client";
import animationData from "../../assets/typing.json";
import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import { Chat } from "../../types/chat";
import { Message } from "../../types/message";
import styles from "./styles.module.css";

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
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const messageElement: any = useRef();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
    if (messageElement.current) {
      messageElement.current.addEventListener(
        "DOMNodeInserted",
        (event: any) => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: "smooth" });
        }
      );
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message-received", (newMessage: any) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        //console.log("give notification");
      } else {
        getAllMessagesByChatId(newMessage.chat._id);
      }
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
  }, [socket]);

  const sendNewMessage = async () => {
    const data = await sendMessage({
      chatId: selectedChat?._id,
      content: newMessage,
    });
    setNewMessage("");
    socket.emit("new-message", data);
    socket.emit("stop-typing", selectedChat?._id);
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
  const typingHandler = (e: any) => {
    if (e.key == "Enter" && newMessage) {
      sendNewMessage();
    }

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    let lastTypingTime: number = new Date().getTime();
    const timerLength: number = 3000;
    setTimeout(() => {
      let timeNow: number = new Date().getTime();
      let timeDifference: number = timeNow - lastTypingTime;
      if (timeDifference >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat?._id);
        setTyping(false);
      }
    }, 3000);
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
              <div
                className="d-flex flex-column overflow-auto chat-messages"
                ref={messageElement}
              >
                {messages.map((message, index) => (
                  <div
                    className={`mb-2 d-flex align-items-center flex-row gap-2 ${
                      isSender(message) && "justify-content-end"
                    }`}
                    key={index}
                  >
                    <img
                      src={`${process.env.REACT_APP_PUBLIC}${message.sender.image}`}
                      alt=""
                      width={"30px"}
                      height={"30px"}
                      className="order-2"
                    />
                    <span
                      className={`${styles.message} ${
                        isSender(message)
                          ? "bg-success order-1"
                          : "bg-info order-3"
                      }`}
                    >
                      {message.content}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  height: "20px",
                }}
              >
                {isTyping ? (
                  <Lottie
                    options={defaultOptions}
                    style={{ display: "inline-block", marginLeft: "10px" }}
                    width={50}
                    height={30}
                  />
                ) : null}
              </div>
              <div className="d-flex mt-3 chat-input">
                <Form.Control
                  type="email"
                  placeholder="Enter Message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => typingHandler(e)}
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
