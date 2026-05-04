import { ArrowRight } from "lucide-react";
import GameCard from "./GameCard.jsx";

const games = [
  {
    title: "Roulette Game",
    description: "Classic roulette game with real casino experience.",
    imageSrc: "/images/roulette-game.png",
    imageAlt: "Luxury casino roulette wheel with chips and betting grid",
    glowClasses: "from-emerald-500/35 via-amber-500/20",
  },
  {
    title: "Bingo Game",
    description: "Exciting bingo game with multiple variations.",
    imageSrc: "/images/bingo-game.png",
    imageAlt: "Colorful bingo balls and bingo cards on a glowing blue background",
    glowClasses: "from-blue-500/40 via-indigo-500/20",
  },
  {
    title: "Teen Patti Game",
    description: "Most popular card game loved by millions.",
    imageSrc: "/images/teen-patti-game.png",
    imageAlt: "Teen Patti playing cards, chips and gold lettering on a red casino table",
    glowClasses: "from-red-600/45 via-amber-500/25",
  },
  {
    title: "Andar Bahar Game",
    description: "Simple, fast & thrilling andar bahar game.",
    imageSrc: "/images/andar-bahar-game.png",
    imageAlt: "Andar Bahar game branding with Andar and Bahar sides, chips and purple gold casino theme",
    glowClasses: "from-violet-500/40 via-amber-500/25",
  },
  {
    title: "Gali Desawar Game",
    description: "Gali desawar satta game with result & chart.",
    imageSrc: "/images/gali-desawar-game.png",
    imageAlt: "Gali Desawar game with live result panels, numbered balls and gold crown branding",
    glowClasses: "from-amber-400/45 via-yellow-600/20",
  },
];

export default function GameSection() {
  return (
    <section id="games" className="scroll-mt-28">
      <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-[2rem]">
        Our{" "}
        <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
          Game
        </span>{" "}
        Development Services
      </h2>
      <p className="mx-auto mt-3 max-w-2xl px-4 text-center text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
        Engaging &amp; feature-rich games for your platform
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {games.map((g) => (
          <GameCard
            key={g.title}
            title={g.title}
            description={g.description}
            imageSrc={g.imageSrc}
            imageAlt={g.imageAlt}
            glowClasses={g.glowClasses}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center sm:mt-12">
        <a
          href="#games"
          className="inline-flex min-h-[48px] touch-manipulation items-center gap-2 rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/40 hover:bg-white/5 sm:min-h-[44px] sm:px-8 sm:text-base"
        >
          View All Games
          <ArrowRight className="h-4 w-4 shrink-0 opacity-90 sm:h-[18px] sm:w-[18px]" strokeWidth={2} aria-hidden />
        </a>
      </div>
    </section>
  );
}
