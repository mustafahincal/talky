const express = require("express");
const {
  sendMessage,
  getAllMessages,
  getAllMessagesByChatId,
  deleteAllMessages,
} = require("../controllers/messageController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getAllMessages);
router.route("/").post(protect, sendMessage);
router.route("/delete").get(deleteAllMessages);
router.route("/:chatId").get(protect, getAllMessagesByChatId);

module.exports = router;
