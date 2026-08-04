"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Hero background media.
 *
 * The video sits on top of a CSS light field, so the hero reads correctly before
 * the file downloads and stays intact if the asset is missing entirely. Drop the
 * loop at /public/media/hero-loop.mp4 (see public/media/README.md for specs).
 *
 * Motion: a slow push on the media as the hero leaves the viewport. Motivation is
 * depth, the copy layer stays still while the media drifts, which signals that the
 * glass panel is in front of the scene rather than painted on it. Off entirely
 * under reduced motion, where the video does not autoplay either.
 */
export function HeroMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      {/* Ambient field. Also the fallback when no video is present. */}
      <div className="absolute inset-0 light-field" />

      {!reduce && (
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 will-change-transform"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className="size-full object-cover opacity-70"
          >
            <source src="/media/hero-loop.webm" type="video/webm" />
            <source src="/media/hero-loop.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}

      {/* Blueprint field, organises the empty right half of the composition. */}
      <div className="absolute inset-0 field-grid opacity-70" />

      {/* Scrim. Heavy on the left where the copy sits, open on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45" />
    </div>
  );
}
