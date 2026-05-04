import {
  Activity,
  Building2,
  Check,
  Headphones,
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

const marketingItems = [
  "Website SEO",
  "Social Media Marketing",
  "Result Promotion",
  "Paid Advertising",
  "Brand Building",
];

/** Vertical sections: Marketing → Why Choose → About → Contact (formerly sidebar). */
export default function BelowGameSections() {
  return (
    <div className="space-y-4 pb-8 md:space-y-6">
      <section
        id="digital-marketing"
        className="relative scroll-mt-28 min-h-[380px] overflow-hidden rounded-2xl border border-white/10 shadow-xl ring-1 ring-white/[0.06] sm:min-h-[400px] lg:min-h-[400px]"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[#030508] bg-[url('/images/digital-marketing-bg.png')] bg-cover bg-[position:70%_center] sm:bg-[position:72%_center] lg:bg-right"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#050810] via-[#050810]/92 to-[#050810]/35 sm:via-[#050810]/85 sm:to-[#050810]/20 lg:via-[#050810]/78 lg:to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(52,211,153,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.08)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div className="relative z-10 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-11 lg:max-w-[min(100%,540px)] lg:px-10 lg:py-9 lg:pb-7 xl:max-w-xl">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.35rem]">
              Digital{" "}
              <span className="text-emerald-400 drop-shadow-[0_0_18px_rgba(52,211,153,0.45)]">
                Marketing
              </span>{" "}
              <span className="text-white">&amp; Promotion</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base lg:mx-0">
              We help you grow your platform with result promotion, SEO, social media marketing,
              branding and user acquisition.
            </p>
            <ul className="mx-auto mt-8 max-w-md space-y-3.5 text-left sm:max-w-lg lg:mx-0">
              {marketingItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium text-slate-100 sm:text-[0.95rem]"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                    strokeWidth={2.75}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
