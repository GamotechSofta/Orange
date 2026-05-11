import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GameCard from "./GameCard.jsx";
import useApiResource from "../hooks/useApiResource.js";
import { api } from "../lib/api.js";

export default function GameSection() {
  const { data: games, loading, error } = useApiResource(
    () => api.getGames(),
    []
  );

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

      {loading ? (
        <SkeletonGrid count={5} />
      ) : error ? (
        <p className="mt-8 text-center text-sm text-rose-400/90">
          Couldn't load games — {error}
        </p>
      ) : games.length === 0 ? (
        <p className="mt-8 text-center text-sm text-slate-400">
          No games available yet.
        </p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {games.map((g) => (
              <GameCard
                key={g._id || g.title}
                title={g.title}
                description={g.description}
                imageSrc={g.imageSrc}
                imageAlt={g.imageAlt}
                glowClasses={g.glowClasses}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              to="/games"
              className="inline-flex min-h-[48px] touch-manipulation items-center gap-2 rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/40 hover:bg-white/5 sm:min-h-[44px] sm:px-8 sm:text-base"
            >
              View All Games
              <ArrowRight
                className="h-4 w-4 shrink-0 opacity-90 sm:h-[18px] sm:w-[18px]"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

function SkeletonGrid({ count }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="aspect-[4/3] animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
        />
      ))}
    </div>
  );
}
