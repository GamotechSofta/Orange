/**
 * Preset visual themes for Platform Solutions cards.
 * When the admin doesn't supply the styling fields, we auto-assign one by
 * rotating through this list based on existing-document count.
 */
const themes = [
  {
    iconName: "ShipWheel",
    iconClass: "text-emerald-400",
    glowTop: "from-emerald-500/35 via-emerald-500/10",
    gradient:
      "from-emerald-500/[0.07] via-emerald-500/[0.02] to-transparent dark:from-emerald-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(34,197,94,0.16)]",
    borderHover: "hover:border-emerald-500/35",
    linkClass: "text-emerald-400 hover:text-emerald-300",
  },
  {
    iconName: "Trophy",
    iconClass: "text-purple-400",
    glowTop: "from-purple-500/35 via-purple-500/10",
    gradient:
      "from-purple-500/[0.07] via-purple-500/[0.02] to-transparent dark:from-purple-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(168,85,247,0.16)]",
    borderHover: "hover:border-purple-500/40",
    linkClass: "text-purple-400 hover:text-purple-300",
  },
  {
    iconName: "CricketStrokeIcon",
    iconClass: "text-amber-400",
    glowTop: "from-amber-500/35 via-amber-500/10",
    gradient:
      "from-amber-500/[0.07] via-amber-500/[0.02] to-transparent dark:from-amber-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(245,158,11,0.16)]",
    borderHover: "hover:border-amber-500/40",
    linkClass: "text-amber-400 hover:text-amber-300",
  },
  {
    iconName: "Dices",
    iconClass: "text-fuchsia-400",
    glowTop: "from-fuchsia-500/35 via-fuchsia-500/10",
    gradient:
      "from-fuchsia-500/[0.07] via-fuchsia-500/[0.02] to-transparent dark:from-fuchsia-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(217,70,239,0.16)]",
    borderHover: "hover:border-fuchsia-500/40",
    linkClass: "text-fuchsia-400 hover:text-fuchsia-300",
  },
  {
    iconName: "CodeXml",
    iconClass: "text-blue-400",
    glowTop: "from-blue-500/35 via-blue-500/10",
    gradient:
      "from-blue-500/[0.07] via-blue-500/[0.02] to-transparent dark:from-blue-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(59,130,246,0.16)]",
    borderHover: "hover:border-blue-500/40",
    linkClass: "text-blue-400 hover:text-blue-300",
  },
  {
    iconName: "Network",
    iconClass: "text-teal-400",
    glowTop: "from-teal-500/35 via-teal-500/10",
    gradient:
      "from-teal-500/[0.07] via-teal-500/[0.02] to-transparent dark:from-teal-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(20,184,166,0.16)]",
    borderHover: "hover:border-teal-500/40",
    linkClass: "text-teal-400 hover:text-teal-300",
  },
];

const THEME_FIELDS = [
  "iconName",
  "iconClass",
  "glowTop",
  "gradient",
  "glow",
  "borderHover",
  "linkClass",
];

function applyAutoTheme(payload, index) {
  const theme = themes[((index % themes.length) + themes.length) % themes.length];
  const next = { ...payload };
  for (const key of THEME_FIELDS) {
    if (!next[key]) next[key] = theme[key];
  }
  return next;
}

module.exports = { themes, THEME_FIELDS, applyAutoTheme };
