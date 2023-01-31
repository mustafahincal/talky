const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SCREET, { expiresIn: "30d" });
};

module.exports = generateToken;
