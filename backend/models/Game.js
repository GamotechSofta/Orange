const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    imageSrc: { type: String, required: true, trim: true },
    imageAlt: { type: String, default: "", trim: true },

    glowClasses: { type: String, default: "from-emerald-500/35 via-amber-500/20" },

    order: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
