import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  ChevronDown,
  Gamepad2,
  LayoutDashboard,
  Layers,
  LogOut,
  PanelTop,
  Mail,
  Rocket,
  Users,
} from "lucide-react";
import { api } from "../lib/api.js";

const CATALOG_NAV_SECTIONS = [
  {
    id: "api-services",
    basePath: "/api-services",
    label: "API Services",
    icon: Layers,
    showLabel: "Show API services",
    addLabel: "Add API service",
  },
  {
    id: "games",
    basePath: "/games",
    label: "Games",
    icon: Gamepad2,
    showLabel: "Show games",
    addLabel: "Add game",
  },
  {
    id: "platforms",
    basePath: "/platforms",
    label: "Platform development",
    icon: PanelTop,
    showLabel: "Show platforms",
    addLabel: "Add platform",
  },
];

const navFocus = "outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45";
const navInactive =
  "flex w-full items-center gap-3 rounded-xl border border-transparent px-3.5 py-3 text-[14px] font-medium text-violet-200/45 transition hover:border-white/[0.06] hover:bg-violet-950/25 hover:text-white/90";
/** Active sidebar item — gradient frame + inner panel */
const navActiveWrap = "block w-full rounded-xl bg-gradient-to-br from-fuchsia-400 via-violet-500 to-indigo-700 p-px shadow-[0_0_20px_-6px_rgba(139,92,246,0.55)]";
const navActiveInner =
  "flex w-full items-center gap-3 rounded-[11px] bg-gradient-to-br from-[#1f1736] via-[#171028] to-[#0f0c18] px-3.5 py-3 text-[14px] font-medium text-white";
const navActiveInnerRow =
  "flex w-full items-center justify-between gap-2 rounded-[11px] bg-gradient-to-br from-[#1f1736] via-[#171028] to-[#0f0c18] px-3.5 py-3 text-[14px] font-medium text-white";

function displayInitials(name, email) {
  const n = (name || "").trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    const a = parts[0]?.[0] || "";
    const b = parts.length > 1 ? parts[parts.length - 1][0] : parts[0]?.[1] || "";
    return (a + b).toUpperCase() || "?";
  }
  const e = (email || "").trim();
  return e ? e[0].toUpperCase() : "?";
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [liveCount, setLiveCount] = useState(0);
  const [expanded, setExpanded] = useState({
    "api-services": false,
    games: false,
    platforms: false,
    messages: false,
  });

  const panel = new URLSearchParams(location.search).get("panel");
  const isDashboard = location.pathname === "/";

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.getApiServices(), api.getGames(), api.getPlatforms()])
      .then(([a, g, p]) => {
        if (cancelled) return;
        const n =
          (a?.count ?? a?.data?.length ?? 0) +
          (g?.count ?? g?.data?.length ?? 0) +
          (p?.count ?? p?.data?.length ?? 0);
        setLiveCount(n);
      })
      .catch(() => {
        if (!cancelled) setLiveCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /** Only one catalog / messages dropdown open at a time (accordion). */
  useEffect(() => {
    const p = location.pathname;
    setExpanded({
      "api-services": p === "/api-services",
      games: p === "/games",
      platforms: p === "/platforms",
      messages: p.startsWith("/messages"),
    });
  }, [location.pathname]);

  const toggleAccordionNav = useCallback((id) => {
    setExpanded((prev) => {
      if (prev[id]) {
        return {
          "api-services": false,
          games: false,
          platforms: false,
          messages: false,
        };
      }
      return {
        "api-services": id === "api-services",
        games: id === "games",
        platforms: id === "platforms",
        messages: id === "messages",
      };
    });
  }, []);

  const loadUser = useCallback(() => {
    if (!localStorage.getItem("token")) {
      setUser(null);
      return;
    }
    api
      .getMe()
      .then((res) => setUser(res?.data || null))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    function onProfileUpdated() {
      loadUser();
    }
    window.addEventListener("admin-profile-updated", onProfileUpdated);
    return () => window.removeEventListener("admin-profile-updated", onProfileUpdated);
  }, [loadUser]);

  const onSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const subLinkBase =
    "block w-full rounded-lg px-3 py-2 text-left text-[13px] font-medium transition";
  const subLinkIdle = `${subLinkBase} text-violet-200/45 hover:bg-violet-950/35 hover:text-white/90`;
  const subLinkActive = `${subLinkBase} border border-violet-500/35 bg-violet-500/15 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.12)]`;

  return (
    <div className="h-[100dvh] overflow-hidden bg-[#0b0e14] text-white">
      <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col md:flex-row">
        <aside className="no-scrollbar flex max-h-[42vh] shrink-0 flex-col overflow-y-auto overscroll-contain border-b border-white/[0.06] bg-[#0f131c]/95 px-4 py-5 backdrop-blur-xl sm:px-5 md:h-full md:max-h-[100dvh] md:w-[280px] md:border-b-0 md:border-r md:border-white/[0.07] lg:w-[288px]">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 shadow-lg shadow-violet-600/30 ring-1 ring-violet-400/25">
              <Box className="size-[22px] text-white" strokeWidth={2} />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="text-[13px] font-bold uppercase tracking-wide text-white">Orange</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                Gaming solutions
              </p>
            </div>
          </div>

          <nav className="mt-8 flex shrink-0 flex-col gap-2">
            <NavLink to="/" end className={`block w-full rounded-xl ${navFocus}`}>
              {({ isActive }) =>
                isActive ? (
                  <span className={navActiveWrap}>
                    <span className={navActiveInner}>
                      <LayoutDashboard
                        className="size-[18px] shrink-0 text-white"
                        strokeWidth={1.75}
                      />
                      <span className="truncate">Dashboard</span>
                    </span>
                  </span>
                ) : (
                  <span className={navInactive}>
                    <LayoutDashboard className="size-[18px] shrink-0" strokeWidth={1.75} />
                    <span className="truncate">Dashboard</span>
                  </span>
                )
              }
            </NavLink>

            {CATALOG_NAV_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const onRoute = location.pathname === sec.basePath;
              const isOpen = expanded[sec.id];
              return (
                <div key={sec.id} className="w-full">
                  <button
                    type="button"
                    onClick={() => toggleAccordionNav(sec.id)}
                    className={`block w-full rounded-xl text-left ${navFocus}`}
                    aria-expanded={isOpen}
                  >
                    {onRoute ? (
                      <span className={navActiveWrap}>
                        <span className={navActiveInnerRow}>
                          <span className="flex min-w-0 items-center gap-3">
                            <Icon className="size-[18px] shrink-0 text-white" strokeWidth={1.75} />
                            <span className="truncate">{sec.label}</span>
                          </span>
                          <ChevronDown
                            className={`size-[18px] shrink-0 text-white/75 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </span>
                      </span>
                    ) : (
                      <span className={`${navInactive} justify-between gap-2`}>
                        <span className="flex min-w-0 items-center gap-3">
                          <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
                          <span className="truncate">{sec.label}</span>
                        </span>
                        <ChevronDown
                          className={`size-[18px] shrink-0 text-white/35 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </span>
                    )}
                  </button>

                  {isOpen ? (
                    <div className="ml-2 mt-1.5 space-y-1 border-l border-white/[0.08] py-0.5 pl-2.5">
                      <Link
                        to={sec.basePath}
                        className={onRoute && panel !== "add" ? subLinkActive : subLinkIdle}
                      >
                        {sec.showLabel}
                      </Link>
                      <Link
                        to={`${sec.basePath}?panel=add`}
                        className={onRoute && panel === "add" ? subLinkActive : subLinkIdle}
                      >
                        {sec.addLabel}
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            })}

            <NavLink to="/users" className={`block w-full rounded-xl ${navFocus}`}>
              {({ isActive }) =>
                isActive ? (
                  <span className={navActiveWrap}>
                    <span className={navActiveInner}>
                      <Users className="size-[18px] shrink-0 text-white" strokeWidth={1.75} />
                      <span className="truncate">Users</span>
                    </span>
                  </span>
                ) : (
                  <span className={navInactive}>
                    <Users className="size-[18px] shrink-0" strokeWidth={1.75} />
                    <span className="truncate">Users</span>
                  </span>
                )
              }
            </NavLink>

            <div className="w-full">
              <button
                type="button"
                onClick={() => toggleAccordionNav("messages")}
                className={`block w-full rounded-xl text-left ${navFocus}`}
                aria-expanded={expanded.messages}
              >
                {location.pathname.startsWith("/messages") ? (
                  <span className={navActiveWrap}>
                    <span className={navActiveInnerRow}>
                      <span className="flex min-w-0 items-center gap-3">
                        <Mail className="size-[18px] shrink-0 text-white" strokeWidth={1.75} />
                        <span className="truncate">Messages</span>
                      </span>
                      <ChevronDown
                        className={`size-[18px] shrink-0 text-white/75 transition-transform ${expanded.messages ? "rotate-180" : ""}`}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                  </span>
                ) : (
                  <span className={`${navInactive} justify-between gap-2`}>
                    <span className="flex min-w-0 items-center gap-3">
                      <Mail className="size-[18px] shrink-0" strokeWidth={1.75} />
                      <span className="truncate">Messages</span>
                    </span>
                    <ChevronDown
                      className={`size-[18px] shrink-0 text-white/35 transition-transform ${expanded.messages ? "rotate-180" : ""}`}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                )}
              </button>

              {expanded.messages ? (
                <div className="ml-2 mt-1.5 space-y-1 border-l border-white/[0.08] py-0.5 pl-2.5">
                  <NavLink
                    to="/messages/contact"
                    className={({ isActive }) => (isActive ? subLinkActive : subLinkIdle)}
                  >
                    Contact Message
                  </NavLink>
                  <NavLink
                    to="/messages/api-services"
                    className={({ isActive }) => (isActive ? subLinkActive : subLinkIdle)}
                  >
                    API services Message
                  </NavLink>
                  <NavLink
                    to="/messages/games"
                    className={({ isActive }) => (isActive ? subLinkActive : subLinkIdle)}
                  >
                    Games Message
                  </NavLink>
                </div>
              ) : null}
            </div>
          </nav>

          <div className="mt-auto shrink-0 space-y-3 border-t border-white/[0.08] pt-5">
            <div className="rounded-xl border border-violet-500/25 bg-gradient-to-br from-violet-950/50 to-[#0c0e14] p-3 shadow-inner shadow-black/25">
              <div className="flex items-center gap-3">
                <Rocket
                  className="size-8 shrink-0 text-violet-300 drop-shadow-[0_0_8px_rgba(167,139,250,0.35)]"
                  strokeWidth={1.35}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-2xl font-bold tabular-nums leading-none text-white">
                    {liveCount}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-white/75">Live services</p>
                </div>
              </div>
              <p className="mt-2 text-center text-[10px] leading-tight text-white/35">
                All systems operational
              </p>
            </div>
            {!isDashboard ? (
              <button
                type="button"
                onClick={onSignOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-transparent py-2.5 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                <LogOut className="size-4" strokeWidth={1.75} />
                Sign out
              </button>
            ) : null}
          </div>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#0a0c12]">
          {isDashboard ? (
            <div className="shrink-0 border-b border-white/10 px-4 py-1.5 md:px-8">
              <div className="flex h-10 items-center justify-end gap-2 md:h-9">
                <Link
                  to="/settings"
                  className="inline-flex h-8 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 pr-3 transition hover:border-violet-500/35 hover:bg-violet-950/30"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 text-[10px] font-bold text-white ring-1 ring-white/15">
                    {user ? displayInitials(user.name, user.email) : "—"}
                  </span>
                  <span className="text-sm font-semibold text-white">Admin</span>
                </Link>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.12] bg-transparent px-2.5 text-xs font-medium text-white/80 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white md:text-sm"
                >
                  <LogOut className="size-3.5 md:size-4" strokeWidth={1.75} />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </div>
            </div>
          ) : null}
          <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 md:px-8 md:py-8">
            <Outlet context={{ user, setUser, refreshUser: loadUser }} />
          </div>
        </main>
      </div>
    </div>
  );
}
