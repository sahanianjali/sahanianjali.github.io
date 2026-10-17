import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { employer, employerYears, fmtDuration, fmtRange, inWords, monthsBetween, type Role } from "@/profile";
import { SectionHead } from "./ui";

const chapters = [...employer.roles].reverse(); // oldest first: the story builds to today

/** One chapter card. On large screens the cards stick and stack as you scroll. */
function Chapter({ r, i, progress }: { r: Role; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const n = chapters.length;
  // Earlier cards ease back a little as later ones slide over them.
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.035]);
  const current = !r.end;

  return (
    <div className="lg:sticky" style={{ top: `${104 + i * 28}px` }}>
      <motion.article
        style={reduce ? undefined : { scale }}
        className={cn(
          "relative origin-top overflow-hidden rounded-[32px] border p-7 sm:p-10",
          current
            ? "border-orchid/30 bg-[linear-gradient(140deg,rgba(231,159,195,0.16),rgba(124,111,224,0.12)_45%,rgba(20,17,31,0.92)_80%)]"
            : "border-white/[0.08] bg-[linear-gradient(140deg,rgba(255,255,255,0.06),rgba(20,17,31,0.95)_55%)]",
          "shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl",
        )}
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-serif text-[20px] text-dim italic">Chapter</span>
              <span className="text-gradient font-serif text-[44px] leading-none">0{i + 1}</span>
              {current && (
                <span className="ml-1 rounded-full border border-orchid/40 bg-orchid/10 px-3 py-1 text-[12px] font-bold text-orchid">Current</span>
              )}
            </div>
            <h3 className="mt-6 font-serif text-[38px] leading-[1] text-ivory sm:text-[48px]">{r.title}</h3>
            {r.team && <p className="mt-3 text-[15px] font-semibold text-ivory/85">{r.team}</p>}
            <p className="mt-3 text-[14px] font-semibold text-dim">
              {fmtRange(r.start, r.end)} · {fmtDuration(monthsBetween(r.start, r.end))}
            </p>
          </div>
          {r.highlights && (
            <ul className="space-y-3.5">
              {r.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-mute">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-gradient-to-br from-peach to-orchid" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.article>
    </div>
  );
}

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="journey" aria-labelledby="journey-title" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead eyebrow={`Journey · ${employer.company}`} sub={`Since July 2021, from sales strategy to running governance for the CEO and CTO.`}>
          <span id="journey-title">
            <span className="capitalize">{inWords(employerYears)}</span> years, <em className="text-gradient">{inWords(chapters.length)} chapters.</em>
          </span>
        </SectionHead>
        <div ref={ref} className="relative mt-14 space-y-5 lg:space-y-10 lg:pb-16">
          {chapters.map((r, i) => (
            <Chapter key={r.title} r={r} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
