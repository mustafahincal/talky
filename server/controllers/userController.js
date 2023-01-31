const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter All Credentials");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({ name, email, password, pic });

  if (user) {
    res.status(201).json({ ...user, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("Failed to Create a New User");
  }
});

const login = asyncHandler(async () => {
  console.log("login");
});

module.exports = { register, login };
