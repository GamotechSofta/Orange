const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    iconName: { type: String, default: "ShipWheel" },

    iconClass: { type: String, default: "text-emerald-400" },
    glowTop: { type: String, default: "from-emerald-500/35 via-emerald-500/10" },
    gradient: {
      type: String,
      default:
        "from-emerald-500/[0.07] via-emerald-500/[0.02] to-transparent dark:from-emerald-500/10",
    },
    glow: {
      type: String,
      default: "shadow-[0_0_22px_-10px_rgba(34,197,94,0.16)]",
    },
    borderHover: { type: String, default: "hover:border-emerald-500/35" },
    linkClass: {
      type: String,
      default: "text-emerald-400 hover:text-emerald-300",
    },

    order: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Platform", platformSchema);
