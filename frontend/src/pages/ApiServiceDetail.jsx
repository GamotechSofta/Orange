import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Server,
  Sparkles,
} from "lucide-react";
import useApiResource from "../hooks/useApiResource.js";
import { api } from "../lib/api.js";
import { getIcon } from "../lib/iconRegistry.jsx";
import { pageShell } from "../constants/layout.js";

function useApiService(id) {
  const fetcher = () => api.getApiServiceById(id);
  // useApiResource always returns array data; here we wrap so it works for a single object.
  const { data, loading, error } = useApiResource(
    () =>
      fetcher().then((res) => ({
        ...res,
        data: res?.data ? [res.data] : [],
      })),
    [id]
  );
  return { service: data[0] || null, loading, error };
}

export default function ApiServiceDetail() {
  const { id } = useParams();
  const { service, loading, error } = useApiService(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]" />

      <div className={`relative ${pageShell}`}>
        <Link
          to="/apis"
          className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back to all APIs
        </Link>

        {loading ? (
          <Skeleton />
        ) : error ? (
          <p className="mt-12 text-center text-sm text-rose-400/90">
            Couldn't load API service — {error}
          </p>
        ) : !service ? (
          <p className="mt-12 text-center text-sm text-slate-400">API service not found.</p>
        ) : (
          <ApiServiceBody service={service} />
        )}
      </div>
    </div>
  );
}

function ApiServiceBody({ service: a }) {
  const Icon = getIcon(a.iconName);
  const features = Array.isArray(a.features) ? a.features : [];
  const technicalDetails = Array.isArray(a.technicalDetails)
    ? a.technicalDetails
    : a.technicalDetails
      ? [a.technicalDetails]
      : [];

  return (
    <>
      {/* 1-3: Icon, name, short description */}
      <section className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] sm:h-16 sm:w-16">
          <Icon
            className={`h-7 w-7 ${a.iconColorClass || "text-violet-300"} sm:h-8 sm:w-8`}
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {a.title}
          </h1>
          {a.shortDescription ? (
            <p className="mt-2 text-sm font-medium text-slate-300 sm:text-base">
              {a.shortDescription}
            </p>
          ) : null}
        </div>
      </section>

      {/* 4. Key features */}
      {features.length ? (
        <section className="mt-12">
          <SectionHeading icon={Sparkles} label="Key features" tint="text-emerald-300" />
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-sm text-slate-200">{f}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* 5. Description */}
      {a.description ? (
        <section className="mt-12">
          <SectionHeading label="Description" tint="text-violet-300" />
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-300 sm:text-base">
            {a.description}
          </p>
        </section>
      ) : null}

      {/* 6. Technical details */}
      {technicalDetails.length ? (
        <section className="mt-12">
          <SectionHeading icon={Server} label="Technical details" tint="text-sky-300" />
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {technicalDetails.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-sm text-slate-200">{t}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* CTA */}
      <section className="mt-14 mb-12 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-transparent p-6 text-center sm:p-10">
        <h3 className="text-xl font-bold text-white sm:text-2xl">Want to integrate {a.title}?</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
          Get API keys, sample code, and a free trial. Our team replies within 24h.
        </p>
        <Link
          to="/#get-in-touch"
          className="mt-6 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_22px_-4px_rgba(139,92,246,0.55)] transition hover:scale-[1.02]"
        >
          Get In Touch
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </section>
    </>
  );
}

function SectionHeading({ icon: Icon, label, tint = "text-violet-300" }) {
  return (
    <div className="flex items-center gap-2">
      {Icon ? <Icon className={`h-5 w-5 ${tint}`} strokeWidth={1.75} aria-hidden /> : null}
      <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{label}</h2>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="mt-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
        <div className="space-y-3">
          <div className="h-8 w-56 animate-pulse rounded-md bg-white/[0.05]" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-white/[0.03]" />
        </div>
      </div>
      <div className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
      <div className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
    </div>
  );
}
