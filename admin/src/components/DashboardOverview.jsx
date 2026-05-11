import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Gamepad2,
  Layers,
  PanelTop,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

function to(basePath, segment) {
  const s = segment.replace(/^\//, "");
  if (!basePath) return `/${s}`;
  return `${basePath.replace(/\/$/, "")}/${s}`;
}

export default function DashboardOverview({ stats, error, basePath = "", adminName }) {
  const sections = [
    {
      key: "api",
      title: "API Services",
      count: stats.apiServices,
      to: to(basePath, "api-services"),
      icon: Layers,
      line1: "REST cards, icons, and display order for your public API grid.",
      ring: "from-fuchsia-500 via-violet-500 to-indigo-500",
      iconBg: "bg-violet-500/25 text-violet-200 ring-1 ring-violet-400/30",
      countClass:
        "bg-gradient-to-r from-violet-200 via-fuchsia-200 to-white bg-clip-text text-transparent",
      chip: "bg-violet-500/15 text-violet-200 ring-violet-500/30",
    },
    {
      key: "games",
      title: "Games",
      count: stats.games,
      to: to(basePath, "games"),
      icon: Gamepad2,
      line1: "Showcase titles with imagery, glow styles, and sort order.",
      ring: "from-orange-500 via-amber-400 to-yellow-500",
      iconBg: "bg-orange-500/25 text-amber-100 ring-1 ring-orange-400/35",
      countClass:
        "bg-gradient-to-r from-amber-200 via-orange-200 to-white bg-clip-text text-transparent",
      chip: "bg-orange-500/15 text-amber-200 ring-orange-500/30",
    },
    {
      key: "platforms",
      title: "Platforms",
      count: stats.platforms,
      to: to(basePath, "platforms"),
      icon: PanelTop,
      line1: "Platform solution cards: icons, gradients, and marketing blurbs.",
      ring: "from-emerald-400 via-teal-400 to-cyan-500",
      iconBg: "bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/35",
      countClass:
        "bg-gradient-to-r from-emerald-200 via-teal-200 to-white bg-clip-text text-transparent",
      chip: "bg-emerald-500/15 text-emerald-200 ring-emerald-500/30",
    },
    {
      key: "users",
      title: "Users",
      count: stats.users,
      to: to(basePath, "users"),
      icon: Users,
      line1: "Accounts created through your auth and user routes.",
      ring: "from-sky-400 via-blue-500 to-indigo-500",
      iconBg: "bg-sky-500/20 text-sky-100 ring-1 ring-sky-400/35",
      countClass: "bg-gradient-to-r from-sky-200 via-blue-100 to-white bg-clip-text text-transparent",
      chip: "bg-sky-500/15 text-sky-200 ring-sky-500/30",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 pb-10">
      {/* Welcome — compact */}
      <header className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#141a2e] via-[#0f141f] to-[#0a0d14] px-5 py-4 shadow-lg shadow-black/30 md:px-6 md:py-5">
        <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="relative flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-2">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-orange-300/90">
              <Sparkles className="size-3 text-amber-300" />
              Orange admin
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-white md:text-[1.65rem] md:leading-snug">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-orange-100 bg-clip-text font-medium text-transparent">
                {adminName?.trim() || "Admin"}
              </span>
            </h1>
            <p className="text-sm leading-snug text-white/50">
              Open any section below to manage catalog data from your backend.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2.5 self-start rounded-xl border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-sm sm:self-auto">
            <Zap className="size-5 text-amber-300/90" strokeWidth={1.75} />
            <div className="leading-tight">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                Status
              </p>
              <p className="text-xs font-medium text-emerald-300/95">Connected</p>
            </div>
          </div>
        </div>
      </header>

      {error ? (
        <div className="rounded-2xl border border-rose-500/35 bg-rose-950/50 px-5 py-4 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      {/* Summary boxes */}
      <section aria-labelledby="sections-heading">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 id="sections-heading" className="text-xl font-bold text-white md:text-2xl">
              Your admin areas
            </h2>
            <p className="mt-1 text-sm text-white/45">Each card opens the matching table & tools.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {sections.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`group relative block rounded-2xl bg-gradient-to-br p-[1px] shadow-lg shadow-black/30 transition hover:scale-[1.02] hover:shadow-xl ${item.ring}`}
              >
                <div className="flex min-h-0 flex-col rounded-2xl border border-white/[0.06] bg-[#0e1219]/95 p-4 backdrop-blur-md">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`flex size-11 items-center justify-center rounded-xl ${item.iconBg}`}
                    >
                      <Icon className="size-5" strokeWidth={1.65} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${item.chip}`}
                    >
                      Open
                      <ArrowUpRight className="size-3 opacity-80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-white">{item.title}</h3>
                  <p
                    className={`mt-1.5 text-3xl font-bold tabular-nums tracking-tight ${item.countClass}`}
                  >
                    {item.count}
                  </p>
                  <p className="mt-3 line-clamp-2 text-[13px] leading-snug text-white/50">{item.line1}</p>

                  <span className="mt-4 text-xs font-semibold text-white/65 transition group-hover:text-white">
                    Go to {item.title.toLowerCase()} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
