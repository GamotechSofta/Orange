import { useState } from "react";

export default function ContactForm({ className = "" }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <input
        name="name"
        type="text"
        required
        placeholder="Name"
        autoComplete="name"
        className="min-h-[48px] w-full touch-manipulation rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        autoComplete="email"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20"
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone"
        autoComplete="tel"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20"
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Message"
        className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20"
      />
      <button
        type="submit"
        className="min-h-[48px] w-full touch-manipulation rounded-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-green-500/30"
      >
        Submit
      </button>
      {sent && (
        <p className="text-center text-xs text-emerald-400" role="status">
          Thanks — we&apos;ll get back to you shortly.
        </p>
      )}
    </form>
  );
}
