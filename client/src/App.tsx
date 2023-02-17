import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { Chat } from "./types/chat";
import "./App.css";

function App() {
  const [chats, setChats] = useState<Chat[]>([]);

  /* const fetchChats = async () => {
    const res = await axios.get("http://localhost:4000/api/chat");
    setChats(res.data);
  };
  useEffect(() => {
    fetchChats();
  }, []); */
  return (
    <>
      <HomePage />
      {/*  <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage chats={chats} />} />
      </Routes> */}
    </>
  );
}

export default App;
