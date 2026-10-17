import { type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { education, employer, employerYears, impact, profile } from "@/profile";
import { GhostLink, LinkedInIcon, PrimaryLink, mailto } from "./ui";

const [iim] = education;
const chips = [
  { big: `₹${impact.mxc.amount} Cr+`, small: `${impact.mxc.short} sponsorships`, pos: "xl:left-0 xl:top-[14%]", delay: 1.3 },
  { big: `$${impact.cec.amount}K+`, small: `${impact.cec.short} sponsorships`, pos: "xl:right-0 xl:top-[18%]", delay: 1.45 },
  { big: `${profile.athlete.medals}+`, small: "medals · international athlete", pos: "xl:left-[1%] xl:bottom-0", delay: 1.6, gold: true },
  { big: iim.short, small: `${iim.degree} · ${iim.years.replace(/ /g, "")}`, pos: "xl:right-[1%] xl:bottom-[3%]", delay: 1.75 },
];

/** Slow-moving colour fields behind the hero, plus grain and a faint grid. */
function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="animate-drift-a absolute -top-[20%] -left-[10%] size-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(200,111,168,0.38),transparent)] blur-3xl" />
      <div className="animate-drift-b absolute -top-[10%] -right-[20%] size-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(124,111,224,0.34),transparent)] blur-3xl" />
      <div className="animate-drift-c absolute -bottom-[35%] left-[20%] size-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(242,169,126,0.22),transparent)] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(231,159,195,0.10), transparent 60%)`;
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const letters = Array.from(profile.name);
  const letter = {
    hidden: { y: "0.5em", opacity: 0, filter: "blur(12px)" },
    show: { y: "0em", opacity: 1, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 110, damping: 18 } },
  };
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" aria-labelledby="hero-title" onPointerMove={onMove} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24">
      <Aurora />
      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-5 text-center sm:px-6">
        <motion.p
          {...fade(0.1)}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[13px] font-semibold text-mute backdrop-blur"
        >
          <span className="relative flex size-2" aria-hidden>
            <span className="animate-ping-slow absolute inline-flex size-full rounded-full bg-orchid/60" />
            <span className="relative inline-flex size-2 rounded-full bg-orchid" />
          </span>
          {profile.title} · {employer.company}
        </motion.p>

        <motion.h1
          id="hero-title"
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } } }}
          className="mx-auto mt-7 font-serif text-[78px] leading-[0.88] tracking-[-0.03em] text-ivory sm:text-[112px] lg:text-[156px]"
        >
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden>
            {letters.map((ch, i) =>
              ch === " " ? (
                <span key={i} className="block sm:inline-block sm:w-[0.24em]" />
              ) : (
                <motion.span key={i} variants={letter} className="inline-block">
                  {ch}
                </motion.span>
              ),
            )}
          </span>
        </motion.h1>

        <motion.p {...fade(0.9)} className="mt-5 font-serif text-[30px] leading-tight text-ivory/90 sm:text-[44px] lg:text-[52px]">
          Strategy &amp; <em className="text-gradient animate-shine">transformation</em> lead
        </motion.p>

        <motion.p {...fade(1.05)} className="mx-auto mt-6 max-w-2xl text-[16.5px] leading-relaxed text-mute sm:text-[18px]">
          {employerYears}+ years at {employer.company}, setting up and running governance for CEO/CTO-level agendas, and delivering two experience-centre programmes
          end-to-end.
        </motion.p>

        <motion.div {...fade(1.2)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <PrimaryLink href={mailto}>Get in touch</PrimaryLink>
          <GhostLink href="#journey">View journey</GhostLink>
          <GhostLink href={profile.linkedin} external ariaLabel="LinkedIn profile (opens in a new tab)" className="w-12 justify-center px-0">
            <LinkedInIcon size={17} />
          </GhostLink>
        </motion.div>

        {/* stat chips: floating around the name on wide screens, a tidy grid below on small ones */}
        <div className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-2.5 xl:contents">
          {chips.map((c) => (
            <motion.div
              key={c.small}
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: c.delay }}
              className={cn("xl:absolute", c.pos)}
            >
              <div
                className="animate-float rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left shadow-[0_20px_50px_-25px_rgba(0,0,0,0.9)] backdrop-blur-xl xl:px-5 xl:py-4"
                style={{ animationDelay: `${c.delay * 1.7}s` }}
              >
                <p className={cn("font-serif text-[26px] leading-none xl:text-[32px]", c.gold ? "text-gradient-gold" : "text-ivory")}>{c.big}</p>
                <p className="mt-1.5 text-[12px] font-semibold text-dim">{c.small}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.a
        href="#impact"
        {...fade(1.9)}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-dim uppercase sm:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent to-orchid"
            animate={reduce ? undefined : { y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

export function KeywordBand() {
  return (
    <section aria-label="Core skills" className="relative border-y border-white/[0.07] bg-night-2/60 py-6">
      <Marquee pauseOnHover repeat={3} className="[--duration:46s] [--gap:2.5rem] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {profile.coreSkills.map((s) => (
          <span key={s} className="flex items-center gap-10 font-serif text-[28px] whitespace-nowrap text-ivory/85 italic sm:text-[34px]">
            {s}
            <span className="text-gradient text-[20px] not-italic" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
