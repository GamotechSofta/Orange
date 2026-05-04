import GameCard from "./GameCard.jsx";

const games = [
  "Roulette Game",
  "Bingo Game",
  "Teen Patti Game",
  "Andar Bahar Game",
  "Gali Desawar Game",
];

export default function GameSection() {
  return (
    <section id="games" className="scroll-mt-28">
      <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
        Our <span className="text-emerald-400">Game</span> Development
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {games.map((title) => (
          <GameCard key={title} title={title} />
        ))}
      </div>
    </section>
  );
}
