import { useState } from "react";
import { Check, Copy, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOW, profile } from "@/profile";
import { EmailCTA, LinkedInIcon, Monogram, OpenDot, Rise, ring } from "./ui";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={cn("inline-flex h-12 items-center gap-2 rounded-full bg-white/10 px-5 text-[15px] font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/15", ring)}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      <span aria-live="polite">{copied ? "Copied" : profile.email}</span>
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Rise className="relative isolate overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-center text-white sm:px-10 sm:py-20">
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-accent/45 blur-[110px]" aria-hidden />
          <div className="pointer-events-none absolute -right-24 -bottom-32 -z-10 size-80 rounded-full bg-accent/25 blur-[90px]" aria-hidden />
          {profile.openToWork ? (
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white/90 ring-1 ring-white/15">
              <OpenDot /> Open to new roles
            </p>
          ) : (
            <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/80">Contact</p>
          )}
          <h2 id="contact-title" className="mx-auto mt-5 max-w-3xl text-[40px] leading-[1.02] font-extrabold tracking-[-0.05em] sm:text-[60px] lg:text-[72px]">
            Let's talk.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-white/80">Email or LinkedIn is the quickest way to reach me.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <EmailCTA label="Email me" className="shadow-[0_14px_40px_-12px_rgba(14,124,107,0.9)]" />
            <CopyEmail />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn("inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-accent-soft", ring)}
            >
              <LinkedInIcon size={16} className="text-accent" /> LinkedIn
            </a>
          </div>
          <p className="mt-8 flex items-center justify-center gap-1.5 text-[13.5px] text-white/70">
            <MapPin size={14} /> {profile.location}
          </p>
        </Rise>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5">
          <Monogram className="size-7 rounded-lg text-[11px]" />
          <p className="text-[13.5px] text-ink-soft">
            © {NOW.y} {profile.name} · {profile.location}
          </p>
        </div>
        <a href="#top" className={cn("rounded-full px-3 py-2 text-[13.5px] font-semibold text-ink hover:bg-white", ring)}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
