import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Activity } from "lucide-react";
import useApiResource from "../hooks/useApiResource.js";
import { api } from "../lib/api.js";
import { getIcon } from "../lib/iconRegistry.jsx";
import { pageShell } from "../constants/layout.js";

const featureFallbacks = [
  "Real-time data streaming",
  "Easy REST integration",
  "Detailed documentation",
  "24/7 technical support",
];

const stats = [
  { Icon: Activity, label: "Uptime", value: "99.9%" },
  { Icon: Zap, label: "Latency", value: "<150ms" },
  { Icon: ShieldCheck, label: "Secure", value: "TLS 1.3" },
];

export default function ApiServices() {
  const { data: apis, loading, error } = useApiResource(() => api.getApiServices(), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]" />

      <div className={`relative ${pageShell}`}>
        {/* Hero */}
        <section className="pt-10 text-center md:pt-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-300/90">
            <Zap className="h-3.5 w-3.5" /> Built for gaming platforms
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Premium{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              API
            </span>{" "}
            Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Powerful, real-time APIs to power every part of your gaming platform — from live scores
            and odds to casino integrations and streaming.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-10 sm:gap-4">
            {stats.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md sm:p-5"
              >
                <Icon
                  className="mx-auto h-4 w-4 text-violet-300 sm:h-5 sm:w-5"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="mt-1.5 text-base font-bold text-white sm:mt-2 sm:text-xl">{value}</p>
                <p className="text-[10px] uppercase tracking-wide text-slate-400 sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="mt-14 sm:mt-16">
          <h2 className="text-center text-xl font-bold tracking-tight text-white sm:text-2xl">
            All API Services
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-xs text-slate-400 sm:text-sm">
            Pick the APIs you need. All endpoints are documented and ready to integrate.
          </p>

          {loading ? (
            <SkeletonGrid count={8} />
          ) : error ? (
            <p className="mt-10 text-center text-sm text-rose-400/90">
              Couldn't load API services — {error}
            </p>
          ) : apis.length === 0 ? (
            <p className="mt-10 text-center text-sm text-slate-400">
              No API services available yet.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {apis.map((a) => (
                <ApiDetailCard key={a._id || a.title} api={a} />
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mt-16 mb-10 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-transparent p-6 text-center sm:p-10">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Ready to integrate?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
            Talk to our team — we'll set you up with API keys, sample code, and a free trial.
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

function ApiDetailCard({ api: a }) {
  const Icon = getIcon(a.iconName);
  const features = Array.isArray(a.features) && a.features.length ? a.features : featureFallbacks;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111622]/95 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 sm:p-6">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${a.mobileTopFade || "from-violet-500/25"} to-transparent opacity-90`}
      />

      <div className="relative flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05]">
          <Icon
            className={`h-5 w-5 ${a.iconColorClass || "text-violet-300"}`}
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-white sm:text-lg">{a.title}</h3>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">{a.description}</p>
        </div>
      </div>

      <ul className="relative mt-5 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-slate-300 sm:text-sm">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/90"
              strokeWidth={2}
              aria-hidden
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/#get-in-touch"
        className={`relative mt-6 inline-flex min-h-[40px] items-center justify-between rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold transition hover:bg-white/[0.05] sm:text-sm ${
          a.ctaClass || "text-violet-300 hover:text-violet-200"
        }`}
      >
        Get Started
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={2} />
      </Link>
    </article>
  );
}

function SkeletonGrid({ count }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-56 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
        />
      ))}
    </div>
  );
}
