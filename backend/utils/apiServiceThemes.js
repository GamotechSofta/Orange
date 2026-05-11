/**
 * Preset visual themes for API service cards.
 * When the admin doesn't supply iconName / iconColorClass / glow / mobileTopFade / ctaClass,
 * we auto-assign one by rotating through this list.
 */
const themes = [
  {
    iconName: "Dices",
    iconColorClass: "text-purple-400",
    glow: "purple",
    mobileTopFade: "from-purple-500/30",
    ctaClass: "text-purple-400 hover:text-purple-300",
  },
  {
    iconName: "ClipboardList",
    iconColorClass: "text-emerald-400",
    glow: "emerald",
    mobileTopFade: "from-emerald-500/30",
    ctaClass: "text-emerald-400 hover:text-emerald-300",
  },
  {
    iconName: "Crosshair",
    iconColorClass: "text-orange-400",
    glow: "orange",
    mobileTopFade: "from-orange-500/30",
    ctaClass: "text-orange-400 hover:text-orange-300",
  },
  {
    iconName: "Trophy",
    iconColorClass: "text-fuchsia-400",
    glow: "fuchsia",
    mobileTopFade: "from-fuchsia-500/30",
    ctaClass: "text-fuchsia-400 hover:text-fuchsia-300",
  },
  {
    iconName: "CodeXml",
    iconColorClass: "text-blue-400",
    glow: "blue",
    mobileTopFade: "from-blue-500/30",
    ctaClass: "text-blue-400 hover:text-blue-300",
  },
  {
    iconName: "Disc3",
    iconColorClass: "text-teal-400",
    glow: "teal",
    mobileTopFade: "from-teal-500/30",
    ctaClass: "text-teal-400 hover:text-teal-300",
  },
  {
    iconName: "Tv",
    iconColorClass: "text-violet-400",
    glow: "violet",
    mobileTopFade: "from-violet-500/30",
    ctaClass: "text-violet-400 hover:text-violet-300",
  },
  {
    iconName: "Network",
    iconColorClass: "text-amber-300",
    glow: "gold",
    mobileTopFade: "from-amber-400/35",
    ctaClass: "text-amber-300 hover:text-amber-200",
  },
];

const THEME_FIELDS = [
  "iconName",
  "iconColorClass",
  "glow",
  "mobileTopFade",
  "ctaClass",
];

/**
 * Returns the theme at `index` (wraps around). Missing fields on `payload`
 * are filled in from the theme so the admin form doesn't need to set them.
 */
function applyAutoTheme(payload, index) {
  const theme = themes[((index % themes.length) + themes.length) % themes.length];
  const next = { ...payload };
  for (const key of THEME_FIELDS) {
    if (!next[key]) next[key] = theme[key];
  }
  return next;
}

module.exports = { themes, THEME_FIELDS, applyAutoTheme };
