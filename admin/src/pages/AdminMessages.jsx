import { Mail, RefreshCw, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { api } from "../lib/api.js";

const KIND_CONFIG = {
  contact: {
    category: "contact",
    title: "Contact messages",
    subtitle:
      "Submissions from the contact form details comming from web3forms",
  },
  "api-services": {
    category: "services",
    title: "API services messages",
    subtitle: "Submissions from API-related form details comming from web3forms.",
  },
  games: {
    category: "game",
    title: "Games messages",
    subtitle: "Submissions from games form details comming from web3forms.",
  },
};

/** Same as Games / catalog admin tables (`AdminCatalogPage.jsx`) */
const CATALOG_TABLE_HEAD =
  "bg-gradient-to-r from-violet-950 via-purple-950/95 to-indigo-950/90 text-[11px] font-semibold uppercase tracking-wider text-violet-100/90 border-b border-violet-500/25";

const CATALOG_UI = {
  title:
    "bg-gradient-to-r from-violet-200 via-fuchsia-200 to-purple-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent",
  bar: "h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500",
  rowHover: "transition-colors hover:bg-violet-500/[0.06]",
  tableFrame:
    "overflow-hidden rounded-xl border border-violet-500/20 bg-gradient-to-b from-violet-950/15 to-[#080a10] shadow-[0_0_36px_-14px_rgba(109,40,217,0.45)]",
  ghost:
    "rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/[0.08] disabled:opacity-50",
};

const thDivider = "border-r border-violet-400/25 last:border-r-0";
const tdDivider = "border-r border-white/[0.08] last:border-r-0";

function formatDateTime(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  } catch {
    return "—";
  }
}

export default function AdminMessages() {
  const { kind } = useParams();
  const category = KIND_CONFIG[kind]?.category ?? null;
  const cfg = KIND_CONFIG[kind];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.getMessagesAll();
      const list = Array.isArray(res?.data) ? res.data : [];
      setItems(list);
    } catch (e) {
      setError(e.message || "Failed to load messages");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!selected) return;
    function onKey(e) {
      if (e.key === "Escape") setSelected(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  const filtered = useMemo(() => {
    if (!category) return [];
    return items.filter((m) => m.category === category);
  }, [items, category]);

  if (!cfg) {
    return <Navigate to="/messages/contact" replace />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className={CATALOG_UI.title}>{cfg.title}</h2>
          <div className={`mt-3 ${CATALOG_UI.bar}`} />
          <p className="mt-3 max-w-2xl text-sm text-white/55">{cfg.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => load()}
          disabled={loading}
          className={`inline-flex items-center gap-2 ${CATALOG_UI.ghost}`}
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} strokeWidth={2} />
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-violet-500/40 bg-gradient-to-r from-violet-950/70 to-indigo-950/50 px-3 py-1.5 shadow-md shadow-black/25 ring-1 ring-violet-500/15"
          role="status"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wide text-violet-100/90">
            Total message
          </span>
          <span className="min-w-[1.75rem] rounded-md bg-black/35 px-2 py-0.5 text-center text-sm font-bold tabular-nums text-white ring-1 ring-white/10">
            {filtered.length}
          </span>
        </div>
        <span className="text-xs text-white/45">Click a row for full details</span>
      </div>

      {error ? (
        <div
          className="rounded-xl border border-rose-500/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <div className={CATALOG_UI.tableFrame}>
        <div className="overflow-x-auto">
          {loading && !items.length ? (
            <p className="px-4 py-10 text-center text-sm text-white/55">Loading messages…</p>
          ) : filtered.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-white/45">No messages in this category yet.</p>
          ) : (
            <table className="min-w-[880px] w-full border-collapse text-left text-sm">
              <thead className={CATALOG_TABLE_HEAD}>
                <tr>
                  <th className={`whitespace-nowrap px-4 py-3.5 ${thDivider}`}>Submitted at</th>
                  <th className={`min-w-[120px] px-4 py-3.5 ${thDivider}`}>Name</th>
                  <th className={`min-w-[160px] px-4 py-3.5 ${thDivider}`}>Email</th>
                  <th className={`min-w-[110px] px-4 py-3.5 ${thDivider}`}>Phone</th>
                  <th className="min-w-[220px] px-4 py-3.5">Message</th>
                </tr>
              </thead>
              <tbody className="text-white/85">
                {filtered.map((row) => (
                  <tr
                    key={row._id}
                    role="button"
                    tabIndex={0}
                    title="Click for full message"
                    onClick={() => setSelected(row)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(row);
                      }
                    }}
                    className={`cursor-pointer border-t border-white/[0.06] ${CATALOG_UI.rowHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-violet-500/50`}
                  >
                    <td className={`whitespace-nowrap px-4 py-3 align-top tabular-nums text-white/75 ${tdDivider}`}>
                      {formatDateTime(row.createdAt)}
                    </td>
                    <td className={`max-w-[180px] px-4 py-3 align-top font-medium text-white ${tdDivider}`}>
                      <span className="line-clamp-2 break-words">{row.fullName || "—"}</span>
                    </td>
                    <td className={`max-w-[200px] px-4 py-3 align-top ${tdDivider}`}>
                      <span className="line-clamp-2 break-all">{row.email || "—"}</span>
                    </td>
                    <td className={`max-w-[130px] px-4 py-3 align-top text-white/75 ${tdDivider}`}>
                      {row.phone?.trim() ? (
                        <span className="line-clamp-2 break-words">{row.phone}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="max-w-md px-4 py-3 align-top">
                      <span className="line-clamp-2 whitespace-pre-wrap break-words">{row.message}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={(ev) => {
            if (ev.target === ev.currentTarget) setSelected(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="msg-detail-title"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0B0F19] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/55">
              <Mail className="size-3.5 opacity-70" strokeWidth={2} />
              {selected.category === "services"
                ? "API services"
                : selected.category === "game"
                  ? "Games"
                  : "Contact"}
            </div>

            <h2 id="msg-detail-title" className="pr-10 text-xl font-bold text-white">
              {selected.fullName || "—"}
            </h2>
            <p className="mt-1 text-[13px] text-white/45">{formatDateTime(selected.createdAt)}</p>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Email</dt>
                <dd className="mt-1 break-all text-white/90">{selected.email}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Phone</dt>
                <dd className="mt-1 text-white/90">{selected.phone?.trim() ? selected.phone : "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Message</dt>
                <dd className="mt-2 whitespace-pre-wrap break-words rounded-xl border border-white/[0.06] bg-black/25 px-4 py-3 text-white/85">
                  {selected.message}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}
    </section>
  );
}
