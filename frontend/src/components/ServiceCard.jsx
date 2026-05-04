/**
 * Glassmorphism card for Platform & API sections.
 * @param {'green'|'purple'|'orange'|'cyan'|'violet'|'emerald'|'amber'|'rose'|'sky'|'indigo'|'blue'|'red'|'gold'} glow
 */
export default function ServiceCard({
  icon,
  title,
  description,
  ctaText = "Learn More →",
  ctaHref = "#get-in-touch",
  glow = "green",
  ctaClassName = "text-emerald-400 hover:text-emerald-300",
  className = "",
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
  };

  return (
    <article
      className={`group glass-card flex flex-col p-5 shadow-xl transition-all duration-300 sm:p-6 will-change-transform ${glowStyles[glow] ?? glowStyles.green} ${className}`}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-white/10">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{description}</p>
      <a
        href={ctaHref}
        className={`mt-4 inline-flex text-sm font-semibold transition ${ctaClassName}`}
      >
        {ctaText}
      </a>
    </article>
  );
}
