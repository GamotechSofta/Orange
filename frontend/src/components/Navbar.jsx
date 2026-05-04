import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  [
    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
    isActive
      ? "bg-orange-600 text-white shadow-sm"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
          <NavLink
            to="/"
            className="text-lg font-semibold text-orange-600 tracking-tight shrink-0"
          >
            Orange
          </NavLink>
          <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            <li>
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
