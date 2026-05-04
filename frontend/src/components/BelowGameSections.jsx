import {
  Activity,
  Building2,
  Check,
  Headphones,
  Megaphone,
  Shield,
  Zap,
} from "lucide-react";
import ContactForm from "./ContactForm.jsx";

const why = [
  {
    title: "High Performance",
    Icon: Zap,
    box: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/40",
  },
  {
    title: "Real-time Data",
    Icon: Activity,
    box: "bg-amber-500/15 text-amber-400 ring-amber-500/40",
  },
  {
    title: "Secure & Reliable",
    Icon: Shield,
    box: "bg-violet-500/15 text-violet-400 ring-violet-500/40",
  },
  {
    title: "24/7 Support",
    Icon: Headphones,
    box: "bg-purple-500/15 text-purple-400 ring-purple-500/40",
  },
];

const marketing = [
  "SEO Optimization",
  "Social Media Marketing",
  "Paid Ads",
  "Branding",
];

/** Vertical sections: Why Choose → Marketing → About → Contact (formerly sidebar). */
export default function BelowGameSections() {
  return (
    <div className="space-y-4 pb-8 md:space-y-6">
      <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-xl backdrop-blur-md sm:p-5 md:p-6">
        <h2 className="text-center text-lg font-bold leading-snug text-white md:text-left">
          Why Choose Us
        </h2>
        <div className="mx-auto mt-5 grid max-w-xl grid-cols-2 gap-3 sm:max-w-2xl md:mx-0">
          {why.map(({ title, Icon, box }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center transition-all duration-300 hover:scale-105 hover:border-emerald-500/40 hover:shadow-green-500/20"
            >
              <span
                className={`mx-auto flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${box}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <p className="mt-2 text-xs font-semibold text-white">{title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-xl backdrop-blur-md sm:p-5 md:p-6">
        <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <div
            className="mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-500/20 ring-1 ring-purple-500/40 sm:mx-0"
            aria-hidden
          >
            <Megaphone className="h-7 w-7 text-purple-300" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-white">Digital Marketing &amp; Promotion</h2>
            <ul className="mx-auto mt-4 max-w-md space-y-2.5 sm:mx-0">
              {marketing.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-center gap-2.5 text-sm text-slate-300 sm:justify-start"
                >
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="about-company"
        className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-xl backdrop-blur-md sm:p-5 md:p-6"
      >
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/25 sm:mx-0">
            <Building2 className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">About</h2>
            <ul className="mx-auto mt-3 max-w-xs space-y-2 sm:mx-0">
              <li className="flex items-center justify-center gap-2 text-sm text-slate-300 sm:justify-start">
                <Check className="h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2.5} />
                5+ years experience
              </li>
              <li className="flex items-center justify-center gap-2 text-sm text-slate-300 sm:justify-start">
                <Check className="h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2.5} />
                50+ projects
              </li>
              <li className="flex items-center justify-center gap-2 text-sm text-slate-300 sm:justify-start">
                <Check className="h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2.5} />
                Expert developers
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="get-in-touch"
        className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-xl ring-1 ring-emerald-500/20 backdrop-blur-md sm:p-5 md:p-6"
      >
        <h2 className="text-center text-lg font-bold text-white md:text-left">Contact Form</h2>
        <div className="mx-auto mt-6 max-w-xl md:mx-0">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
