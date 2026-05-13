import { ArrowRight, CheckCircle2, Mail, MessageSquare, Phone, User } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/api.js";
import { getWeb3ContactKey, submitWeb3Form } from "../lib/web3forms.js";

const inputBase =
  "w-full min-h-[50px] rounded-xl border border-white/10 bg-[#0a0f18]/90 px-4 py-3 text-sm text-white shadow-inner shadow-black/20 outline-none backdrop-blur-sm transition placeholder:text-slate-500 focus:border-emerald-500/50 focus:bg-[#0a0f18] focus:ring-2 focus:ring-emerald-500/20";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400";

export default function ContactForm({ className = "" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();

    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      await submitWeb3Form(getWeb3ContactKey(), {
        name,
        email,
        phone,
        message,
        subject: "Contact section — Get in touch",
      });
      try {
        await api.saveLeadMessage({
          fullName: name,
          email,
          phone,
          message,
          category: "contact",
        });
      } catch (syncErr) {
        console.warn("[messages] Could not save copy to server:", syncErr?.message || syncErr);
      }
      form.reset();
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full name
          </label>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              strokeWidth={1.75}
              aria-hidden
            />
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              autoComplete="name"
              className={`${inputBase} pl-11`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              strokeWidth={1.75}
              aria-hidden
            />
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              autoComplete="email"
              className={`${inputBase} pl-11`}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Phone <span className="font-normal normal-case text-slate-500">(optional)</span>
        </label>
        <div className="relative">
          <Phone
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            strokeWidth={1.75}
            aria-hidden
          />
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+91 00000 00000"
            autoComplete="tel"
            className={`${inputBase} pl-11`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <div className="relative">
          <MessageSquare
            className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-500"
            strokeWidth={1.75}
            aria-hidden
          />
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project or requirements…"
            className={`${inputBase} min-h-[140px] resize-y pl-11 pt-3.5`}
          />
        </div>
      </div>

      {error ? (
        <div
          className="rounded-xl border border-rose-500/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex min-h-[52px] w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-6 py-3 text-sm font-bold text-[#0B0F19] shadow-[0_0_24px_rgba(52,211,153,0.35)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(52,211,153,0.45)] active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send message"}
        {!loading ? (
          <ArrowRight
            className="h-4 w-4 transition group-hover:translate-x-0.5"
            strokeWidth={2.5}
            aria-hidden
          />
        ) : null}
      </button>

      {success ? (
        <div
          className="flex gap-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-4 text-left"
          role="status"
        >
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" strokeWidth={2} aria-hidden />
          <div>
            <p className="font-semibold text-emerald-100">Your message has been submitted.</p>
            <p className="mt-1 text-sm text-emerald-100/80">We&apos;ll reply shortly.</p>
          </div>
        </div>
      ) : null}
    </form>
  );
}
