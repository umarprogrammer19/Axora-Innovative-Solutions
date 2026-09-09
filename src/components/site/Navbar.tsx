"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { CaretDown, GlobeSimple, List, X } from "@phosphor-icons/react/ssr";

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
 *
 * Dropdowns (Services, Industries, Insights, About Us) are hover-revealed
 * panels, matching the reference's chevron-marked nav items. They collapse to
 * a plain indented list inside the mobile sheet rather than a second sheet.
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
            ? "glass-nav border-white/10"
            : "border-transparent bg-transparent"
        }`}
      >
        <Container>
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              condensed ? "h-[58px]" : "h-[68px]"
            }`}
          >
            <Link href="/" className="rounded-control py-1" aria-label="Axora Innovative Solutions, home">
              <Wordmark />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => (
                  <li key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 rounded-control px-3.5 py-2 text-sm text-fg transition-colors duration-200 hover:text-azure-soft"
                    >
                      {item.label}
                      {"items" in item && (
                        <CaretDown size={12} aria-hidden="true" className="mt-px text-fg-3" />
                      )}
                    </Link>

                    {"items" in item && (
                      <div
                        className="invisible absolute left-0 top-full z-10 min-w-[15rem] translate-y-1 pt-2 opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                      >
                        <ul className="glass-strong rounded-panel p-2">
                          {item.items.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                className="block rounded-control px-3.5 py-2.5 text-[0.875rem] text-fg-2 transition-colors duration-200 hover:bg-white/[0.06] hover:text-fg"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <div className="group relative hidden sm:block">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-control px-2.5 py-2 text-sm text-fg-2 transition-colors duration-200 hover:text-fg"
                >
                  <GlobeSimple size={16} aria-hidden="true" />
                  EN
                  <CaretDown size={11} aria-hidden="true" />
                </button>
                <div className="invisible absolute right-0 top-full z-10 min-w-[8rem] translate-y-1 pt-2 opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="glass-strong rounded-panel p-2">
                    <li>
                      <span className="block rounded-control px-3.5 py-2.5 text-[0.875rem] text-fg">
                        English
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/*
                Wrapped rather than given `hidden sm:inline-flex` directly: the
                button's own base class sets `inline-flex`, and Tailwind emits
                responsive variants after unprefixed utilities, so `sm:inline-flex`
                would win at every width and the button would never hide.
              */}
              <div className="hidden sm:block">
                <Button href={cta.contactHref} className="px-4 py-2.5 text-sm">
                  {cta.contact}
                </Button>
              </div>

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
            className="glass-nav max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-white/10 lg:hidden"
          >
            <Container>
              <ul className="flex flex-col py-3">
                {nav.map((item) => (
                  <li key={item.label} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-3.5 text-[0.9375rem] text-fg transition-colors hover:text-azure-soft"
                    >
                      {item.label}
                    </Link>
                    {"items" in item && (
                      <ul className="pb-3">
                        {item.items.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="block py-2 pl-4 text-[0.8125rem] text-fg-2 transition-colors hover:text-fg"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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
