import { Briefcase, Check, Headphones, Timer, Users } from "lucide-react";
import ContactForm from "./ContactForm.jsx";

const whyChoosePoints = [
  "Expert Developers",
  "On-time Delivery",
  "Custom Solutions",
  "End-to-End Support",
];

const marketingItems = [
  "Website SEO",
  "Social Media Marketing",
  "Result Promotion",
  "Paid Advertising",
  "Brand Building",
];

const trustStats = [
  {
    n: "5+",
    label: "Years Experience",
    Icon: Timer,
    cardBorder: "border-amber-500/30 hover:border-amber-500/45",
    iconWrap:
      "bg-amber-500/10 text-amber-400 ring-amber-500/40 shadow-[0_0_16px_-4px_rgba(245,158,11,0.35)]",
  },
  {
    n: "50+",
    label: "Projects Completed",
    Icon: Briefcase,
    cardBorder: "border-emerald-500/30 hover:border-emerald-500/45",
    iconWrap:
      "bg-emerald-500/10 text-emerald-400 ring-emerald-500/40 shadow-[0_0_16px_-4px_rgba(52,211,153,0.3)]",
  },
  {
    n: "100+",
    label: "Happy Clients",
    Icon: Users,
    cardBorder: "border-blue-500/30 hover:border-blue-500/45",
    iconWrap:
      "bg-blue-500/10 text-blue-400 ring-blue-500/40 shadow-[0_0_16px_-4px_rgba(59,130,246,0.3)]",
  },
  {
    n: "24/7",
    label: "Customer Support",
    Icon: Headphones,
    cardBorder: "border-rose-500/30 hover:border-rose-500/45",
    iconWrap:
      "bg-rose-500/10 text-rose-400 ring-rose-500/40 shadow-[0_0_16px_-4px_rgba(244,63,94,0.3)]",
  },
];

/** Vertical sections: Trust stats → Marketing → About BettingSolutions → Contact. */
export default function BelowGameSections() {
  return (
    <div className="space-y-4 pb-8 md:space-y-6">
      <section aria-label="Company highlights" className="px-0 pb-1 pt-0 sm:pb-2 md:pb-3">
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3 lg:gap-4">
          {trustStats.map(({ n, label, Icon, cardBorder, iconWrap }) => (
            <div
              key={label}
              className={`flex min-w-0 items-center gap-2.5 rounded-xl border bg-transparent px-2.5 py-2.5 transition md:gap-3 md:px-3 md:py-3 ${cardBorder}`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 md:h-11 md:w-11 ${iconWrap}`}
              >
                <Icon className="h-[18px] w-[18px] md:h-5 md:w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold leading-none text-white md:text-base">{n}</p>
                <p className="mt-1 text-[10px] font-medium leading-snug text-slate-400 md:text-xs">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

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

      <section
        id="why-choose-us"
        className="relative scroll-mt-28 min-h-[380px] overflow-hidden rounded-2xl border border-white/10 shadow-xl ring-1 ring-white/[0.06] sm:min-h-[400px] lg:min-h-[400px]"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[#030508] bg-[url('/images/why-choose-bg.png')] bg-cover bg-[position:72%_center] sm:bg-[position:75%_center] lg:bg-right"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#060912] via-[#060912]/94 to-[#060912]/30 sm:via-[#060912]/88 sm:to-[#060912]/18 lg:via-[#060912]/72 lg:to-transparent"
        />
        <div className="relative z-10 px-4 py-8 sm:px-6 sm:py-9 md:px-8 lg:max-w-[min(100%,520px)] lg:px-10 lg:py-9 lg:pb-8 xl:max-w-xl">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.15rem]">
              About{" "}
              <span className="text-lime-400 drop-shadow-[0_0_18px_rgba(163,230,53,0.4)]">
                BettingSolutions
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm font-normal leading-relaxed text-white/90 sm:text-base lg:mx-0">
              We build advanced gaming and betting platforms with proven technology, clear delivery, and
              dedicated support—so you can launch faster and scale with confidence.
            </p>
            <ul className="mx-auto mt-8 max-w-md space-y-4 text-left sm:max-w-lg lg:mx-0">
              {whyChoosePoints.map((item) => (
                <li key={item} className="flex items-center gap-3.5 text-sm font-medium text-white sm:text-[0.95rem]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-500 shadow-[0_0_14px_rgba(132,204,22,0.45)]">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="get-in-touch"
        className="scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0c101c]/95 to-[#070a10] p-5 shadow-xl ring-1 ring-emerald-500/20 backdrop-blur-md sm:p-6 md:p-8"
      >
        <div className="mx-auto max-w-xl md:mx-0">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-white md:text-left md:text-[1.65rem]">
            Get in{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400 md:text-left">
            Share your details and we&apos;ll respond as soon as possible.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
