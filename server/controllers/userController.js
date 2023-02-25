const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../config/generateToken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = JSON.parse(req.body.registerBody);
  const userToRegister = {
    name,
    email,
    password,
    image: "/uploads/" + req.files.file.name,
  };

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter All Credentials");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const __dirname = path.resolve();
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const uploadedImage = req.files.file;
  const uploadPath = __dirname + "/public/uploads/" + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    const user = await User.create(userToRegister);

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to Create a New User");
    }
  });
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const getAll = asyncHandler(async (req, res) => {
  const users = await User.find().find({ _id: { $ne: req.user._id } });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error("Something is wrong");
  }
});

const getUsersByQuery = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : null;
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error("Something is wrong");
  }
});

module.exports = { register, authUser, getAll, getUsersByQuery };
