const express = require("express");
const {
  addToGroup,
  removeFromGroup,
  renameGroup,
  createGroupChat,
  getChats,
  accessChat,
} = require("../controllers/chatController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getChats);
router.route("/").post(protect, accessChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/group-remove").put(protect, removeFromGroup);
router.route("/group-add").put(protect, addToGroup);

module.exports = router;
