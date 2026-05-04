import {
  BarChart3,
  Dices,
  Goal,
  Layers3,
  Radio,
  Star,
  Tv,
  Zap,
} from "lucide-react";
import ServiceCard from "./ServiceCard.jsx";

const apis = [
  {
    title: "Casino API",
    description: "Integrate 1000+ casino games.",
    glow: "orange",
    icon: <Dices className="h-6 w-6 text-orange-400" strokeWidth={1.5} />,
    ctaClass: "text-orange-400 hover:text-orange-300",
  },
  {
    title: "Score API",
    description: "Live score, lineups, commentary.",
    glow: "emerald",
    icon: <BarChart3 className="h-6 w-6 text-emerald-400" strokeWidth={1.5} />,
    ctaClass: "text-emerald-400 hover:text-emerald-300",
  },
  {
    title: "Odds API",
    description: "Real-time odds for cricket, tennis, soccer.",
    glow: "amber",
    icon: <Zap className="h-6 w-6 text-yellow-400" strokeWidth={1.5} />,
    ctaClass: "text-amber-400 hover:text-amber-300",
  },
  {
    title: "Fancy API",
    description: "Session fancy, player fancy, over fancy.",
    glow: "violet",
    icon: <Star className="h-6 w-6 text-violet-400" strokeWidth={1.5} />,
    ctaClass: "text-violet-400 hover:text-violet-300",
  },
  {
    title: "Fancy & Bookmaker API",
    description: "Bookmaker & fancy market integration.",
    glow: "blue",
    icon: <Layers3 className="h-6 w-6 text-blue-400" strokeWidth={1.5} />,
    ctaClass: "text-blue-400 hover:text-blue-300",
  },
  {
    title: "Sports Result API",
    description: "Fast & accurate sports results API.",
    glow: "rose",
    icon: <Goal className="h-6 w-6 text-pink-400" strokeWidth={1.5} />,
    ctaClass: "text-pink-400 hover:text-pink-300",
  },
  {
    title: "TV API",
    description: "Live TV streaming API for sports & events.",
    glow: "cyan",
    icon: <Tv className="h-6 w-6 text-cyan-400" strokeWidth={1.5} />,
    ctaClass: "text-cyan-400 hover:text-cyan-300",
  },
  {
    title: "Betfair API",
    description: "Integrate Betfair markets & data.",
    glow: "orange",
    icon: <Radio className="h-6 w-6 text-orange-300" strokeWidth={1.5} />,
    ctaClass: "text-orange-400 hover:text-orange-300",
  },
];

export default function ApiSection() {
  return (
    <section id="api-services" className="scroll-mt-28">
      <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
        Our <span className="text-emerald-400">API</span> Services
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {apis.map((a) => (
          <ServiceCard
            key={a.title}
            icon={a.icon}
            title={a.title}
            description={a.description}
            glow={a.glow}
            ctaText="View Details →"
            ctaClassName={a.ctaClass}
          />
        ))}
      </div>
    </section>
  );
}
