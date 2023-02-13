const express = require("express");
const {
  sendMessage,
  getAllMessages,
  getAllMessagesByChatId,
} = require("../controllers/messageController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getAllMessages);
router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, getAllMessagesByChatId);

module.exports = router;
