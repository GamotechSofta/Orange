const mongoose = require("mongoose");

const apiServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    iconName: { type: String, default: "Dices" },
    iconColorClass: { type: String, default: "text-purple-400" },

    glow: { type: String, default: "purple" },
    mobileTopFade: { type: String, default: "from-purple-500/30" },
    ctaClass: {
      type: String,
      default: "text-purple-400 hover:text-purple-300",
    },

    order: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApiService", apiServiceSchema);
