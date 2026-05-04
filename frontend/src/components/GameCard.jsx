export default function GameCard({ title }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-emerald-500/30 hover:shadow-green-500/30">
      <div className="flex h-40 w-full items-center justify-center rounded-t-xl bg-gray-800 text-gray-500">
        Image
      </div>
      <div className="border-t border-white/5 bg-[#0B0F19]/80 px-4 py-4 text-center">
        <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
      </div>
    </article>
  );
}
