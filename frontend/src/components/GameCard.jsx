/**
 * Game tile: image with theme glow, title, description (centered).
 * @param {string} title
 * @param {string} description
 * @param {string} imageSrc
 * @param {string} imageAlt
 * @param {string} glowClasses Tailwind gradient stops for overlay (e.g. from-red-500/35 via-red-500/10)
 */
export default function GameCard({ title, description, imageSrc, imageAlt, glowClasses }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111622]/95 shadow-lg backdrop-blur-md transition duration-300 hover:border-white/20">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#0B0F19]">
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t ${glowClasses} to-transparent opacity-[0.85]`}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_85%,rgba(0,0,0,0.15),transparent_55%)]"
        />
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-white/5 px-3 py-3 text-center sm:px-4 sm:py-4">
        <h3 className="text-sm font-bold leading-snug text-white sm:text-base">{title}</h3>
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400 sm:mt-2 sm:text-xs sm:leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}
