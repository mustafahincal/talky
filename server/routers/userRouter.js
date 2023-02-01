const express = require("express");
const { register, authUser, getAll } = require("../controllers/userController");

const router = express.Router();

router.route("/").post(register).get(getAll);
router.route("/login").post(authUser);

module.exports = router;
