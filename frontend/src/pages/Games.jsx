import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2 } from "lucide-react";
import GameCard from "../components/GameCard.jsx";
import useApiResource from "../hooks/useApiResource.js";
import { api } from "../lib/api.js";
import { pageShell } from "../constants/layout.js";

export default function Games() {
  const { data: games, loading, error } = useApiResource(() => api.getGames(), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />

      <div className={`relative ${pageShell}`}>
        <section className="pt-10 text-center md:pt-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-300/90">
            <Gamepad2 className="h-3.5 w-3.5" /> Game catalog
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Game
            </span>{" "}
            Development Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Engaging, feature-rich games — fully customised for your platform. Browse the full
            catalog below.
          </p>
        </section>

        <section className="mt-10 sm:mt-12">
          {loading ? (
            <SkeletonGrid count={10} />
          ) : error ? (
            <p className="mt-10 text-center text-sm text-rose-400/90">
              Couldn't load games — {error}
            </p>
          ) : games.length === 0 ? (
            <p className="mt-10 text-center text-sm text-slate-400">
              No games available yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
              {games.map((g) => (
                <GameCard
                  key={g._id || g.title}
                  title={g.title}
                  description={g.description}
                  imageSrc={g.imageSrc}
                  imageAlt={g.imageAlt || g.title}
                  glowClasses={g.glowClasses}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-14 mb-12 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-transparent p-6 text-center sm:p-10">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Want a custom game built?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
            Our team designs, builds and ships engaging games for gaming platforms. Tell us your
            idea — we'll send a proposal within 24h.
          </p>
          <Link
            to="/#get-in-touch"
            className="mt-6 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_22px_-4px_rgba(139,92,246,0.55)] transition hover:scale-[1.02]"
          >
            Get In Touch
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </section>
      </div>
    </div>
  );
}

function SkeletonGrid({ count }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="aspect-[4/3] animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
        />
      ))}
    </div>
  );
}
