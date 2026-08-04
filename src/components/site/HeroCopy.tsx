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
 * No panel. The copy sits directly on the video, the way systemsltd.com's hero
 * does, so the scrim on HeroMedia is the only thing carrying legibility here -
 * see the comment there before loosening it.
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
    <div className="relative">
      <motion.h1
        {...step(0)}
        className="max-w-[15ch] text-[clamp(2.5rem,5.6vw,4.25rem)] font-semibold leading-[1.04] text-fg"
      >
        Whatever Slows You Down, We{" "}
        <span className="bg-gradient-to-r from-azure to-azure-soft bg-clip-text text-transparent">
          Automate
        </span>{" "}
        It
      </motion.h1>

      <motion.p
        {...step(1)}
        className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-fg-2"
      >
        {hero.sub}
      </motion.p>

      <motion.div {...step(2)} className="mt-9 flex flex-wrap items-center gap-3">
        <Button href={cta.contactHref}>{cta.contact}</Button>
        <Button href={cta.workHref} variant="ghost">
          {cta.work}
        </Button>
      </motion.div>

      <motion.ul {...step(3)} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
        {hero.badges.map((badge, i) => {
          const Icon = badgeIcons[i];
          return (
            <li
              key={badge}
              className="inline-flex items-center gap-2 text-[0.8125rem] text-fg-2"
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
