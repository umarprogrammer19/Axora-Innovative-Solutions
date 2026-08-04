"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { faqs } from "@/lib/content";

/**
 * Layout family: sticky section heading beside a disclosure list. Used once.
 * The right column holds a real interactive control rather than an explainer
 * paragraph, which is the only reason the heading sits beside it.
 *
 * Motion: height and opacity on open and close. Motivation is state transition,
 * the panel needs to look like it belongs to the question that opened it. Under
 * reduced motion the panel snaps with no travel.
 *
 * Mobile (< 1024px): heading stacks above the list, sticky positioning drops away.
 *
 * Paper band, fourth light section on the page.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  const duration = reduce ? 0 : 0.32;

  return (
    <section id="faq" className="relative bg-paper py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-onlight lg:sticky lg:top-28">
              Questions we get before the first call
            </h2>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-paper-line">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                const panelId = `${baseId}-panel-${i}`;
                const buttonId = `${baseId}-button-${i}`;

                return (
                  <li key={faq.q} className="border-b border-paper-line">
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left text-onlight transition-colors duration-200 hover:text-violet-ink"
                      >
                        <span className="text-[1.0625rem] font-medium leading-snug text-current">
                          {faq.q}
                        </span>
                        <span
                          aria-hidden="true"
                          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-control border border-paper-line-2 text-onlight-2"
                        >
                          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[68ch] pr-12 pb-7 text-[0.9375rem] leading-relaxed text-onlight-2">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
