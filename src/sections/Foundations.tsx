import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { education, profile } from "@/profile";
import { Glass, Reveal, SectionHead, label } from "./ui";

export function Foundations() {
  return (
    <section id="foundations" aria-labelledby="foundations-title" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead eyebrow="Education & skills">
          <span id="foundations-title">
            The <em className="text-gradient">foundations.</em>
          </span>
        </SectionHead>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.short} delay={i * 0.06}>
              <Glass className="h-full">
                <div className="relative flex h-full min-h-[300px] flex-col p-7 sm:p-9">
                  <span
                    className={cn(
                      "pointer-events-none absolute -top-6 right-4 font-serif text-[150px] leading-none italic select-none sm:text-[190px]",
                      "text-white/[0.04]",
                    )}
                    aria-hidden
                  >
                    {e.degree}
                  </span>
                  <p className={cn(label, "flex items-center gap-2.5")}>
                    <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-orchid">
                      <GraduationCap size={15} />
                    </span>
                    {e.degree}
                  </p>
                  <h3 className="mt-auto pt-10 font-serif text-[44px] leading-[0.95] text-ivory sm:text-[56px]">{e.short}</h3>
                  <p className="mt-3 text-[15px] text-mute">{e.school}</p>
                  <p className="mt-5 text-[14px] font-semibold text-dim tabular-nums">{e.years}</p>
                </div>
              </Glass>
            </Reveal>
          ))}

          <Reveal className="lg:col-span-2">
            <Glass>
              <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.8fr_2fr] lg:items-start">
                <div>
                  <p className={label}>Core skills</p>
                  <p className="mt-4 font-serif text-[32px] leading-tight text-ivory sm:text-[38px]">
                    From councils <em className="text-gradient">to dashboards.</em>
                  </p>
                </div>
                <div>
                  <ul className="flex flex-wrap gap-2">
                    {profile.coreSkills.map((s) => (
                      <li key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[14px] font-semibold text-ivory">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className={cn(label, "mt-7")}>Tools</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {profile.tools.map((t) => (
                      <li key={t} className="rounded-full border border-orchid/25 bg-orchid/[0.08] px-4 py-2 text-[14px] font-semibold text-orchid">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Glass>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
