import { motion, useReducedMotion } from "motion/react";
import { Award, Medal, Star, Trophy } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { employer, profile } from "@/profile";
import { Glass, Reveal, SectionHead, label } from "./ui";

const awardIcons = [Trophy, Award, Star];

/** A gold ring that draws itself once, with the medal count inside. */
function MedalRing() {
  const reduce = useReducedMotion();
  const ticks = Array.from({ length: 60 });
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px]">
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="gold-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBE3B0" />
            <stop offset="55%" stopColor="#F3C77B" />
            <stop offset="100%" stopColor="#D99B4C" />
          </linearGradient>
        </defs>
        {ticks.map((_, i) => {
          const a = (i / ticks.length) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 92}
              y1={100 + Math.sin(a) * 92}
              x2={100 + Math.cos(a) * (i % 5 === 0 ? 86 : 89)}
              y2={100 + Math.sin(a) * (i % 5 === 0 ? 86 : 89)}
              stroke="rgba(255,255,255,0.14)"
              strokeWidth={1}
            />
          );
        })}
        <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
        <motion.circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="url(#gold-ring)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <Medal size={22} className="mx-auto text-gold" aria-hidden />
          <p className="mt-2 flex items-baseline justify-center font-serif text-[76px] leading-none">
            <NumberTicker value={profile.athlete.medals} className="text-gradient-gold" />
            <span className="text-gradient-gold text-[40px]">+</span>
          </p>
          <p className="mt-1 text-[13px] font-semibold tracking-[0.14em] text-dim uppercase">medals</p>
        </div>
      </div>
    </div>
  );
}

export function Recognition() {
  return (
    <section id="recognition" aria-labelledby="recognition-title" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute top-1/3 left-0 -z-10 size-[42vmax] rounded-full bg-[radial-gradient(closest-side,rgba(243,199,123,0.10),transparent)] blur-3xl" aria-hidden />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead eyebrow="Recognition">
          <span id="recognition-title">
            Awarded at work. <em className="text-gradient-gold">Medalled beyond it.</em>
          </span>
        </SectionHead>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Glass className="h-full" glow="rgba(243,199,123,0.12)">
              <div className="p-7 sm:p-9">
                <p className={label}>Awards at {employer.company}</p>
                <ul className="mt-6 divide-y divide-white/[0.07]">
                  {profile.awards.map((a, i) => {
                    const Icon = awardIcons[i];
                    return (
                      <li key={a.name} className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                        <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-gold/25 bg-gold/[0.08] text-gold">
                          <Icon size={22} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-[30px] leading-none text-ivory sm:text-[36px]">{a.name}</p>
                          <p className="mt-1.5 text-[14px] font-semibold text-mute">
                            {a.detail}
                            <span className="text-dim sm:hidden">
                              {a.detail && " · "}
                              {a.when}
                            </span>
                          </p>
                        </div>
                        <p className="hidden shrink-0 text-right text-[14px] font-semibold text-dim tabular-nums sm:block">{a.when}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Glass>
          </Reveal>

          <Reveal delay={0.08}>
            <Glass className="h-full" glow="rgba(243,199,123,0.14)">
              <div className="flex h-full flex-col p-7 sm:p-9">
                <p className={label}>International athlete</p>
                <div className="my-8 flex-1">
                  <MedalRing />
                </div>
                <p className="text-center text-[15px] leading-relaxed text-mute">
                  {profile.athlete.medals}+ medals as an athlete, {profile.athlete.years}.
                </p>
              </div>
            </Glass>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
