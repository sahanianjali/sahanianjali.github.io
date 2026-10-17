import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/profile";
import { LinkedInIcon, Monogram, ring } from "./ui";

const nav = [
  { href: "#impact", label: "Impact" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/[0.06] bg-mist/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className={cn("flex items-center gap-2.5 rounded-lg", ring)}>
          <Monogram />
          <span className="text-[18px] font-extrabold tracking-[-0.04em] text-ink">{profile.name}</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={cn("rounded-full px-3.5 py-2 text-[14px] font-medium text-ink/80 transition-colors hover:bg-white hover:text-ink", ring)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className={cn("hidden size-10 place-items-center rounded-full text-ink transition-colors hover:bg-white sm:grid", ring)}
          >
            <LinkedInIcon size={17} />
          </a>
          <a href="#contact" className={cn("inline-flex h-10 items-center rounded-full bg-ink px-4 text-[14px] font-semibold text-white transition-transform hover:-translate-y-px", ring)}>
            Get in touch
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className={cn("grid size-10 place-items-center rounded-full bg-white text-ink lg:hidden", ring)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full border-b border-ink/[0.06] bg-mist/95 px-4 pt-2 pb-4 backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-2">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={cn("flex h-14 items-center justify-between rounded-2xl bg-white px-5 text-[17px] font-bold tracking-[-0.02em] text-ink", ring)}
                >
                  {n.label}
                  <ArrowRight size={16} className="text-accent" />
                </a>
              ))}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className={cn("flex h-14 items-center justify-between rounded-2xl bg-white px-5 text-[17px] font-bold tracking-[-0.02em] text-ink", ring)}
              >
                LinkedIn
                <LinkedInIcon size={16} className="text-accent" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
