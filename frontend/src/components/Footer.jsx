import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:scale-105 hover:border-emerald-500/40 hover:text-emerald-400 hover:shadow-glow md:h-10 md:w-10"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19]">
      <div className="mx-auto max-w-screen-xl px-4 py-12 text-center sm:px-5 md:px-8 md:py-14 lg:px-10">
        <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-2 md:items-start md:gap-10 md:text-left lg:grid-cols-3 xl:grid-cols-6">
          <div className="flex max-w-sm flex-col items-center md:items-start xl:col-span-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-lg font-bold md:justify-start"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-[#0B0F19] shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-orange-400">Orange</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Advanced gaming and betting platform solutions, APIs, and game development for serious
              operators.
            </p>
          </div>

          <div className="w-full max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/#home" className="text-slate-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/#platform-solutions" className="text-slate-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/#api-services" className="text-slate-400 hover:text-white">
                  APIs
                </a>
              </li>
              <li>
                <a href="/#games" className="text-slate-400 hover:text-white">
                  Games
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
              Company
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/#why-choose-us" className="text-slate-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#get-in-touch" className="text-slate-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
              Our Services
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>Platform Development</li>
              <li>API Integration</li>
              <li>Payment Solutions</li>
              <li>Digital Marketing</li>
            </ul>
          </div>

          <div className="w-full max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
              Follow Us
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              <SocialIcon href="#" label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Telegram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          © 2024 Orange. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
