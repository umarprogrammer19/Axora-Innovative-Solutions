"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { projects, projectsSection } from "@/lib/content";

const tones: Record<string, { tag: string; metric: string }> = {
  azure: { tag: "border-azure/30 bg-azure/10 text-azure-soft", metric: "text-azure-soft" },
  violet: { tag: "border-violet/30 bg-violet/10 text-violet-soft", metric: "text-violet-soft" },
  magenta: { tag: "border-magenta/30 bg-magenta/10 text-magenta-soft", metric: "text-magenta-soft" },
};

const arrowButton =
  "glass grid size-11 shrink-0 place-items-center rounded-full text-fg transition-colors duration-200 " +
  "hover:border-white/20 hover:bg-white/[0.07] disabled:pointer-events-none disabled:opacity-30";

/**
 * Layout family: single-slide carousel, dark band. Used once, and
 * deliberately not another "heading rail beside a card grid" section (that
 * family already carries Services, Industries, and Trust Badges) so the page
 * does not read as the same section repeated with different words.
 *
 * One project on screen at a time rather than a peek-at-the-next-card
 * scroller: with only three case studies, showing one large and letting the
 * arrows and dots carry navigation reads calmer than a partial fourth card
 * hinting at more.
 *
 * No eyebrow here on purpose: Hero, Services, Impact, Industries, Trust
 * Badges, Partner Ecosystem, and Meaningful Work already carry one each, and
 * a headline this direct does not need a label above it.
 *
 * Mobile: same single-slide layout, image stacks above copy.
 */
export function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const project = projects[index];
  const tone = tones[project.tone];

  function go(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex((next + projects.length) % projects.length);
  }

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-[26ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-fg">
            {projectsSection.heading.lead}{" "}
            <span className="bg-gradient-to-r from-azure via-violet to-magenta bg-clip-text text-transparent">
              {projectsSection.heading.accent}
            </span>
          </h2>
          <p className="max-w-[32ch] text-[0.9375rem] leading-relaxed text-fg-2">
            {projectsSection.body}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="relative mt-14 sm:mt-16">
          <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous project"
              className={`${arrowButton} order-2 mx-auto lg:order-1 lg:mx-0`}
            >
              <ArrowLeft size={18} />
            </button>

            <div className="relative order-1 overflow-hidden lg:order-2">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.article
                  key={project.id}
                  custom={direction}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 * direction }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 gap-8 rounded-panel border border-line bg-panel/60 p-6 sm:p-8 md:grid-cols-2 md:gap-10"
                >
                  <AssetSlot label={project.asset} className="aspect-[4/3]" />

                  <div className="flex flex-col">
                    <span
                      className={`inline-flex w-fit rounded-control border px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide uppercase ${tone.tag}`}
                    >
                      {project.sector}
                    </span>

                    <h3 className="mt-4 text-[1.375rem] font-semibold tracking-[-0.01em] text-fg">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">
                      {project.body}
                    </p>

                    <div className="mt-auto flex gap-8 border-t border-line pt-6">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className={`text-[1.75rem] leading-none font-semibold ${tone.metric}`}>
                            {metric.value}
                          </p>
                          <p className="mt-1.5 text-[0.75rem] leading-snug text-fg-3">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 text-[0.8125rem] font-medium text-fg-3">{project.client}</p>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next project"
              className={`${arrowButton} order-3 mx-auto lg:mx-0`}
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show project ${i + 1} of ${projects.length}: ${p.client}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  i === index ? "w-6 bg-azure" : "w-1.5 bg-line-2 hover:bg-fg-3"
                }`}
              />
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <a
            href={projectsSection.linkHref}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-azure-soft transition-colors duration-200 hover:text-fg"
          >
            {projectsSection.link}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
