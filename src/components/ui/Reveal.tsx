"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll reveal. Motivation: sections carry a reading order, and staggering the
 * entry tells the eye where to start.
 *
 * The initial state is unconditional so the server and client render the same
 * markup. Reduced motion is handled globally by MotionProvider, which snaps the
 * y offset and lets only the opacity fade. See MotionProvider for why this is not
 * a `useReducedMotion()` branch.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
