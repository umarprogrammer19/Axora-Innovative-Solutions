"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Hero background media.
 *
 * The video sits on top of a CSS light field, so the hero reads correctly before
 * the file downloads and stays intact if the asset is missing entirely. Drop the
 * loop at /public/media/hero-loop.mp4 (see public/media/README.md for specs).
 *
 * The copy in HeroCopy has no panel behind it anymore, it sits directly on this
 * media, so the left-side scrim below is the ONLY thing keeping the headline
 * readable. Loosen it only after checking contrast against a bright frame of
 * the actual video, not just the fallback light field.
 *
 * Motion: a slow push on the media as the hero leaves the viewport. Motivation is
 * depth, the copy stays still while the media drifts, so the scene reads as
 * happening behind the text rather than painted on it.
 *
 * Reduced motion: the whole video layer is removed by the CSS `motion-reduce`
 * variant, which also makes the parallax transform moot since it only ever applies
 * to that layer. This is CSS rather than a render branch on purpose. Branching JSX
 * on useReducedMotion() renders one tree on the server and another on the client,
 * which throws a hydration error for exactly the visitors the branch was meant to
 * help. The hook is used here only inside an effect, where it cannot affect markup.
 */
export function HeroMedia() {
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
      {/* Ambient field. Also the fallback when no video is present. */}
      <div className="absolute inset-0 light-field" />

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
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="size-full object-cover opacity-70"
        >
          <source src="/media/hero-loop.webm" type="video/webm" />
          <source src="/media/hero-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Blueprint field, gives the open right half of the composition structure. */}
      <div className="absolute inset-0 field-grid opacity-80" />

      {/* Scrim. Heavy on the left where the copy sits, open on the right so the
          light core stays visible. Carries full legibility on its own now that
          the copy has no panel backing it. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/35" />
    </div>
  );
}
