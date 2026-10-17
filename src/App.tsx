import { MotionConfig } from "motion/react";
import { Contact, Footer } from "./sections/Contact";
import { Foundations } from "./sections/Foundations";
import { Header } from "./sections/Header";
import { Hero, KeywordBand } from "./sections/Hero";
import { Impact } from "./sections/Impact";
import { Journey } from "./sections/Journey";
import { Recognition } from "./sections/Recognition";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-dvh overflow-x-clip bg-night text-ivory">
        <a
          href="#main"
          className="sr-only rounded-full bg-ivory px-4 py-2 text-[14px] font-semibold text-night focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>
        <div className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-overlay" aria-hidden />
        <Header />
        <main id="main">
          <Hero />
          <KeywordBand />
          <Impact />
          <Journey />
          <Recognition />
          <Foundations />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
