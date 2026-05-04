/**
 * Glassmorphism card for API (and legacy) sections.
 * @param {'green'|'purple'|'orange'|'cyan'|'violet'|'emerald'|'amber'|'rose'|'sky'|'indigo'|'blue'|'red'|'gold'|'fuchsia'|'teal'} glow
 */
const apiShell = {
  orange:
    "border-orange-500/35 bg-[#111622]/95 shadow-[0_0_20px_-6px_rgba(249,115,22,0.28)] hover:border-orange-500/50",
  emerald:
    "border-emerald-500/35 bg-[#111622]/95 shadow-[0_0_20px_-6px_rgba(52,211,153,0.26)] hover:border-emerald-500/50",
  amber:
    "border-amber-400/35 bg-[#111622]/95 shadow-[0_0_18px_-8px_rgba(251,191,36,0.2)] hover:border-amber-400/45",
  red: "border-red-500/35 bg-[#111622]/95 shadow-[0_0_18px_-8px_rgba(239,68,68,0.18)] hover:border-red-500/45",
  purple:
    "border-purple-500/35 bg-[#111622]/95 shadow-[0_0_20px_-6px_rgba(168,85,247,0.3)] hover:border-purple-500/50",
  blue: "border-blue-500/40 bg-[#111622]/95 shadow-[0_0_20px_-6px_rgba(59,130,246,0.28)] hover:border-blue-500/55",
  cyan: "border-cyan-500/40 bg-[#111622]/95 shadow-[0_0_18px_-8px_rgba(34,211,238,0.18)] hover:border-cyan-500/50",
  gold: "border-amber-400/40 bg-[#111622]/95 shadow-[0_0_20px_-6px_rgba(251,191,36,0.3)] hover:border-amber-300/50",
  green:
    "border-emerald-500/35 bg-[#111622]/95 shadow-[0_0_18px_-8px_rgba(52,211,153,0.18)] hover:border-emerald-500/45",
  violet:
    "border-violet-500/40 bg-[#111622]/95 shadow-[0_0_20px_-6px_rgba(139,92,246,0.28)] hover:border-violet-500/55",
  rose: "border-rose-500/35 bg-[#111622]/95 shadow-[0_0_18px_-8px_rgba(244,63,94,0.18)] hover:border-rose-500/45",
  sky: "border-sky-500/35 bg-[#111622]/95 shadow-[0_0_18px_-8px_rgba(14,165,233,0.18)] hover:border-sky-500/45",
  indigo:
    "border-indigo-500/35 bg-[#111622]/95 shadow-[0_0_18px_-8px_rgba(99,102,241,0.18)] hover:border-indigo-500/45",
  fuchsia:
    "border-fuchsia-500/40 bg-[#111622]/95 shadow-[0_0_20px_-6px_rgba(217,70,239,0.28)] hover:border-fuchsia-500/55",
  teal: "border-teal-500/40 bg-[#111622]/95 shadow-[0_0_20px_-6px_rgba(20,184,166,0.28)] hover:border-teal-500/55",
};

const apiIconRing = {
  orange: "ring-orange-500/40",
  emerald: "ring-emerald-500/40",
  amber: "ring-amber-400/40",
  red: "ring-red-500/40",
  purple: "ring-purple-500/40",
  blue: "ring-blue-500/45",
  cyan: "ring-cyan-500/45",
  gold: "ring-amber-400/45",
  green: "ring-emerald-500/40",
  violet: "ring-violet-500/45",
  rose: "ring-rose-500/40",
  sky: "ring-sky-500/40",
  indigo: "ring-indigo-500/40",
  fuchsia: "ring-fuchsia-500/45",
  teal: "ring-teal-500/45",
};

/** Subtle neon glow on line icons (premium API reference). */
const apiIconNeon = {
  purple: "[&_svg]:drop-shadow-[0_0_10px_rgba(168,85,247,0.65)]",
  emerald: "[&_svg]:drop-shadow-[0_0_10px_rgba(52,211,153,0.55)]",
  orange: "[&_svg]:drop-shadow-[0_0_10px_rgba(249,115,22,0.55)]",
  fuchsia: "[&_svg]:drop-shadow-[0_0_10px_rgba(217,70,239,0.6)]",
  blue: "[&_svg]:drop-shadow-[0_0_10px_rgba(59,130,246,0.55)]",
  teal: "[&_svg]:drop-shadow-[0_0_10px_rgba(20,184,166,0.55)]",
  violet: "[&_svg]:drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]",
  gold: "[&_svg]:drop-shadow-[0_0_10px_rgba(251,191,36,0.55)]",
  amber: "[&_svg]:drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]",
  red: "[&_svg]:drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]",
  cyan: "[&_svg]:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]",
  green: "[&_svg]:drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]",
};

export default function ServiceCard({
  icon,
  title,
  description,
  ctaText = "Learn More →",
  ctaHref = "#get-in-touch",
  glow = "green",
  ctaClassName = "text-emerald-400 hover:text-emerald-300",
  className = "",
  variant = "default",
  /** Mobile-only top fade (md+ hidden). Tailwind `from-*` classes. */
  mobileTopFade = "",
}) {
  const glowStyles = {
    green:
      "hover:scale-105 hover:shadow-glow hover:border-emerald-500/40 hover:shadow-emerald-500/30",
    purple:
      "hover:scale-105 hover:shadow-glow-purple hover:border-purple-500/40 hover:shadow-purple-500/25",
    orange:
      "hover:scale-105 hover:shadow-glow-orange hover:border-orange-500/40 hover:shadow-orange-500/25",
    cyan: "hover:scale-105 hover:border-cyan-500/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]",
    violet:
      "hover:scale-105 hover:border-violet-500/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.2)]",
    emerald:
      "hover:scale-105 hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(52,211,153,0.2)]",
    amber:
      "hover:scale-105 hover:border-amber-500/40 hover:shadow-[0_0_24px_rgba(245,158,11,0.2)]",
    rose: "hover:scale-105 hover:border-rose-500/40 hover:shadow-[0_0_24px_rgba(244,63,94,0.2)]",
    sky: "hover:scale-105 hover:border-sky-500/40 hover:shadow-[0_0_24px_rgba(14,165,233,0.2)]",
    indigo:
      "hover:scale-105 hover:border-indigo-500/40 hover:shadow-[0_0_24px_rgba(99,102,241,0.2)]",
    blue: "hover:scale-105 hover:border-blue-500/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]",
    red: "hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_24px_rgba(239,68,68,0.25)]",
    gold: "hover:scale-105 hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(251,191,36,0.25)]",
    fuchsia:
      "hover:scale-105 hover:border-fuchsia-500/45 hover:shadow-[0_0_24px_rgba(217,70,239,0.22)]",
    teal: "hover:scale-105 hover:border-teal-500/45 hover:shadow-[0_0_24px_rgba(20,184,166,0.22)]",
  };

  const isApi = variant === "api";
  const shell = isApi ? (apiShell[glow] ?? apiShell.green) : "";
  const ring = isApi ? (apiIconRing[glow] ?? apiIconRing.green) : "";
  const neon = isApi ? (apiIconNeon[glow] ?? "") : "";

  return (
    <article
      className={`group flex h-full flex-col transition-all duration-300 will-change-transform ${
        isApi
          ? `relative overflow-hidden rounded-2xl border p-4 backdrop-blur-md sm:p-4 ${shell} hover:-translate-y-0.5 ${className}`
          : `glass-card p-5 shadow-xl sm:p-6 ${glowStyles[glow] ?? glowStyles.green} ${className}`
      } ${!isApi ? "hover:scale-105" : ""} ${isApi ? "items-center text-center" : ""}`}
    >
      {isApi && mobileTopFade ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b to-transparent opacity-95 md:hidden ${mobileTopFade}`}
        />
      ) : null}
      {icon && (
        <div
          className={`relative mb-3 flex shrink-0 items-center justify-center bg-white/[0.06] transition-all duration-300 ${
            isApi
              ? `h-12 w-12 rounded-full border border-white/15 md:h-11 md:w-11 md:rounded-xl md:border-0 md:ring-1 ${ring} ${neon} group-hover:bg-white/[0.09]`
              : "mb-4 h-12 w-12 rounded-xl ring-1 ring-white/10 group-hover:bg-white/10"
          }`}
        >
          {icon}
        </div>
      )}
      <h3
        className={`font-bold text-white ${isApi ? "text-sm leading-tight sm:text-[0.95rem]" : "text-lg font-semibold"}`}
      >
        {title}
      </h3>
      <p
        className={`text-slate-400 ${isApi ? "mt-2 flex-1 text-[11px] leading-snug sm:text-xs" : "mt-2 flex-1 text-sm leading-relaxed"}`}
      >
        {description}
      </p>
      <a
        href={ctaHref}
        className={`mt-3 inline-flex min-h-[40px] touch-manipulation items-center justify-center text-sm font-semibold transition sm:min-h-0 ${
          isApi ? (ctaClassName || "text-emerald-400 hover:text-emerald-300") : ctaClassName
        }`}
      >
        {ctaText}
      </a>
    </article>
  );
}
