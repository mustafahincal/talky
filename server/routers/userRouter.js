const express = require("express");
const { register, authUser, getAll } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(register).get(protect, getAll);
router.route("/login").post(authUser);

module.exports = router;
