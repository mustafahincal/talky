const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");
const User = require("../models/Chat");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("userId param not sent with request");
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, //* req.user = await User.findById(decoded.id).select("-password"); in authMiddleware
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  //* ?
  isChat = await User.populate(isChat, {
    path: "latestMessage,sender",
    select: "name img email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const getChats = asyncHandler(async (req, res) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort("-updatedAt");

    chats = await User.populate(chats, {
      path: "latestMessage,sender",
      select: "name img email",
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  console.log("accessChat");
});

const renameGroup = asyncHandler(async (req, res) => {
  console.log("accessChat");
});

const removeFromGroup = asyncHandler(async (req, res) => {
  console.log("accessChat");
});
const addToGroup = asyncHandler(async (req, res) => {
  console.log("accessChat");
});

module.exports = {
  accessChat,
  getChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
