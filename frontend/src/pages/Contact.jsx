export default function Contact() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-md border border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Contact
        </h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          Reach out through your preferred channel. This page is a placeholder
          you can wire to a form or API later.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </p>
            <p className="mt-1 font-medium text-slate-900">hello@example.com</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Hours
            </p>
            <p className="mt-1 font-medium text-slate-900">Mon–Fri, 9–5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
