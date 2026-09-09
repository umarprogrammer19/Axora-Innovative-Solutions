"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Hero background: the reference's flowing blue-violet-magenta particle
 * swirl, now the real clip at public/Hero.mp4.
 *
 * aurora-field sits behind the video as the fallback and first-paint colour,
 * so the hero holds its composition before the file decodes and stays intact
 * for visitors with `prefers-reduced-motion: reduce`, who never get the video
 * at all (the whole layer is removed by the CSS `motion-reduce` variant, not
 * a render branch - see the note on the effect below).
 *
 * Motion: a slow push on the video as the hero leaves the viewport. Motivation
 * is depth, the copy stays still while the media drifts, so the scene reads as
 * happening behind the text rather than painted on it.
 */
export function HeroGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // CSS hides the layer; this stops the file decoding in the background too.
  useEffect(() => {
    if (reduce) videoRef.current?.pause();
  }, [reduce]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      {/* Fallback and first-paint colour, holds the composition before the video decodes. */}
      <div className="absolute inset-0 aurora-field" />

      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform motion-reduce:hidden"
      >

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="size-full object-cover"
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Scrim. Heavy on the left where the copy sits, open on the right so the
          light core stays visible. Carries full legibility on its own since the
          copy has no panel backing it. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/0" />
    </div>
  );
}
