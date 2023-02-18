import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { Chat } from "./types/chat";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [chats, setChats] = useState<Chat[]>([]);

  /* const fetchChats = async () => {
    const res = await axios.get(REACT_APP_BASE_ENDPOINT + "/chat");
    setChats(res.data);
  };
  useEffect(() => {
    fetchChats();
  }, []); */
  return (
    <div className="App">
      <HomePage />
      {/*  <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage chats={chats} />} />
      </Routes> */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
