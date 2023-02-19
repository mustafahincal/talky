import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import ChatPage from "./pages/chatPage/ChatPage";
import { Chat } from "./types/chat";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Loading from "./components/loading/Loading";
import { useAuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useChatContext } from "./contexts/ChatContext";

function App() {
  const { loading } = useAuthContext();

  return (
    <>
      <div className="App">
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/chat"
              element={<ProtectedRoute component={ChatPage} />}
            />
          </Routes>
        )}
      </div>
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
    </>
  );
}

export default App;
