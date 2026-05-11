import useApiResource from "../hooks/useApiResource.js";
import { api } from "../lib/api.js";
import { getIcon } from "../lib/iconRegistry.jsx";

export default function PlatformSection() {
  const { data: platforms, loading, error } = useApiResource(
    () => api.getPlatforms(),
    []
  );

  return (
    <section id="platform-solutions" className="scroll-mt-28">
      <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-[2rem]">
        Our <span className="text-emerald-400">Platform</span> Solutions
      </h2>

      {loading ? (
        <SkeletonGrid count={3} />
      ) : error ? (
        <ErrorState message={error} />
      ) : platforms.length === 0 ? (
        <EmptyState message="No platforms available yet." />
      ) : (
        <div className="mt-8 grid grid-cols-3 gap-1.5 sm:gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {platforms.map((p) => {
            const Icon = getIcon(p.iconName);
            return (
              <article
                key={p._id || p.title}
                className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#0c101c]/90 shadow-lg backdrop-blur-md transition-all duration-300 max-md:min-w-0 md:rounded-2xl ${p.borderHover} ${p.glow} hover:-translate-y-0.5`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${p.glowTop} to-transparent opacity-95 md:hidden`}
                />
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 hidden bg-gradient-to-br opacity-[0.62] md:block ${p.gradient}`}
                />
                <div className="relative flex flex-col items-center gap-1.5 p-2 text-center max-md:pt-3 md:flex-row md:items-start md:gap-3.5 md:p-4 md:text-left">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] md:h-auto md:w-auto md:rounded-none md:border-0 md:bg-transparent ${p.iconClass}`}
                  >
                    <Icon className="h-5 w-5 md:h-11 md:w-11" strokeWidth={1.35} />
                  </div>
                  <div className="min-w-0 flex-1 md:text-left">
                    <h3 className="text-[9px] font-bold leading-tight text-white md:text-sm lg:text-base">
                      {p.title}
                    </h3>
                    <p className="mt-1 line-clamp-4 text-[7.5px] leading-snug text-slate-400 md:mt-1.5 md:line-clamp-none md:text-xs md:leading-normal lg:text-sm lg:leading-snug">
                      {p.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function SkeletonGrid({ count }) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-1.5 sm:gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-28 animate-pulse rounded-xl border border-white/10 bg-white/[0.03] md:h-32 md:rounded-2xl"
        />
      ))}
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <p className="mt-8 text-center text-sm text-rose-400/90">
      Couldn't load platforms — {message}
    </p>
  );
}

function EmptyState({ message }) {
  return <p className="mt-8 text-center text-sm text-slate-400">{message}</p>;
}
