import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { Chat } from "./types/chat";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Loading from "./components/loading/Loading";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const { loading } = useAuthContext();

  return (
    <>
      {loading ? (
        <div className="App">
          <Loading />
        </div>
      ) : (
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage chats={chats} />} />
          </Routes>
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
      )}
    </>
  );
}

export default App;
