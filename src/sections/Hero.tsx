import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BriefcaseBusiness, GraduationCap, Medal, Trophy } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import { NOW, education, employer, employerYears, impact, profile, type YM } from "@/profile";
import { Chip, EmailCTA, LinkedInIcon, OpenDot, ring } from "./ui";

/* ------------------------------------------------------- career chart maths */

const t = (ym: YM) => (ym.y - employer.start.y) * 12 + (ym.m - employer.start.m);
const tNow = Math.max(t(NOW), 1);
const X = (ym: YM) => 4 + (t(ym) / tNow) * 84; // % across
const Y = (level: number) => [0, 78, 48, 18][level]; // % down

const steps = [...employer.roles].reverse(); // oldest first
const linePath = steps
  .map((r, i) => (i === 0 ? `M ${X(r.start)} ${Y(r.level)}` : `H ${X(r.start)} V ${Y(r.level)}`))
  .join(" ")
  .concat(` H ${X(NOW)}`);
const areaPath = `${linePath} V 100 H ${X(steps[0].start)} Z`;
const years = Array.from({ length: NOW.y - employer.start.y }, (_, i) => employer.start.y + 1 + i);

const DRAW_DELAY = 0.9;
const DRAW_TIME = 1.6;

// Labels sit under each step's line, where nothing else is drawn.
function labelText(r: (typeof steps)[number]) {
  if (r.short === "Strategy & Marketing Manager")
    return (
      <>
        Strategy &amp; Marketing<span className="hidden sm:inline"> Manager</span>
      </>
    );
  return r.short;
}

function CareerChart() {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="relative h-[200px] sm:h-[230px]">
        {[1, 2, 3].map((l) => (
          <span key={l} className="absolute inset-x-0 border-t border-dashed border-ink/[0.08]" style={{ top: `${Y(l)}%` }} aria-hidden />
        ))}
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ delay: DRAW_DELAY, duration: DRAW_TIME, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="career-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0E7C6B" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0E7C6B" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#career-area)" />
            <path d={linePath} fill="none" stroke="#0E7C6B" strokeWidth={2.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </motion.div>

        {steps.map((r) => {
          const x = X(r.start);
          const current = !r.end;
          const delay = DRAW_DELAY + (DRAW_TIME * x) / 100;
          return (
            <motion.div
              key={r.title}
              className="absolute"
              style={{ left: `${x}%`, top: `${Y(r.level)}%` }}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
            >
              <span className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-[2.5px] ring-accent", current ? "size-3.5" : "size-2.5")} title={r.title} />
              {current && <span className="animate-ping-slow absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40" aria-hidden />}
              {current ? (
                <span className="absolute flex -translate-x-[calc(100%-18px)] -translate-y-[150%] items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11.5px] font-bold whitespace-nowrap text-white shadow-[0_8px_20px_-8px_rgba(16,33,30,0.6)]">
                  {r.short} <span className="rounded-full bg-white/15 px-1.5 text-[10.5px] font-semibold">Now</span>
                </span>
              ) : (
                <span className="absolute translate-x-2 translate-y-2 text-[11.5px] font-bold whitespace-nowrap text-ink sm:text-[12.5px]">{labelText(r)}</span>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="relative mt-2 h-4 border-t border-ink/[0.08]" aria-hidden>
        {years.map((y) => (
          <span key={y} className="absolute top-1.5 -translate-x-1/2 text-[11px] font-semibold text-ink-soft/80 tabular-nums" style={{ left: `${X({ y, m: 1 })}%` }}>
            {y}
          </span>
        ))}
      </div>
    </div>
  );
}

function Kpi({ label, value, unit, prefix, decimals = 0, delay }: { label: string; value: number; unit?: string; prefix?: string; decimals?: number; delay: number }) {
  return (
    <div className="rounded-2xl bg-mist/70 px-3 py-3 sm:px-4">
      <p className="text-[11.5px] font-semibold text-ink-soft sm:text-[12px]">{label}</p>
      <p className="mt-1 flex items-baseline gap-1">
        {prefix && <span className="text-[18px] font-extrabold text-accent sm:text-[20px]">{prefix}</span>}
        <NumberTicker value={value} delay={delay} decimalPlaces={decimals} className="text-[28px] leading-none font-extrabold tracking-[-0.05em] text-ink sm:text-[34px]" />
        {unit && <span className="text-[13px] font-bold text-ink-soft">{unit}</span>}
      </p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="rounded-[28px] bg-white p-4 ring-1 ring-ink/[0.06] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-ink/10" />
            <span className="size-2.5 rounded-full bg-ink/10" />
            <span className="size-2.5 rounded-full bg-ink/10" />
          </span>
          <span className="ml-1 font-mono text-[12px] text-ink-soft">career.overview</span>
        </div>
        <Chip className="bg-accent-soft text-accent">{employer.company}</Chip>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        <Kpi label="At Tech Mahindra" value={employerYears} unit="yrs+" delay={0.6} />
        <Kpi label="Sponsorships" prefix="₹" value={impact.mxc.amount} decimals={1} unit="Cr+" delay={0.75} />
        <Kpi label="Engagements" value={impact.engagements} unit="+" delay={0.9} />
      </div>
      <div className="mt-5 px-1 pb-1">
        <CareerChart />
      </div>
    </div>
  );
}

function Floating({ side, top, delay, children }: { side: "left" | "right"; top: string; delay: number; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.9, x: side === "left" ? 24 : -24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay }}
      className={cn(
        "absolute z-20 hidden w-[232px] rounded-[22px] bg-white/90 p-4 text-left shadow-[0_24px_50px_-24px_rgba(16,33,30,0.35)] ring-1 ring-ink/5 backdrop-blur xl:block",
        side === "left" ? "right-[calc(100%+32px)]" : "left-[calc(100%+32px)]",
      )}
      style={{ top }}
    >
      {children}
    </motion.div>
  );
}

function FloatRow({ icon, title, sub, iconClass }: { icon: ReactNode; title: string; sub: string; iconClass?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("grid size-10 shrink-0 place-items-center rounded-2xl bg-mist text-accent", iconClass)}>{icon}</span>
      <div>
        <p className="text-[14px] font-bold text-ink">{title}</p>
        <p className="text-[12px] text-ink-soft">{sub}</p>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const item = {
    hidden: { y: 28, opacity: 0, filter: "blur(8px)" },
    show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 120, damping: 18 } },
  };
  const line1 = profile.name.split(" ");
  const line2 = `${profile.positioning}.`.split(" ");
  const [iim, lsr] = education;
  const star = profile.awards[0];

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate scroll-mt-24 overflow-hidden pt-12 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-[42%] -z-10 mx-auto h-[620px] max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgba(14,124,107,0.16),transparent)]" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink-soft shadow-[0_8px_24px_-16px_rgba(16,33,30,0.4)] ring-1 ring-ink/5"
        >
          {profile.openToWork ? (
            <>
              <OpenDot /> Open to new roles · {profile.location}
            </>
          ) : (
            <>
              <BriefcaseBusiness size={14} className="text-accent" /> {profile.title} at {employer.company}
            </>
          )}
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
          className="mx-auto mt-6 max-w-5xl text-[46px] leading-[0.98] font-extrabold tracking-[-0.055em] text-ink sm:text-[72px] lg:text-[88px]"
        >
          <span className="sr-only">
            {profile.name}, {profile.positioning}
          </span>
          {line1.map((w) => (
            <motion.span key={w} variants={item} className="mr-[0.22em] inline-block last:mr-0" aria-hidden>
              {w}
            </motion.span>
          ))}
          <br />
          {line2.map((w) => (
            <motion.span key={w} variants={item} className="mr-[0.22em] inline-block text-haze last:mr-0" aria-hidden>
              {w}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
            {employerYears}+ years at {employer.company} {profile.summary} MBA from IIM Indore; BA from Lady Shri Ram College.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <EmailCTA />
            <div className="flex gap-3">
              <a
                href="#experience"
                className={cn(
                  "inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-ink shadow-[0_8px_24px_-16px_rgba(16,33,30,0.4)] ring-1 ring-ink/10 transition-colors hover:bg-accent-soft",
                  ring,
                )}
              >
                See experience
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className={cn(
                  "grid size-12 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_-16px_rgba(16,33,30,0.4)] ring-1 ring-ink/10 transition-colors hover:bg-accent-soft hover:text-accent",
                  ring,
                )}
              >
                <LinkedInIcon size={18} />
              </a>
            </div>
          </div>
          <p className="mt-5 text-[13px] font-medium text-ink-soft">Core skills · {profile.topSkills.join(" · ")}</p>
        </motion.div>
      </div>

      {/* dashboard stage */}
      <div className="relative mx-auto mt-14 w-full max-w-[600px] px-4 pb-14 sm:mt-16 sm:px-0 sm:pb-20" style={{ perspective: 1400 }}>
        <motion.div
          initial={reduce ? false : { y: 140, rotateX: 18, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 55, damping: 16, delay: 0.45 }}
          className="relative z-10 drop-shadow-[0_50px_60px_rgba(16,33,30,0.22)]"
        >
          <Dashboard />
        </motion.div>
        <div className="absolute inset-x-10 bottom-16 h-10 rounded-[50%] bg-ink/15 blur-2xl" aria-hidden />

        <Floating side="left" top="10%" delay={1.4}>
          <FloatRow icon={<GraduationCap size={18} />} title={iim.short} sub={`${iim.degree} · ${iim.years.replace(/ /g, "")}`} />
        </Floating>
        <Floating side="left" top="56%" delay={1.65}>
          <FloatRow icon={<GraduationCap size={18} />} title={lsr.short} sub={`${lsr.degree} · University of Delhi`} />
        </Floating>
        <Floating side="right" top="14%" delay={1.5}>
          <FloatRow icon={<Trophy size={18} />} iconClass="bg-accent text-white" title={star.name} sub={`${employer.company} · ${star.when}`} />
        </Floating>
        <Floating side="right" top="58%" delay={1.8}>
          <FloatRow icon={<Medal size={18} />} title="International athlete" sub={`${profile.athlete.medals}+ medals · ${profile.athlete.years.replace(/ /g, "")}`} />
        </Floating>
      </div>
    </section>
  );
}
