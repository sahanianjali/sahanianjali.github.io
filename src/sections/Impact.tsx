import { type ReactNode } from "react";
import { Building2, ChartColumnBig, Megaphone, Scale, Target } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";
import { impact } from "@/profile";
import { Rise, eyebrow, h2, tile } from "./ui";

const big = "text-[64px] leading-[0.85] font-extrabold tracking-[-0.06em] text-ink sm:text-[76px]";
const unit = "mt-1 text-[36px] text-accent";

function Label({ icon, children, className }: { icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <p className={cn(eyebrow, "flex items-center gap-1.5", className)}>
      {icon} {children}
    </p>
  );
}

function Centre({ name, short, amount, stats, delay }: { name: string; short: string; amount: ReactNode; stats: string[][]; delay?: number }) {
  return (
    <Rise delay={delay} className="flex flex-col rounded-[22px] bg-mist/70 p-5 sm:p-6">
      <p className="text-[13px] font-bold text-ink">
        {name} <span className="font-semibold text-ink-soft">({short})</span>
      </p>
      <div className="mt-4">{amount}</div>
      <p className="mt-1 text-[14px] font-semibold text-ink-soft">in sponsorships</p>
      <ul className="mt-auto grid grid-cols-2 gap-2 pt-5">
        {stats.map(([n, label]) => (
          <li key={label} className="rounded-2xl bg-white px-3 py-2.5 ring-1 ring-ink/5">
            <p className="text-[20px] leading-none font-extrabold tracking-[-0.03em] text-ink">{n}</p>
            <p className="mt-1 text-[12px] leading-snug font-semibold text-ink-soft">{label}</p>
          </li>
        ))}
      </ul>
    </Rise>
  );
}

export function Impact() {
  const { mxc, cec, gtm } = impact;
  return (
    <section id="impact" aria-labelledby="impact-title" className="scroll-mt-20 pt-20 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Rise className="max-w-3xl">
          <p className={eyebrow}>Impact</p>
          <h2 id="impact-title" className={cn(h2, "mt-2")}>
            Councils run, <span className="text-haze">centres launched.</span>
          </h2>
        </Rise>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Rise className={cn(tile, "p-6 sm:p-8 lg:col-span-2")}>
            <Label icon={<Building2 size={15} />}>Experience centres</Label>
            <h3 className="mt-1 text-[24px] leading-tight font-extrabold tracking-[-0.04em] text-ink sm:text-[28px]">Two programmes, delivered end-to-end.</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Centre
                name={mxc.name}
                short={mxc.short}
                stats={mxc.stats}
                amount={
                  <p className={cn(big, "flex items-start text-[56px] sm:text-[64px]")}>
                    <span className={unit}>₹</span>
                    <NumberTicker value={mxc.amount} decimalPlaces={1} className="text-ink" />
                    <span className={unit}>Cr+</span>
                  </p>
                }
              />
              <Centre
                name={cec.name}
                short={cec.short}
                stats={cec.stats}
                delay={0.08}
                amount={
                  <p className={cn(big, "flex items-start text-[56px] sm:text-[64px]")}>
                    <span className={unit}>$</span>
                    <NumberTicker value={cec.amount} className="text-ink" />
                    <span className={unit}>K+</span>
                  </p>
                }
              />
            </div>
          </Rise>

          <Rise delay={0.06} className={cn(tile, "flex flex-col p-6 sm:p-8")}>
            <Label icon={<Megaphone size={15} />}>Flagship events</Label>
            <p className={cn(big, "mt-4 flex items-start")}>
              <NumberTicker value={impact.engagements} className="text-ink" />
              <span className={unit}>+</span>
            </p>
            <p className="mt-3 text-[15px] font-bold text-ink">executive, customer, partner and sales engagements</p>
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {["MWC", "DTW", "Sales Masterclass", "Partner Connect"].map((e) => (
                <li key={e} className="rounded-full bg-mist px-3 py-1.5 text-[13px] font-semibold text-ink">
                  {e}
                </li>
              ))}
            </ul>
            <BorderBeam size={140} duration={9} colorFrom="#0E7C6B" colorTo="#F0B35A" borderWidth={2} />
          </Rise>

          <Rise delay={0.04} className={cn(tile, "p-6 sm:p-8")}>
            <Label icon={<ChartColumnBig size={15} />}>MFG Eye</Label>
            <p className={cn(big, "mt-4 flex items-start")}>
              <NumberTicker value={impact.kpis} className="text-ink" />
              <span className={unit}>+</span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">KPIs tracked in MFG Eye, the Power BI platform she spearheaded for visibility into revenue, pipeline and growth.</p>
          </Rise>

          <Rise delay={0.08} className={cn(tile, "bg-ink p-6 text-white sm:p-8")}>
            <div className="pointer-events-none absolute -right-16 -bottom-20 size-64 rounded-full bg-accent/50 blur-3xl" aria-hidden />
            <Label icon={<Target size={15} />} className="relative text-[#9FE0D2]">
              Go-to-market
            </Label>
            <p className="relative mt-4 flex items-start text-[64px] leading-[0.85] font-extrabold tracking-[-0.06em] sm:text-[76px]">
              <NumberTicker value={gtm.accounts} className="text-white" />
              <span className="mt-1 text-[36px] text-[#9FE0D2]">+</span>
            </p>
            <p className="relative mt-3 text-[15px] leading-relaxed text-white/80">
              accounts in a GTM strategy designed and run across {gtm.channels}+ channels and {gtm.solutions}+ solutions.
            </p>
          </Rise>

          <Rise delay={0.12} className={cn(tile, "p-6 sm:p-8")}>
            <Label icon={<Scale size={15} />}>Investment planning</Label>
            <p className={cn(big, "mt-4 flex items-start")}>
              <NumberTicker value={impact.allocationAccuracy} className="text-ink" />
              <span className={unit}>%</span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">Better allocation accuracy, from budgets aligned to growth potential and projected revenue.</p>
          </Rise>
        </div>
      </div>
    </section>
  );
}
