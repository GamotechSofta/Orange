/**
 * Seeds the database with the homepage content (Platforms, API services, Games).
 * Run:
 *   npm run seed         # insert / refresh
 *   npm run seed -- --reset   # wipe collections first
 */
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Platform = require("../models/Platform");
const ApiService = require("../models/ApiService");
const Game = require("../models/Game");

const platforms = [
  {
    title: "Satta Matka Platform Development",
    description:
      "Custom Satta Matka Software with panel, result, chart, jodi, panel management and more.",
    iconName: "ShipWheel",
    iconClass: "text-emerald-400",
    glowTop: "from-emerald-500/35 via-emerald-500/10",
    gradient:
      "from-emerald-500/[0.07] via-emerald-500/[0.02] to-transparent dark:from-emerald-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(34,197,94,0.16)]",
    borderHover: "hover:border-emerald-500/35",
    linkClass: "text-emerald-400 hover:text-emerald-300",
    order: 1,
  },
  {
    title: "Betting Platform Development",
    description:
      "Full-featured betting platform for sports, casino, virtual games with multi-device support.",
    iconName: "Trophy",
    iconClass: "text-purple-400",
    glowTop: "from-purple-500/35 via-purple-500/10",
    gradient:
      "from-purple-500/[0.07] via-purple-500/[0.02] to-transparent dark:from-purple-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(168,85,247,0.16)]",
    borderHover: "hover:border-purple-500/40",
    linkClass: "text-purple-400 hover:text-purple-300",
    order: 2,
  },
  {
    title: "Cricket Exchange Software",
    description:
      "Advanced cricket exchange software with back/lay, fancy market, admin panel and more.",
    iconName: "CricketStrokeIcon",
    iconClass: "text-amber-400",
    glowTop: "from-amber-500/35 via-amber-500/10",
    gradient:
      "from-amber-500/[0.07] via-amber-500/[0.02] to-transparent dark:from-amber-500/10",
    glow: "shadow-[0_0_22px_-10px_rgba(245,158,11,0.16)]",
    borderHover: "hover:border-amber-500/40",
    linkClass: "text-amber-400 hover:text-amber-300",
    order: 3,
  },
];

const apiServices = [
  {
    title: "Casino API",
    description: "Integrate 1000+ casino games in your platform.",
    iconName: "Dices",
    iconColorClass: "text-purple-400",
    glow: "purple",
    mobileTopFade: "from-purple-500/30",
    ctaClass: "text-purple-400 hover:text-purple-300",
    order: 1,
  },
  {
    title: "Score API",
    description: "Live score, lineups, commentary & more.",
    iconName: "ClipboardList",
    iconColorClass: "text-emerald-400",
    glow: "emerald",
    mobileTopFade: "from-emerald-500/30",
    ctaClass: "text-emerald-400 hover:text-emerald-300",
    order: 2,
  },
  {
    title: "Odds API",
    description: "Real-time odds for cricket, tennis, soccer.",
    iconName: "Crosshair",
    iconColorClass: "text-orange-400",
    glow: "orange",
    mobileTopFade: "from-orange-500/30",
    ctaClass: "text-orange-400 hover:text-orange-300",
    order: 3,
  },
  {
    title: "Fancy API",
    description: "Session fancy, player fancy, over fancy.",
    iconName: "Trophy",
    iconColorClass: "text-fuchsia-400",
    glow: "fuchsia",
    mobileTopFade: "from-fuchsia-500/30",
    ctaClass: "text-fuchsia-400 hover:text-fuchsia-300",
    order: 4,
  },
  {
    title: "Fancy & Bookmaker API",
    description: "Bookmaker & fancy market integration.",
    iconName: "CodeXml",
    iconColorClass: "text-blue-400",
    glow: "blue",
    mobileTopFade: "from-blue-500/30",
    ctaClass: "text-blue-400 hover:text-blue-300",
    order: 5,
  },
  {
    title: "Sports Result API",
    description: "Fast & accurate sports results API.",
    iconName: "Disc3",
    iconColorClass: "text-teal-400",
    glow: "teal",
    mobileTopFade: "from-teal-500/30",
    ctaClass: "text-teal-400 hover:text-teal-300",
    order: 6,
  },
  {
    title: "TV API",
    description: "Live TV streaming API for sports & events.",
    iconName: "Tv",
    iconColorClass: "text-violet-400",
    glow: "violet",
    mobileTopFade: "from-violet-500/30",
    ctaClass: "text-violet-400 hover:text-violet-300",
    order: 7,
  },
  {
    title: "Betfair API",
    description: "Integrate Betfair markets & data.",
    iconName: "Network",
    iconColorClass: "text-amber-300",
    glow: "gold",
    mobileTopFade: "from-amber-400/35",
    ctaClass: "text-amber-300 hover:text-amber-200",
    order: 8,
  },
];

const games = [
  {
    title: "Roulette Game",
    description: "Classic roulette game with real casino experience.",
    imageSrc: "/images/roulette-game.png",
    imageAlt: "Luxury casino roulette wheel with chips and betting grid",
    glowClasses: "from-emerald-500/35 via-amber-500/20",
    order: 1,
  },
  {
    title: "Bingo Game",
    description: "Exciting bingo game with multiple variations.",
    imageSrc: "/images/bingo-game.png",
    imageAlt: "Colorful bingo balls and bingo cards on a glowing blue background",
    glowClasses: "from-blue-500/40 via-indigo-500/20",
    order: 2,
  },
  {
    title: "Teen Patti Game",
    description: "Most popular card game loved by millions.",
    imageSrc: "/images/teen-patti-game.png",
    imageAlt: "Teen Patti playing cards, chips and gold lettering on a red casino table",
    glowClasses: "from-red-600/45 via-amber-500/25",
    order: 3,
  },
  {
    title: "Andar Bahar Game",
    description: "Simple, fast & thrilling andar bahar game.",
    imageSrc: "/images/andar-bahar-game.png",
    imageAlt:
      "Andar Bahar game branding with Andar and Bahar sides, chips and purple gold casino theme",
    glowClasses: "from-violet-500/40 via-amber-500/25",
    order: 4,
  },
  {
    title: "Gali Desawar Game",
    description: "Gali desawar satta game with result & chart.",
    imageSrc: "/images/gali-desawar-game.png",
    imageAlt:
      "Gali Desawar game with live result panels, numbered balls and gold crown branding",
    glowClasses: "from-amber-400/45 via-yellow-600/20",
    order: 5,
  },
];

/**
 * Upsert by `title` so re-running the seeder is safe and won't create duplicates.
 */
async function upsertMany(Model, docs) {
  const ops = docs.map((doc) => ({
    updateOne: {
      filter: { title: doc.title },
      update: { $set: { active: true, ...doc } },
      upsert: true,
    },
  }));
  return Model.bulkWrite(ops);
}

(async () => {
  try {
    await connectDB();

    const reset = process.argv.includes("--reset");
    if (reset) {
      await Promise.all([
        Platform.deleteMany({}),
        ApiService.deleteMany({}),
        Game.deleteMany({}),
      ]);
      console.log("[seed] Cleared Platform / ApiService / Game collections");
    }

    const [p, a, g] = await Promise.all([
      upsertMany(Platform, platforms),
      upsertMany(ApiService, apiServices),
      upsertMany(Game, games),
    ]);

    console.log(
      `[seed] Platforms  -> upserted ${p.upsertedCount}, modified ${p.modifiedCount}`
    );
    console.log(
      `[seed] ApiSvc     -> upserted ${a.upsertedCount}, modified ${a.modifiedCount}`
    );
    console.log(
      `[seed] Games      -> upserted ${g.upsertedCount}, modified ${g.modifiedCount}`
    );

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("[seed] Failed:", err);
    process.exit(1);
  }
})();
