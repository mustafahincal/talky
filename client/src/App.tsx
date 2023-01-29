import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { chat } from "./types/chat";

function App() {
  const [chats, setChats] = useState<chat[]>([]);

  const fetchChats = async () => {
    const res = await axios.get("/api/chat");
    setChats(res.data);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat chats={chats} />} />
      </Routes>
    </div>
  );
}

export default App;
