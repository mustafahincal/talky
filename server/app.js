const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("api is running");
});
app.get("/api/chat", (req, res) => {
  res.json(chats);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`server started on ${PORT}`));
