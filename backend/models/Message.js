const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 40,
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 10000,
    },
    category: {
      type: String,
      required: true,
      enum: ["contact", "services", "game"],
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
