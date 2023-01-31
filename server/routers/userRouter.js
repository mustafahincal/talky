const express = require("express");
const { register, authUser } = require("../controllers/userController");

const router = express.Router();

router.route("/").post(register);
router.route("/login").post(authUser);

module.exports = router;
