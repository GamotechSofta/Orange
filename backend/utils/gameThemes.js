/**
 * Preset glow themes for Game cards.
 * When the admin doesn't supply `glowClasses`, we auto-assign one by rotating
 * through this list based on existing-document count.
 */
const themes = [
  { glowClasses: "from-emerald-500/35 via-amber-500/20" },
  { glowClasses: "from-blue-500/40 via-indigo-500/20" },
  { glowClasses: "from-red-600/45 via-amber-500/25" },
  { glowClasses: "from-violet-500/40 via-amber-500/25" },
  { glowClasses: "from-amber-400/45 via-yellow-600/20" },
  { glowClasses: "from-fuchsia-500/40 via-rose-500/20" },
  { glowClasses: "from-teal-500/40 via-cyan-500/20" },
  { glowClasses: "from-orange-500/45 via-rose-500/20" },
];

const THEME_FIELDS = ["glowClasses"];

function applyAutoTheme(payload, index) {
  const theme = themes[((index % themes.length) + themes.length) % themes.length];
  const next = { ...payload };
  for (const key of THEME_FIELDS) {
    if (!next[key]) next[key] = theme[key];
  }
  return next;
}

module.exports = { themes, THEME_FIELDS, applyAutoTheme };
