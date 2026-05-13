const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const Message = require("../models/Message");

const ALLOWED = new Set(["contact", "services", "game"]);

/**
 * @desc    Save a lead message (same payload as Web3Forms contact forms)
 * @route   POST /api/messages
 * @access  Public
 */
const createMessage = asyncHandler(async (req, res) => {
  const { fullName, email, phone, message, category } = req.body || {};

  const cat = typeof category === "string" ? category.trim() : "";
  if (!ALLOWED.has(cat)) {
    throw new ApiError(400, "category must be one of: contact, services, game");
  }

  const doc = await Message.create({
    fullName: typeof fullName === "string" ? fullName.trim() : "",
    email: typeof email === "string" ? email.trim() : "",
    phone: typeof phone === "string" ? phone.trim() : "",
    message: typeof message === "string" ? message.trim() : "",
    category: cat,
  });

  res.status(201).json({ success: true, data: doc });
});

/**
 * @desc    List all messages (admin inbox)
 * @route   GET /api/messages/all
 * @access  Private / Admin
 */
const getAllMessagesAdmin = asyncHandler(async (req, res) => {
  const items = await Message.find({}).sort({ createdAt: -1 });
  res.json({ success: true, count: items.length, data: items });
});

module.exports = {
  createMessage,
  getAllMessagesAdmin,
};
