import { ArrowRight, CalendarDays, Layers, Users } from "lucide-react";
import { edgeInsetX } from "../constants/layout.js";

/** Design width cap; height follows 1900×800 aspect from `lg` up. */
const HERO_MAX_W = 1900;

const HERO_BG_URL =
  "https://res.cloudinary.com/dzd47mpdo/image/upload/v1777892882/c4b71b60-340d-451a-8ed6-ba324b340639.png";

const HERO_MOBILE_TEXT_BG_URL =
  "https://res.cloudinary.com/dzd47mpdo/image/upload/v1777893939/fb0be062-a08b-46a9-9c2a-419c5825fe25.png";

const stats = [
  {
    icon: CalendarDays,
    n: "5+",
    l: "Years Experience",
    ring: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  },
  {
    icon: Layers,
    n: "50+",
    l: "Projects Completed",
    ring: "bg-amber-500/15 text-amber-400 ring-emerald-500/30",
  },
  {
    icon: Users,
    n: "100+",
    l: "Happy Clients",
    ring: "bg-purple-500/15 text-purple-400 ring-purple-500/30",
  },
];

function StatsCards({ className }) {
  return (
    <div className={className}>
      {stats.map(({ icon: Icon, n, l, ring }) => (
        <div
          key={l}
          className="flex min-w-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-2 py-2 backdrop-blur-md transition hover:border-emerald-500/25 sm:gap-3 sm:px-4 sm:py-3"
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 sm:h-10 sm:w-10 ${ring}`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 text-left">
            <p className="text-xs font-bold text-white sm:text-lg">{n}</p>
            <p className="text-[9px] leading-snug text-slate-400 sm:text-xs">{l}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative scroll-mt-24">
      <div
        className="relative mx-auto flex w-full flex-col overflow-hidden lg:block lg:min-h-0 lg:aspect-[1900/800]"
        style={{ maxWidth: `${HERO_MAX_W}px` }}
      >
        <div aria-hidden className="absolute inset-0 hidden bg-[#0B0F19] lg:block" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-cover bg-right bg-no-repeat lg:block"
          style={{ backgroundImage: `url(${HERO_BG_URL})` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 hidden h-[min(80vw,640px)] w-[min(80vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.08] blur-3xl lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_55%_45%_at_50%_35%,rgba(34,197,94,0.06),transparent_65%)] lg:block"
        />

        <div className="relative z-10 flex flex-col lg:absolute lg:inset-0 lg:justify-center">
          {/* Mobile: image first, stats in flow below (not overlaid on the art) */}
          <div className="flex flex-col lg:hidden">
            <div className="relative mx-auto aspect-square w-full max-w-[600px] shrink-0 overflow-hidden bg-[#0B0F19]">
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${HERO_MOBILE_TEXT_BG_URL})` }}
              />
            </div>
            <div className={`${edgeInsetX} mt-5 pb-8`}>
              <StatsCards className="mx-auto grid w-full max-w-[600px] grid-cols-3 gap-1.5 sm:gap-3" />
            </div>
          </div>

          {/* Desktop: full hero copy + stats */}
          <div
            className={`relative z-10 hidden py-8 text-center sm:py-10 md:py-12 lg:block lg:mx-0 lg:max-w-3xl lg:py-0 lg:text-left ${edgeInsetX}`}
          >
            <div className="w-full lg:max-w-3xl">
              <h1 className="flex flex-col gap-0.5 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:gap-1 sm:text-4xl lg:text-[2.5rem] xl:text-[2.65rem]">
                <span className="block">Advanced Gaming &amp;</span>
                <span className="block bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Betting Platform
                </span>
                <span className="block">Solutions</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/90 sm:mt-5 sm:text-base lg:mx-0 lg:text-lg">
                We provide Satta Matka, Betting Platform, API Services, Game Development,
                Payment Solutions and Digital Marketing to scale your business.
              </p>
              <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <a
                  href="#get-in-touch"
                  className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-5 py-3 text-sm font-bold text-[#0B0F19] shadow-[0_0_22px_rgba(52,211,153,0.35)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(52,211,153,0.45)] sm:w-auto sm:min-h-[44px] sm:px-6"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                </a>
                <a
                  href="#platform-solutions"
                  className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:border-emerald-500/45 hover:bg-white/5 sm:w-auto sm:min-h-[44px] sm:px-6"
                >
                  View All Services
                  <ArrowRight className="h-4 w-4 opacity-90" strokeWidth={2} aria-hidden />
                </a>
              </div>

              <StatsCards className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-3 lg:mx-0 lg:max-w-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
