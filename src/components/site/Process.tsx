"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/lib/content";

/**
 * Layout family: step rail. Horizontal at lg, vertical below it. Used once.
 *
 * Motion: the rail fills as the section moves through the viewport. Motivation is
 * storytelling, the line is the project timeline and filling it in scroll order is
 * the point of the section.
 *
 * Reduced motion: the CSS `motion-reduce` variant forces the fill to its full
 * length, so the four steps still read as one connected sequence. Done in CSS with
 * an important modifier, because it has to beat the inline transform Motion writes
 * and because branching the render on useReducedMotion() would break hydration.
 *
 * Mobile (< 1024px): the four steps stack into a single column and the rail runs
 * down their left edge. Only the decorative rail duplicates across orientations,
 * the step content exists once in the DOM.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 58%"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative bg-ink py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-fg">
            How a project runs
          </h2>
          <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-fg-2">
            Four moves from first conversation to a system your team relies on. The
            first two take a week between them.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-16 sm:mt-20">
          {/* Rail track. */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px bg-line lg:inset-x-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto"
          />
          <motion.div
            aria-hidden="true"
            data-reveal=""
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-violet motion-reduce:[transform:none]! lg:hidden"
          />
          <motion.div
            aria-hidden="true"
            data-reveal=""
            style={{ scaleX: progress }}
            className="absolute inset-x-0 top-[7px] hidden h-px origin-left bg-violet motion-reduce:[transform:none]! lg:block"
          />

          <ol className="relative grid grid-cols-1 gap-11 lg:grid-cols-4 lg:gap-8">
            {process.map((step, i) => (
              <Reveal as="li" key={step.id} delay={i * 0.07} className="relative pl-9 lg:pt-10 lg:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute top-px left-0 grid size-[15px] place-items-center rounded-full border border-violet bg-ink lg:top-0"
                >
                  <span className="size-[5px] rounded-full bg-violet" />
                </span>

                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-violet-soft">
                  {step.meta}
                </p>
                <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-2">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
