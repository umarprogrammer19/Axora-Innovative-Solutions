"use client";

import { motion } from "motion/react";
import { FileText, LockKey, ShieldCheck } from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/Button";
import { cta, hero } from "@/lib/content";

const badgeIcons = [ShieldCheck, FileText, LockKey];

/**
 * Hero copy layer, four text elements and no more: headline, subtext, CTA pair,
 * trust badges. No eyebrow, no scroll cue, no decoration strip.
 *
 * Motion: one staggered entry on load. Motivation is hierarchy, the eye is walked
 * from the claim to the action in the order we want it read. Reduced motion is
 * handled globally by MotionProvider, so this stays unbranched and hydrates cleanly.
 */
export function HeroCopy() {
  const step = (i: number) => ({
    "data-reveal": "",
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.7,
      delay: 0.08 + i * 0.09,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <div className="glass relative overflow-hidden rounded-panel p-7 sm:p-10 lg:p-12">
      {/* Lit top edge. Sells the panel as a physical sheet over the video. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure/70 to-transparent"
      />

      <motion.h1
        {...step(0)}
        className="max-w-[15ch] text-[clamp(2.125rem,4.6vw,3.5rem)] font-semibold leading-[1.06] text-fg"
      >
        Whatever Slows You Down, We{" "}
        <span className="bg-gradient-to-r from-azure-soft to-violet-soft bg-clip-text text-transparent">
          Automate
        </span>{" "}
        It
      </motion.h1>

      <motion.p
        {...step(1)}
        className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-fg-2"
      >
        {hero.sub}
      </motion.p>

      <motion.div {...step(2)} className="mt-9 flex flex-wrap items-center gap-3">
        <Button href={cta.contactHref}>{cta.contact}</Button>
        <Button href={cta.workHref} variant="ghost">
          {cta.work}
        </Button>
      </motion.div>

      <motion.ul
        {...step(3)}
        className="mt-9 flex flex-wrap gap-2 border-t border-white/[0.07] pt-7"
      >
        {hero.badges.map((badge, i) => {
          const Icon = badgeIcons[i];
          return (
            <li
              key={badge}
              className="inline-flex items-center gap-2 rounded-control border border-line-2/70 bg-white/[0.03] px-3 py-2 text-[0.8125rem] text-fg-2"
            >
              <Icon size={15} className="shrink-0 text-azure-soft" aria-hidden="true" />
              {badge}
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
