import { MotionConfig } from "motion/react";
import { Contact, Footer } from "./sections/Contact";
import { Experience, OrgBand } from "./sections/Experience";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Impact } from "./sections/Impact";
import { ProfileBento } from "./sections/Profile";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh overflow-x-clip bg-mist text-ink">
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-[14px] font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Hero />
          <OrgBand />
          <Impact />
          <Experience />
          <ProfileBento />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
