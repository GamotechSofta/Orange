import { ShipWheel, Trophy } from "lucide-react";

/** Line-art style cricket bat + ball (reference UI). */
function CricketStrokeIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="6.5" cy="17" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M20 3.5 9.5 21.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.5 6.5 21 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const platforms = [
  {
    title: "Satta Matka Platform Development",
    description:
      "Custom Satta Matka Software with panel, result, chart, jodi, panel management and more.",
    Icon: ShipWheel,
    iconClass: "text-emerald-400",
    glowTop: "from-emerald-500/35 via-emerald-500/10",
    gradient:
      "from-emerald-500/[0.07] via-emerald-500/[0.02] to-transparent dark:from-emerald-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(34,197,94,0.16)]",
    borderHover: "hover:border-emerald-500/35",
    linkClass: "text-emerald-400 hover:text-emerald-300",
  },
  {
    title: "Betting Platform Development",
    description:
      "Full-featured betting platform for sports, casino, virtual games with multi-device support.",
    Icon: Trophy,
    iconClass: "text-purple-400",
    glowTop: "from-purple-500/35 via-purple-500/10",
    gradient:
      "from-purple-500/[0.07] via-purple-500/[0.02] to-transparent dark:from-purple-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(168,85,247,0.16)]",
    borderHover: "hover:border-purple-500/40",
    linkClass: "text-purple-400 hover:text-purple-300",
  },
  {
    title: "Cricket Exchange Software",
    description:
      "Advanced cricket exchange software with back/lay, fancy market, admin panel and more.",
    Icon: CricketStrokeIcon,
    iconClass: "text-amber-400",
    glowTop: "from-amber-500/35 via-amber-500/10",
    gradient:
      "from-amber-500/[0.07] via-amber-500/[0.02] to-transparent dark:from-amber-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(245,158,11,0.16)]",
    borderHover: "hover:border-amber-500/40",
    linkClass: "text-amber-400 hover:text-amber-300",
  },
];

export default function PlatformSection() {
  return (
    <section id="platform-solutions" className="scroll-mt-28">
      <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-[2rem]">
        Our <span className="text-emerald-400">Platform</span> Solutions
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
        {platforms.map((p) => {
          const { Icon } = p;
          return (
            <article
              key={p.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c101c]/90 shadow-lg backdrop-blur-md transition-all duration-300 ${p.borderHover} ${p.glow} hover:-translate-y-0.5`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${p.glowTop} to-transparent opacity-95 md:hidden`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 hidden bg-gradient-to-br opacity-[0.62] md:block ${p.gradient}`}
              />
              <div className="relative flex flex-col items-center gap-3 p-4 text-center max-md:pt-5 md:flex-row md:items-start md:gap-3.5 md:p-4 md:text-left">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] md:h-auto md:w-auto md:rounded-none md:border-0 md:bg-transparent ${p.iconClass}`}
                >
                  <Icon className="h-9 w-9 md:h-11 md:w-11" strokeWidth={1.35} />
                </div>
                <div className="min-w-0 flex-1 md:text-left">
                  <h3 className="text-sm font-bold leading-tight text-white sm:text-base">{p.title}</h3>
                  <p className="mt-1.5 text-xs leading-normal text-slate-400 sm:text-sm sm:leading-snug">
                    {p.description}
                  </p>
                  <a
                    href="#get-in-touch"
                    className={`mt-2.5 inline-flex min-h-[40px] touch-manipulation items-center justify-center py-1 text-xs font-semibold transition max-md:w-full sm:text-sm md:justify-start ${p.linkClass}`}
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
