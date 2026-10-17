// Shared tile language, borrowed from the Bento Studio mock: white tiles on a
// mist ground, Manrope at tight tracking, spring reveals that never hide text.
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ShimmerLink } from "@/components/magicui/shimmer-link";
import { cn } from "@/lib/utils";
import { profile } from "@/profile";

export const ring = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export const tile =
  "relative overflow-hidden rounded-[28px] bg-white ring-1 ring-ink/[0.05] shadow-[0_1px_2px_rgba(16,33,30,0.04),0_28px_60px_-32px_rgba(16,33,30,0.28)]";
export const eyebrow = "text-[13px] font-semibold tracking-[-0.01em] text-accent";
export const h2 = "text-[34px] leading-[1.04] font-extrabold tracking-[-0.045em] text-ink sm:text-[48px] lg:text-[56px]";
export const mailto = `mailto:${profile.email}`;

/** Scroll reveal that only moves things: text is never hidden while waiting. */
export function Rise({ children, className, delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? false : { y: 36 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ type: "spring", stiffness: 90, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[12px] font-semibold text-ink-soft", className)}>{children}</span>;
}

export function OpenDot() {
  return (
    <span className="relative flex size-2" aria-hidden>
      <span className="animate-ping-slow absolute inline-flex size-full rounded-full bg-go/60" />
      <span className="relative inline-flex size-2 rounded-full bg-go" />
    </span>
  );
}

export function EmailCTA({ className, label = "Get in touch" }: { className?: string; label?: string }) {
  return (
    <ShimmerLink
      href={mailto}
      background="#0E7C6B"
      shimmerColor="#BFF0E4"
      shimmerDuration="3.2s"
      className={cn("h-12 gap-2 border-white/25 px-6 text-[15px] font-semibold shadow-[0_14px_30px_-12px_rgba(14,124,107,0.7)]", ring, className)}
    >
      <span className="relative z-10 flex items-center gap-2">
        {label} <ArrowRight size={16} />
      </span>
    </ShimmerLink>
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
    <span className={cn("grid size-8 place-items-center rounded-[10px] bg-ink text-[12px] font-extrabold tracking-[-0.02em] text-white", className)} aria-hidden>
      {profile.initials}
    </span>
  );
}
