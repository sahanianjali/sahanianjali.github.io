// Shared pieces of the midnight-editorial design: glass cards that light up
// under the cursor, serif section headings, and reveals that never hide text.
import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/profile";

export const ring = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid";
export const mailto = `mailto:${profile.email}`;
export const label = "text-[12px] font-semibold tracking-[0.16em] text-dim uppercase";

/** Scroll reveal that only moves things, so text is readable even if it never fires. */
export function Reveal({ children, className, delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? false : { y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Frosted card; a soft orchid light follows the pointer across it. */
export function Glass({ children, className, glow = "rgba(231,159,195,0.14)" }: { children: ReactNode; className?: string; glow?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group/glass relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/glass:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 45%)` }}
        aria-hidden
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export function SectionHead({ eyebrow, children, sub, className }: { eyebrow: string; children: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className={label}>{eyebrow}</p>
      <h2 className="mt-4 font-serif text-[46px] leading-[0.98] tracking-[-0.02em] text-ivory sm:text-[64px] lg:text-[76px]">{children}</h2>
      {sub && <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-mute">{sub}</p>}
    </Reveal>
  );
}

export function PrimaryLink({ href, children, className, external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-bold text-night",
        "animate-shine bg-[linear-gradient(100deg,#f2b8a0,#e79fc3_35%,#a99bf5_60%,#f2b8a0)] bg-[length:200%_100%]",
        "shadow-[0_10px_40px_-10px_rgba(231,159,195,0.65)] transition-transform hover:-translate-y-0.5",
        ring,
        className,
      )}
    >
      {children}
      <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function GhostLink({ href, children, className, external, ariaLabel }: { href: string; children: ReactNode; className?: string; external?: boolean; ariaLabel?: string }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-[15px] font-semibold text-ivory backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.08]",
        ring,
        className,
      )}
    >
      {children}
    </a>
  );
}

export function LinkedInIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-9 place-items-center rounded-full bg-[linear-gradient(135deg,#f2b8a0,#e79fc3_55%,#a99bf5)] font-serif text-[17px] text-night italic",
        className,
      )}
      aria-hidden
    >
      {profile.initials}
    </span>
  );
}
