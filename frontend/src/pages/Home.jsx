export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-md border border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Welcome home
        </h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          This is a React + Vite app styled with Tailwind CSS and routed with
          React Router. Use the navigation above to explore the site.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
            Vite
          </span>
          <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800">
            React
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
            Tailwind
          </span>
        </div>
      </div>
    </div>
  );
}
