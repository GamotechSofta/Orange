import { ArrowRight, Mail, MessageSquare, Phone, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { submitWeb3Form } from "../lib/web3forms.js";

const inputBase =
  "w-full min-h-[48px] rounded-xl border border-white/10 bg-[#0a0f18]/95 px-4 py-2.5 text-sm text-white shadow-inner shadow-black/20 outline-none backdrop-blur-sm transition placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400";

/**
 * Quick contact modal (navbar or page CTA). Submits to Web3Forms using the given access key.
 */
export default function GetInTouchModal({
  isOpen,
  onClose,
  accessKey,
  title = "Get in touch",
  description = "Fill in your details and we will get back to you.",
  subject = "Website — Get in touch",
  variant = "contact",
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setError("");
    setLoading(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const primaryClass =
    variant === "cta"
      ? "rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_22px_-4px_rgba(139,92,246,0.55)] transition hover:scale-[1.02] disabled:opacity-50"
      : "rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-6 py-3 text-sm font-bold text-[#0B0F19] shadow-[0_0_24px_rgba(52,211,153,0.35)] transition hover:scale-[1.02] disabled:opacity-50";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await submitWeb3Form(accessKey, {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        subject,
      });
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={(ev) => {
        if (ev.target === ev.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="git-modal-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0B0F19] p-6 shadow-2xl shadow-black/50 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <h2 id="git-modal-title" className="pr-10 text-xl font-bold text-white sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-400">{description}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
              <label htmlFor="git-name" className={labelClass}>
                Full name
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  id="git-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="John Doe"
                  className={`${inputBase} pl-11`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="git-email" className={labelClass}>
                Email
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  id="git-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={`${inputBase} pl-11`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="git-phone" className={labelClass}>
                Phone <span className="font-normal normal-case text-slate-500">(optional)</span>
              </label>
              <div className="relative">
                <Phone
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  id="git-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="+91 00000 00000"
                  className={`${inputBase} pl-11`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="git-message" className={labelClass}>
                Message
              </label>
              <div className="relative">
                <MessageSquare
                  className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-500"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <textarea
                  id="git-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className={`${inputBase} min-h-[120px] resize-y pl-11 pt-3.5`}
                />
              </div>
            </div>

            {error ? (
              <p className="rounded-lg border border-rose-500/35 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
                {error}
              </p>
            ) : null}

            <button type="submit" disabled={loading} className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 ${primaryClass}`}>
              {loading ? "Sending…" : "Send message"}
              {!loading ? <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden /> : null}
            </button>
          </form>
      </div>
    </div>
  );
}
