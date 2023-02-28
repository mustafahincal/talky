const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Chat = require("../models/Chat");

const getAllMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    throw new Error("Invalid data passed into request");
  }
  let messageToCreate = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(messageToCreate);
    message = await message.populate("sender", "name image");
    message = await message.populate("chat");
    message = await message.populate({
      path: "chat.users",
      select: "name image email",
    });
    /* message = await Message.populate(message, {
      path: "chat.users",
      select: "name image email",
    }); */
    /* message = await User.populate(message, {
      path: "chat.users",
      select: "name image email",
    }); */
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getAllMessagesByChatId = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name image email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteAllMessages = asyncHandler(async (req, res) => {
  // test route
  await Message.deleteMany();
  res.send("succesfull");
});

module.exports = {
  sendMessage,
  getAllMessages,
  getAllMessagesByChatId,
  deleteAllMessages,
};
