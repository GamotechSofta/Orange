import Hero from "../components/Hero.jsx";
import PlatformSection from "../components/PlatformSection.jsx";
import ApiSection from "../components/ApiSection.jsx";
import GameSection from "../components/GameSection.jsx";
import BelowGameSections from "../components/BelowGameSections.jsx";
import { pageShell } from "../constants/layout.js";

export default function Home() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.08),transparent)]" />
      <Hero />
      <div className={`relative ${pageShell}`}>
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          <PlatformSection />
          <ApiSection />
          <GameSection />
          <BelowGameSections />
        </div>
      </div>
    </div>
  );
}
