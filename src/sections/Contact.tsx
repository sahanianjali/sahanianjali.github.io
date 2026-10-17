import { useState } from "react";
import { Check, Copy, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOW, profile } from "@/profile";
import { GhostLink, LinkedInIcon, Monogram, PrimaryLink, Reveal, mailto, ring } from "./ui";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = mailto;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-[15px] font-semibold text-ivory backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.08]",
        ring,
      )}
    >
      {copied ? <Check size={16} className="text-orchid" /> : <Copy size={16} />}
      <span aria-live="polite">{copied ? "Copied" : profile.email}</span>
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate scroll-mt-24 overflow-hidden py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="animate-drift-a absolute bottom-[-30%] left-[10%] size-[55vmax] rounded-full bg-[radial-gradient(closest-side,rgba(200,111,168,0.30),transparent)] blur-3xl" />
        <div className="animate-drift-b absolute right-[-10%] bottom-[-20%] size-[45vmax] rounded-full bg-[radial-gradient(closest-side,rgba(124,111,224,0.28),transparent)] blur-3xl" />
      </div>
      <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-6">
        <p className="text-[12px] font-semibold tracking-[0.16em] text-dim uppercase">Contact</p>
        <h2 id="contact-title" className="mt-5 font-serif text-[60px] leading-[0.92] tracking-[-0.02em] text-ivory sm:text-[104px] lg:text-[128px]">
          Let's build <em className="text-gradient animate-shine">what's next.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-mute">Email or LinkedIn is the quickest way to reach me.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <PrimaryLink href={mailto}>Email me</PrimaryLink>
          <CopyEmail />
          <GhostLink href={profile.linkedin} external>
            <LinkedInIcon size={16} /> LinkedIn
          </GhostLink>
        </div>
        <p className="mt-10 flex items-center justify-center gap-1.5 text-[14px] text-dim">
          <MapPin size={14} /> {profile.location}
        </p>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <Monogram className="size-8 text-[15px]" />
          <p className="text-[13.5px] text-dim">
            © {NOW.y} {profile.name} · {profile.location}
          </p>
        </div>
        <a href="#top" className={cn("rounded-full px-3 py-2 text-[13.5px] font-semibold text-mute transition-colors hover:text-ivory", ring)}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
