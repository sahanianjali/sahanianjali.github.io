import { type ReactNode } from "react";
import { Building2, ChartColumnBig, Handshake, LineChart, Megaphone, Scale, Target, UsersRound } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import { impact } from "@/profile";
import { Glass, Reveal, SectionHead, label } from "./ui";

function CardLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className={cn(label, "flex items-center gap-2.5")}>
      <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-orchid">{icon}</span>
      {children}
    </p>
  );
}

/** Big serif figure; the unit picks up the gradient. */
function Figure({ value, decimals = 0, prefix, suffix, className }: { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
  return (
    <p className={cn("flex items-baseline font-serif text-[72px] leading-[0.9] tracking-[-0.02em] text-ivory sm:text-[88px]", className)}>
      {prefix && <span className="text-gradient mr-1 text-[0.55em]">{prefix}</span>}
      <NumberTicker value={value} decimalPlaces={decimals} />
      {suffix && <span className="text-gradient ml-1 text-[0.5em]">{suffix}</span>}
    </p>
  );
}

function Stat({ icon, title, value, decimals, prefix, suffix, children, delay }: { icon: ReactNode; title: string; value: number; decimals?: number; prefix?: string; suffix?: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Glass className="h-full">
        <div className="flex h-full flex-col p-7 sm:p-8">
          <CardLabel icon={icon}>{title}</CardLabel>
          <Figure value={value} decimals={decimals} prefix={prefix} suffix={suffix} className="mt-8" />
          <p className="mt-4 text-[15px] leading-relaxed text-mute">{children}</p>
        </div>
      </Glass>
    </Reveal>
  );
}

function Centre({ c, prefix, suffix, decimals }: { c: typeof impact.mxc | typeof impact.cec; prefix: string; suffix: string; decimals?: number }) {
  return (
    <div className="flex flex-col rounded-[22px] border border-white/[0.07] bg-night/40 p-5 sm:p-6">
      <p className="text-[13px] font-bold text-ivory">
        {c.name} <span className="font-semibold text-dim">· {c.short}</span>
      </p>
      <Figure value={c.amount} decimals={decimals} prefix={prefix} suffix={suffix} className="mt-6 text-[64px] sm:text-[76px]" />
      <p className="mt-2 text-[14px] font-semibold text-dim">in sponsorships</p>
      <ul className="mt-auto grid grid-cols-2 gap-2 pt-6">
        {c.stats.map(([n, l]) => (
          <li key={l} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-3">
            <p className="font-serif text-[26px] leading-none text-ivory">{n}</p>
            <p className="mt-1.5 text-[12px] leading-snug font-semibold text-dim">{l}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Impact() {
  const { mxc, cec, gtm } = impact;
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute top-40 right-0 -z-10 size-[40vmax] rounded-full bg-[radial-gradient(closest-side,rgba(124,111,224,0.16),transparent)] blur-3xl" aria-hidden />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead eyebrow="Impact">
          <span id="impact-title">
            Councils run, <em className="text-gradient">centres launched.</em>
          </span>
        </SectionHead>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Glass className="h-full">
              <div className="p-7 sm:p-8">
                <CardLabel icon={<Building2 size={15} />}>Experience centres</CardLabel>
                <h3 className="mt-5 font-serif text-[32px] leading-tight text-ivory sm:text-[40px]">
                  Two programmes, <em className="text-gradient">end-to-end.</em>
                </h3>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <Centre c={mxc} prefix="₹" suffix="Cr+" decimals={1} />
                  <Centre c={cec} prefix="$" suffix="K+" />
                </div>
              </div>
            </Glass>
          </Reveal>

          <Reveal delay={0.06} className="h-full">
            <Glass className="h-full">
              <div className="flex h-full flex-col p-7 sm:p-8">
                <CardLabel icon={<Megaphone size={15} />}>Flagship events</CardLabel>
                <Figure value={impact.engagements} suffix="+" className="mt-8" />
                <p className="mt-4 text-[15px] leading-relaxed text-mute">Executive, customer, partner and sales engagements led across:</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {["MWC", "DTW", "Sales Masterclass", "Partner Connect"].map((e) => (
                    <li key={e} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] font-semibold text-ivory">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Glass>
          </Reveal>

          <Stat icon={<UsersRound size={15} />} title="CEO-led council" value={6} suffix="+" delay={0.02}>
            Cross-functional workgroups driving the Manufacturing Council's initiatives across growth, capability and marketing.
          </Stat>
          <Stat icon={<ChartColumnBig size={15} />} title="MFG Eye" value={impact.kpis} suffix="+" delay={0.06}>
            KPIs tracked on a Power BI platform built for visibility into revenue, pipeline and growth.
          </Stat>
          <Stat icon={<Target size={15} />} title="Go-to-market" value={gtm.accounts} suffix="+" delay={0.1}>
            Accounts in a GTM strategy designed and run across {gtm.channels}+ channels and {gtm.solutions}+ solutions.
          </Stat>
          <Stat icon={<Scale size={15} />} title="Investment planning" value={impact.allocationAccuracy} suffix="%" delay={0.02}>
            Better allocation accuracy, with budgets aligned to growth potential and projected revenue.
          </Stat>
          <Stat icon={<LineChart size={15} />} title="Deal analytics" value={150} suffix="+" delay={0.06}>
            Deals tracked through CRM and revenue data to forecast closures and evaluate performance.
          </Stat>
          <Stat icon={<Handshake size={15} />} title="Leadership reviews" value={50} suffix="+" delay={0.1}>
            Leadership reviews supported from Sales Strategy &amp; Operations for EMEA &amp; Network Services.
          </Stat>
        </div>
      </div>
    </section>
  );
}
