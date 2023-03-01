import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import { Chat } from "../../types/chat";

const Chats = () => {
  const { chats, getAllChats, setSelectedChat, selectedChat, messages } =
    useChatContext();
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
  const getChatImage = (chat: Chat) => {
    if (chat.isGroupChat) {
      return chat.chatName;
    }
    const user = chat.users.find((user) => user._id != currentUser?._id);
    return user?.image;
  };

  const getLastMessageSender = (chat: Chat) => {
    const userId: any = chat.latestMessage?.sender;
    if (chat.latestMessage) {
      const user = chat.users.find((user) => user._id == userId);
      return user?.name.split(" ")[0];
    }
  };

  return (
    <div
      className="rounded h-100 d-flex flex-column gap-3 p-3 border border-dark"
      style={{ background: "#fff" }}
    >
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            onClick={() => setSelectedChat(chat)}
            className={` py-2 px-3 rounded cursor-pointer d-flex align-items-center gap-3 ${
              selectedChat?._id === chat._id && "bg-dark text-light"
            }`}
            style={{ background: "#EEEEEE" }}
            key={chat._id}
          >
            <img
              src={`${process.env.REACT_APP_PUBLIC}${getChatImage(chat)}`}
              alt=""
              width={"50px"}
              height={"50px"}
              className="rounded-circle border border-light"
            />
            <div className="d-flex flex-column">
              <span style={{ fontSize: "17px" }}>{getChatName(chat)}</span>
              {chat.latestMessage ? (
                <div style={{ fontSize: "13px" }} className="d-flex gap-1">
                  <span>{getLastMessageSender(chat) + "  :"} </span>
                  <span>{chat.latestMessage?.content}</span>
                </div>
              ) : null}
            </div>
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
