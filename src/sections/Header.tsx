import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/profile";
import { Monogram, mailto, ring } from "./ui";

const nav = [
  { href: "#impact", label: "Impact" },
  { href: "#journey", label: "Journey" },
  { href: "#recognition", label: "Recognition" },
  { href: "#foundations", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full border pr-2 pl-2.5 transition-all duration-500",
          scrolled ? "border-white/10 bg-night/70 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl" : "border-transparent bg-transparent",
        )}
      >
        <a href="#top" className={cn("flex items-center gap-2.5 rounded-full pr-2", ring)}>
          <Monogram />
          <span className="text-[15px] font-bold tracking-[-0.01em] text-ivory">{profile.name}</span>
        </a>
        <nav aria-label="Main" className="hidden items-center md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={cn("rounded-full px-3.5 py-2 text-[14px] font-medium text-mute transition-colors hover:text-ivory", ring)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <a
            href={mailto}
            className={cn("hidden h-10 items-center rounded-full bg-ivory px-4 text-[14px] font-bold text-night transition-transform hover:-translate-y-px sm:inline-flex", ring)}
          >
            Get in touch
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className={cn("grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-ivory md:hidden", ring)}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[76px] z-40 bg-night/95 px-6 pt-6 backdrop-blur-2xl md:hidden"
          >
            <ul className="space-y-1">
              {nav.map((n, i) => (
                <motion.li key={n.href} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}>
                  <a
                    href={n.href}
                    onClick={(e) => {
                      // The open menu locks page scroll, so close it first, then jump.
                      e.preventDefault();
                      setOpen(false);
                      window.setTimeout(() => {
                        document.body.style.overflow = "";
                        document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth" });
                        history.replaceState(null, "", n.href);
                      }, 60);
                    }}
                    className={cn("flex items-baseline justify-between border-b border-white/10 py-4 font-serif text-[40px] leading-none text-ivory", ring)}
                  >
                    {n.label}
                    <span className="font-sans text-[12px] font-semibold text-dim">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={mailto} onClick={() => setOpen(false)} className={cn("mt-8 flex h-12 items-center justify-center rounded-full bg-ivory text-[15px] font-bold text-night", ring)}>
              Get in touch
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
