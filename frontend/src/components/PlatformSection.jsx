import { CircleDot, Trophy, Users } from "lucide-react";

const platforms = [
  {
    title: "Satta Matka Platform Development",
    description:
      "Custom Satta Matka Software with panel, result, chart, jodi, panel management and more.",
    icon: CircleDot,
    iconWrap:
      "bg-emerald-500/15 text-emerald-400 ring-emerald-500/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]",
    hoverBorder: "hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(34,197,94,0.2)]",
    linkClass: "text-emerald-400 hover:text-emerald-300",
  },
  {
    title: "Betting Platform Development",
    description:
      "Full-featured betting platform for sports, casino, virtual games with multi-device support.",
    icon: Trophy,
    iconWrap:
      "bg-purple-500/15 text-purple-300 ring-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    hoverBorder: "hover:border-purple-500/50 hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]",
    linkClass: "text-purple-400 hover:text-purple-300",
  },
  {
    title: "Cricket Exchange Software",
    description:
      "Advanced cricket exchange software with back/lay, fancy market, admin panel and more.",
    icon: Users,
    iconWrap:
      "bg-amber-500/15 text-amber-400 ring-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    hoverBorder: "hover:border-amber-500/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]",
    linkClass: "text-amber-400 hover:text-amber-300",
  },
];

export default function PlatformSection() {
  return (
    <section id="platform-solutions" className="scroll-mt-28">
      <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
        Our <span className="text-emerald-400">Platform</span> Solutions
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
        {platforms.map((p) => {
          const Icon = p.icon;
          return (
            <article
              key={p.title}
              className={`flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center shadow-xl backdrop-blur-md transition-all duration-300 sm:p-6 md:text-left ${p.hoverBorder} hover:scale-[1.02]`}
            >
              <div
                className={`mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-2 md:mx-0 ${p.iconWrap}`}
              >
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
              <a
                href="#get-in-touch"
                className={`mt-4 inline-flex min-h-[44px] touch-manipulation items-center justify-center text-sm font-semibold transition md:justify-start ${p.linkClass}`}
              >
                Learn More →
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
