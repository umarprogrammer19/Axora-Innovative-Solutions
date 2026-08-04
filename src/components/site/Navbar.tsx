"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { cta, nav } from "@/lib/content";

/**
 * z-index scale for the whole page, kept deliberately short:
 *   5   fixed grain (globals.css)
 *   40  sticky navigation and its mobile sheet
 * Nothing else on the page sets a z-index above 10 inside its own stacking context.
 *
 * Height: 68px at rest, 58px once scrolled. Single line at every breakpoint
 * above lg; below that the links move into a sheet.
 */
export function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Discrete state change, not a per-frame value, so React state is correct here.
  useMotionValueEvent(scrollY, "change", (y) => {
    setCondensed(y > 24);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`border-b transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          condensed || open
            ? "glass-strong border-white/10"
            : "border-transparent bg-transparent"
        }`}
      >
        <Container>
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              condensed ? "h-[58px]" : "h-[68px]"
            }`}
          >
            <a href="#top" className="rounded-control py-1" aria-label="Axora Innovative Solutions, home">
              <Wordmark />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="relative block rounded-control px-3.5 py-2 text-sm text-fg-2 transition-colors duration-200 hover:text-fg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                href={cta.contactHref}
                className="hidden sm:inline-flex px-4 py-2.5 text-sm"
              >
                {cta.contact}
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="glass grid size-10 place-items-center rounded-control text-fg lg:hidden"
              >
                {open ? <X size={18} /> : <List size={18} />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong border-b border-white/10 lg:hidden"
          >
            <Container>
              <ul className="flex flex-col py-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-line py-3.5 text-[0.9375rem] text-fg-2 transition-colors hover:text-fg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-4 pb-2 sm:hidden">
                  <Button
                    href={cta.contactHref}
                    onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    {cta.contact}
                  </Button>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
