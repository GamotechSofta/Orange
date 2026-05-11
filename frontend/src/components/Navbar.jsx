import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import { edgeInsetX } from "../constants/layout.js";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#platform-solutions" },
  { label: "APIs", to: "/apis" },
  { label: "Games", to: "/games" },
  { label: "Contact", href: "#get-in-touch" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 border-b border-white/10 bg-[#0B0F19]/90 backdrop-blur-xl ${menuOpen ? "z-[70]" : "z-50"}`}
    >
      <nav
        className={`mx-auto flex w-full max-w-screen-xl items-center justify-between gap-3 py-3 md:py-2 ${edgeInsetX}`}
      >
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
          onClick={closeMenu}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-[#0B0F19] shadow-[0_0_20px_rgba(52,211,153,0.3)] sm:h-10 sm:w-10">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
          </span>
          <span className="text-sm font-bold tracking-tight text-orange-400 sm:text-base lg:text-lg">
            Orange
          </span>
        </Link>

        <ul className="hidden flex-1 flex-wrap items-center justify-center gap-x-0.5 md:flex lg:gap-x-0.5">
          {links.map((item) => (
            <li key={item.label}>
              {item.to ? (
                <Link
                  to={item.to}
                  className="rounded-lg px-2 py-2 text-[11px] font-medium text-white/95 transition hover:bg-white/5 hover:text-white lg:px-2.5 lg:text-xs xl:text-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="rounded-lg px-2 py-2 text-[11px] font-medium text-white/95 transition hover:bg-white/5 hover:text-white lg:px-2.5 lg:text-xs xl:text-sm"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#get-in-touch"
            className="hidden rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-4 py-2.5 text-xs font-bold text-[#0B0F19] shadow-[0_0_18px_rgba(52,211,153,0.35)] transition hover:scale-[1.02] hover:shadow-[0_0_26px_rgba(52,211,153,0.45)] md:inline-flex lg:text-sm"
          >
            Get In Touch
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-14 z-[60] flex flex-col bg-[#0B0F19] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-10 pt-6 sm:px-5">
            {links.map((item) =>
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="touch-manipulation rounded-xl px-4 py-3.5 text-center text-base font-semibold text-white transition hover:bg-white/10 active:bg-white/15"
                  onClick={closeMenu}
                >
                  {item.mobileLabel ?? item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="touch-manipulation rounded-xl px-4 py-3.5 text-center text-base font-semibold text-white transition hover:bg-white/10 active:bg-white/15"
                  onClick={closeMenu}
                >
                  {item.mobileLabel ?? item.label}
                </a>
              )
            )}
            <a
              href="#get-in-touch"
              className="mt-4 inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-6 py-3 text-base font-bold text-[#0B0F19] shadow-[0_0_20px_rgba(52,211,153,0.35)]"
              onClick={closeMenu}
            >
              Get In Touch
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
