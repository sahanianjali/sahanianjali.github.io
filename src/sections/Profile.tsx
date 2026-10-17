import { useRef, type ReactNode, type RefObject } from "react";
import { Award, ClipboardCheck, GraduationCap, Handshake, Landmark, Medal, Rocket, Star, Trophy } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import { education, employer, profile } from "@/profile";
import { Rise, eyebrow, h2, tile } from "./ui";

const skillIcons = [ClipboardCheck, Rocket, Handshake];
const awardIcons = [Trophy, Award, Star];
const beam = { pathColor: "#10211E", pathOpacity: 0.1, pathWidth: 2, gradientStartColor: "#0E7C6B", gradientStopColor: "#F0B35A", duration: 3.4 };

function Node({ nodeRef, children, big }: { nodeRef: RefObject<HTMLDivElement | null>; children: ReactNode; big?: boolean }) {
  return (
    <div
      ref={nodeRef}
      className={cn(
        "relative z-10 grid shrink-0 place-items-center rounded-full",
        big ? "size-20 bg-ink text-[22px] font-extrabold tracking-[-0.04em] text-white shadow-[0_18px_40px_-16px_rgba(16,33,30,0.7)]" : "size-12 bg-white text-accent shadow-[0_10px_24px_-12px_rgba(16,33,30,0.45)] ring-1 ring-ink/10",
      )}
    >
      {children}
    </div>
  );
}

function SkillsTile() {
  const box = useRef<HTMLDivElement>(null);
  const s0 = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const out = useRef<HTMLDivElement>(null);
  const skillRefs = [s0, s1, s2];

  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <p className={eyebrow}>Core skills</p>
      <h3 className="mt-1 text-[24px] leading-tight font-extrabold tracking-[-0.04em] text-ink sm:text-[28px]">Governance, go-to-market and the C-suite.</h3>
      <div ref={box} className="relative mt-8 flex flex-1 flex-col items-center justify-between gap-12 sm:flex-row sm:gap-6 sm:px-2">
        <ul className="flex w-full justify-between gap-2 sm:w-auto sm:flex-col sm:gap-6">
          {profile.topSkills.map((s, i) => {
            const Icon = skillIcons[i];
            return (
              <li key={s} className="flex w-[30%] flex-col items-center gap-2 text-center sm:w-auto sm:flex-row sm:justify-end sm:gap-3 sm:text-right">
                <span className="text-[13px] leading-tight font-bold text-ink sm:text-[15px]">{s}</span>
                <Node nodeRef={skillRefs[i]}>
                  <Icon size={20} />
                </Node>
              </li>
            );
          })}
        </ul>
        <Node nodeRef={hub} big>
          {profile.initials}
        </Node>
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left">
          <Node nodeRef={out}>
            <Landmark size={20} />
          </Node>
          <span className="text-[13px] leading-tight font-bold text-ink sm:text-[15px]">
            CEO/CTO agendas
            <span className="block text-[12.5px] font-semibold text-ink-soft">at {employer.company}</span>
          </span>
        </div>
        {skillRefs.map((r, i) => (
          <AnimatedBeam key={i} containerRef={box} fromRef={r} toRef={hub} curvature={[24, 0, -24][i]} delay={i * 0.4} {...beam} />
        ))}
        <AnimatedBeam containerRef={box} fromRef={hub} toRef={out} delay={1.4} {...beam} />
      </div>
    </div>
  );
}

function ToolkitTile() {
  return (
    <div className="p-6 sm:p-8">
      <p className={eyebrow}>Toolkit</p>
      <h3 className="mt-1 text-[24px] leading-tight font-extrabold tracking-[-0.04em] text-ink">From councils to dashboards.</h3>
      <div className="mt-6 space-y-5">
        {[
          { name: "Core skills", items: profile.coreSkills },
          { name: "Tools", items: profile.tools },
        ].map((g) => (
          <div key={g.name}>
            <p className="text-[12px] font-bold tracking-[0.06em] text-ink-soft uppercase">{g.name}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <li key={it} className="rounded-full bg-mist px-3 py-1.5 text-[13px] font-semibold text-ink">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardsTile() {
  return (
    <div className="relative flex h-full flex-col bg-ink p-6 text-white sm:p-8">
      <div className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-accent/50 blur-3xl" aria-hidden />
      <p className="relative flex items-center gap-1.5 text-[13px] font-semibold text-[#9FE0D2]">
        <Trophy size={15} /> Awards at {employer.company}
      </p>
      <ul className="relative mt-5 space-y-3">
        {profile.awards.map((a, i) => {
          const Icon = awardIcons[i];
          return (
            <li key={a.name} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
              <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", i === 0 ? "bg-accent text-white" : "bg-white/10 text-[#9FE0D2]")}>
                <Icon size={19} />
              </span>
              <div>
                <p className="text-[16px] leading-tight font-extrabold tracking-[-0.02em]">
                  {a.name}
                  {a.detail && <span className="font-semibold text-white/70"> · {a.detail}</span>}
                </p>
                <p className="mt-0.5 text-[13px] text-white/70 tabular-nums">{a.when}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AthleteTile() {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <p className={cn(eyebrow, "flex items-center gap-1.5")}>
        <Medal size={15} /> International athlete
      </p>
      <div className="mt-4 flex items-start">
        <NumberTicker value={profile.athlete.medals} className="text-[72px] leading-[0.85] font-extrabold tracking-[-0.06em] text-ink sm:text-[84px]" />
        <span className="text-[40px] leading-none font-extrabold text-accent">+</span>
      </div>
      <p className="mt-2 text-[15px] font-bold text-ink">medals</p>
      <p className="mt-auto pt-6 text-[13.5px] font-semibold text-ink-soft tabular-nums">{profile.athlete.years}</p>
      <BorderBeam size={140} duration={9} colorFrom="#0E7C6B" colorTo="#F0B35A" borderWidth={2} />
    </div>
  );
}

function SchoolTile({ i }: { i: number }) {
  const e = education[i];
  const dark = i === 0;
  return (
    <div className={cn("relative flex h-full flex-col p-6 sm:p-8", dark ? "bg-ink text-white" : "")}>
      {dark && <div className="pointer-events-none absolute -right-16 -bottom-20 size-72 rounded-full bg-accent/50 blur-3xl" aria-hidden />}
      <p className={cn("relative flex items-center gap-1.5 text-[13px] font-semibold", dark ? "text-[#9FE0D2]" : "text-accent")}>
        <GraduationCap size={15} /> {e.degree}
      </p>
      <h3 className={cn("relative mt-3 text-[34px] leading-[0.95] font-extrabold tracking-[-0.05em] sm:text-[44px]", dark ? "text-white" : "text-ink")}>{e.short}</h3>
      <p className={cn("relative mt-3 text-[14.5px] leading-snug", dark ? "text-white/80" : "text-ink-soft")}>{e.school}</p>
      <p className={cn("relative mt-auto pt-8 text-[14px] font-semibold tabular-nums", dark ? "text-white/80" : "text-ink-soft")}>{e.years}</p>
    </div>
  );
}

export function ProfileBento() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Rise className="max-w-3xl">
          <p className={eyebrow}>Skills, awards &amp; education</p>
          <h2 id="skills-title" className={cn(h2, "mt-2")}>
            An athlete's discipline, <span className="text-haze">an MBA's lens.</span>
          </h2>
        </Rise>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Rise className={cn(tile, "lg:col-span-2")}>
            <SkillsTile />
          </Rise>
          <Rise delay={0.06} className={tile}>
            <AwardsTile />
          </Rise>
          <Rise className={cn(tile, "lg:col-span-2")}>
            <ToolkitTile />
          </Rise>
          <Rise delay={0.06} className={tile}>
            <AthleteTile />
          </Rise>
          <Rise id="education" delay={0.04} className={cn(tile, "scroll-mt-24 lg:col-span-2")}>
            <SchoolTile i={0} />
          </Rise>
          <Rise delay={0.08} className={tile}>
            <SchoolTile i={1} />
          </Rise>
        </div>
      </div>
    </section>
  );
}
