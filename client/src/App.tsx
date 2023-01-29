import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";

/* {
  isGroupChat: false,
  users: [
    {
      name: "John Doe",
      email: "john@example.com",
    },
    {
      name: "Piyush",
      email: "piyush@example.com",
    },
  ],
  _id: "617a077e18c25468bc7c4dd4",
  chatName: "John Doe",
} */

type user = {
  name: string;
  email: string;
};

type chat = {
  isGroupChat: boolean;
  users: user | user[];
  _id: string;
  chatName: string;
};
function App() {
  const [chats, setChat] = useState<chat[]>([]);
  /* useEffect(() => {
    axios
      .get("http://localhost:4000/api/chat")
      .then((result) => console.log(result));
  }); */
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
