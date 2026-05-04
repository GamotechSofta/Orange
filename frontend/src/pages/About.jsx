export default function About() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-md border border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          About
        </h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          We built this starter to demonstrate a clean layout: shared navbar,
          responsive spacing, and simple page components you can extend for your
          own product.
        </p>
        <ul className="mt-6 space-y-2 text-slate-700 list-disc list-inside sm:list-outside sm:pl-5">
          <li>Functional components and hooks-ready structure</li>
          <li>Mobile-first responsive design with Tailwind</li>
          <li>Client-side routing with React Router</li>
        </ul>
      </div>
    </div>
  );
}
