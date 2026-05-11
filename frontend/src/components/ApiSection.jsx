import ServiceCard from "./ServiceCard.jsx";
import useApiResource from "../hooks/useApiResource.js";
import { api } from "../lib/api.js";
import { getIcon } from "../lib/iconRegistry.jsx";

export default function ApiSection() {
  const { data: apis, loading, error } = useApiResource(
    () => api.getApiServices(),
    []
  );

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

      {loading ? (
        <SkeletonGrid count={8} />
      ) : error ? (
        <p className="mt-8 text-center text-sm text-rose-400/90">
          Couldn't load API services — {error}
        </p>
      ) : apis.length === 0 ? (
        <p className="mt-8 text-center text-sm text-slate-400">
          No API services available yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-4 gap-1.5 md:gap-3 lg:grid-cols-4 xl:grid-cols-8 xl:gap-3">
          {apis.map((a) => {
            const Icon = getIcon(a.iconName);
            return (
              <ServiceCard
                key={a._id || a.title}
                variant="api"
                className="min-w-0 w-full md:w-auto"
                icon={
                  <Icon
                    className={`h-5 w-5 ${a.iconColorClass || "text-emerald-400"}`}
                    strokeWidth={1.45}
                  />
                }
                title={a.title}
                description={a.description}
                glow={a.glow}
                ctaText="View Details →"
                ctaTo="/apis"
                ctaClassName={a.ctaClass}
                mobileTopFade={a.mobileTopFade}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

function SkeletonGrid({ count }) {
  return (
    <div className="mt-8 grid grid-cols-4 gap-1.5 md:gap-3 lg:grid-cols-4 xl:grid-cols-8 xl:gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-xl border border-white/10 bg-white/[0.03] md:h-32 md:rounded-2xl"
        />
      ))}
    </div>
  );
}
