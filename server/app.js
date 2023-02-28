const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const chats = require("./data/data");
const userRouter = require("./routers/userRouter");
const chatRouter = require("./routers/chatRouter");
const messageRouter = require("./routers/messageRouter");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();

//* db
connectDB();

//* middlewares
app.use(express.static("public"));
app.use(fileUpload());
app.use(cors());
app.use(express.json());

//* routes
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

//* error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, console.log(`server started on ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log("user joined room : " + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop-typing", (room) => {
    socket.in(room).emit("stop-typing");
  });

  socket.on("new-message", (newMessage) => {
    let chat = newMessage.chat;
    if (!chat.users) {
      console.log("chat.users are not defined");
      return;
    }

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) {
        socket.emit("message-received", newMessage);
      } else {
        socket.in(user._id).emit("message-received", newMessage);
      }
    });
  });
});
