const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const chats = require("./data/data");
const userRouter = require("./routers/userRouter");

const app = express();
dotenv.config();
connectDB();

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("api is running");
});
app.get("/api/chat", (req, res) => {
  res.json(chats);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`server started on ${PORT}`));
