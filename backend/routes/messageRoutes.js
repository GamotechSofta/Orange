const express = require("express");
const { createMessage, getAllMessagesAdmin } = require("../controllers/messageController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createMessage);
router.get("/all", protect, authorize("admin"), getAllMessagesAdmin);

module.exports = router;
