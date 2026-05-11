const mongoose = require("mongoose");

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, default: "", trim: true },
    period: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    features: { type: [String], default: [] },
    highlighted: { type: Boolean, default: false },
  },
  { _id: false }
);

const apiServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    shortDescription: { type: String, default: "", trim: true, maxlength: 140 },

    /** Bullet list of key feature points (shown on the detail page). */
    features: { type: [String], default: [] },

    /** Bullet list of technical details (protocols, formats, rate-limits, regions, etc.). */
    technicalDetails: { type: [String], default: [] },

    /** Pricing tiers — empty array means "Contact us for pricing". */
    pricingPlans: { type: [pricingPlanSchema], default: [] },

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
