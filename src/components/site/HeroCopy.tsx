"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/Button";
import { cta, hero } from "@/lib/content";

/**
 * Hero copy layer: eyebrow, headline, subtext, CTA pair, trusted-by logo row.
 *
 * No panel. The copy sits directly on HeroGraphic, the way the reference's
 * hero does, so the scrim there is the only thing carrying legibility here -
 * see the comment in HeroGraphic before loosening it.
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
      <motion.p
        {...step(0)}
        className="bg-gradient-to-r from-magenta-soft to-azure-soft bg-clip-text font-mono text-[0.75rem] tracking-[0.2em] text-transparent uppercase"
      >
        {hero.eyebrow}
      </motion.p>

      <motion.h1
        {...step(1)}
        className="mt-4 text-[clamp(2.5rem,5.6vw,4.25rem)] font-semibold leading-[1.04] text-fg"
      >
        {hero.headline.lead}
        <br />
        <span className="bg-gradient-to-r from-azure to-violet bg-clip-text text-transparent">
          {hero.headline.accent}
        </span>{" "}
        {hero.headline.tail}
      </motion.h1>

      <motion.p
        {...step(2)}
        className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-fg-2"
      >
        {hero.sub}
      </motion.p>

      <motion.div {...step(3)} className="mt-9 flex flex-wrap items-center gap-3">
        <Button href={cta.exploreSolutionsHref}>{cta.exploreSolutions}</Button>
        <Button href={cta.bookBriefingHref} variant="ghost" className="!border-line-2">
          {cta.bookBriefing}
          <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </motion.div>

      {/* <motion.div {...step(4)} className="mt-12">
        <p className="text-[0.8125rem] text-fg-3">{hero.trustedLabel}</p>
        <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
          {hero.logos.map((logo) => (
            <li
              key={logo}
              className="text-[1.0625rem] font-bold tracking-tight text-fg-2/80 grayscale transition-[filter] duration-200 hover:grayscale-0 hover:text-fg"
            >
              {logo}
            </li>
          ))}
        </ul>
      </motion.div> */}
    </div>
  );
}
