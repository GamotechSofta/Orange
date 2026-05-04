import {
  ClipboardList,
  CodeXml,
  Crosshair,
  Disc3,
  Dices,
  Network,
  Trophy,
  Tv,
} from "lucide-react";
import ServiceCard from "./ServiceCard.jsx";

const apis = [
  {
    title: "Casino API",
    description: "Integrate 1000+ casino games in your platform.",
    glow: "purple",
    mobileTopFade: "from-purple-500/30",
    icon: <Dices className="h-5 w-5 text-purple-400" strokeWidth={1.45} />,
    ctaClass: "text-purple-400 hover:text-purple-300",
  },
  {
    title: "Score API",
    description: "Live score, lineups, commentary & more.",
    glow: "emerald",
    mobileTopFade: "from-emerald-500/30",
    icon: <ClipboardList className="h-5 w-5 text-emerald-400" strokeWidth={1.45} />,
    ctaClass: "text-emerald-400 hover:text-emerald-300",
  },
  {
    title: "Odds API",
    description: "Real-time odds for cricket, tennis, soccer.",
    glow: "orange",
    mobileTopFade: "from-orange-500/30",
    icon: <Crosshair className="h-5 w-5 text-orange-400" strokeWidth={1.45} />,
    ctaClass: "text-orange-400 hover:text-orange-300",
  },
  {
    title: "Fancy API",
    description: "Session fancy, player fancy, over fancy.",
    glow: "fuchsia",
    mobileTopFade: "from-fuchsia-500/30",
    icon: <Trophy className="h-5 w-5 text-fuchsia-400" strokeWidth={1.45} />,
    ctaClass: "text-fuchsia-400 hover:text-fuchsia-300",
  },
  {
    title: "Fancy & Bookmaker API",
    description: "Bookmaker & fancy market integration.",
    glow: "blue",
    mobileTopFade: "from-blue-500/30",
    icon: <CodeXml className="h-5 w-5 text-blue-400" strokeWidth={1.45} />,
    ctaClass: "text-blue-400 hover:text-blue-300",
  },
  {
    title: "Sports Result API",
    description: "Fast & accurate sports results API.",
    glow: "teal",
    mobileTopFade: "from-teal-500/30",
    icon: <Disc3 className="h-5 w-5 text-teal-400" strokeWidth={1.45} />,
    ctaClass: "text-teal-400 hover:text-teal-300",
  },
  {
    title: "TV API",
    description: "Live TV streaming API for sports & events.",
    glow: "violet",
    mobileTopFade: "from-violet-500/30",
    icon: <Tv className="h-5 w-5 text-violet-400" strokeWidth={1.45} />,
    ctaClass: "text-violet-400 hover:text-violet-300",
  },
  {
    title: "Betfair API",
    description: "Integrate Betfair markets & data.",
    glow: "gold",
    mobileTopFade: "from-amber-400/35",
    icon: <Network className="h-5 w-5 text-amber-300" strokeWidth={1.45} />,
    ctaClass: "text-amber-300 hover:text-amber-200",
  },
];

export default function ApiSection() {
  return (
    <section id="api-services" className="scroll-mt-28">
      <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-[2rem]">
        Our Premium{" "}
        <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
          API
        </span>{" "}
        Services
      </h2>
      <p className="mx-auto mt-3 hidden max-w-2xl px-4 text-center text-sm font-medium leading-relaxed text-slate-400 md:block sm:text-base">
        Powerful &amp; real-time APIs to boost your platform performance
      </p>
      <div className="mt-8 grid grid-cols-4 gap-1.5 md:gap-3 lg:grid-cols-4 xl:grid-cols-8 xl:gap-3">
        {apis.map((a) => (
          <ServiceCard
            key={a.title}
            variant="api"
            className="min-w-0 w-full md:w-auto"
            icon={a.icon}
            title={a.title}
            description={a.description}
            glow={a.glow}
            ctaText="View Details →"
            ctaClassName={a.ctaClass}
            mobileTopFade={a.mobileTopFade}
          />
        ))}
      </div>
    </section>
  );
}
