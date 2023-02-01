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

//* should add protect all of them for bearer token like router.route("/").get(protect,getChats);
router.route("/").get(getChats);
router.route("/").post(accessChat);
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/group-remove").put(removeFromGroup);
router.route("/group-add").put(addToGroup);

module.exports = router;
