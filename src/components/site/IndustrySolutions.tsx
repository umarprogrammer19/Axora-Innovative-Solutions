import { ArrowRight, Bank, Heartbeat, House, Scales } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { industrySolutions, industrySolutionsSection } from "@/lib/content";

const icons: Record<string, Icon> = {
  insurance: Bank,
  legal: Scales,
  healthcare: Heartbeat,
  realestate: House,
};

const tones: Record<number, { chip: string }> = {
  0: { chip: "bg-azure/15 text-azure-soft" },
  1: { chip: "bg-violet/15 text-violet-soft" },
  2: { chip: "bg-magenta/15 text-magenta-soft" },
  3: { chip: "bg-azure/15 text-azure-soft" },
};

/**
 * Layout family: four industry cards, dark band. Distinct from the plain
 * icon-and-label Industries grid elsewhere on the page: each card here
 * carries a specific pain point and a dedicated CTA, closer to a mini
 * landing page per vertical than a directory entry.
 *
 * Mobile (< 640px): one column. sm: two columns. lg: four columns.
 */
export function IndustrySolutions() {
  return (
    <section id="industry-solutions" className="relative bg-ink py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-magenta-soft uppercase">
            {industrySolutionsSection.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-fg">
            {industrySolutionsSection.heading}
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16"
        >
          {industrySolutions.map((item, i) => {
            const Glyph = icons[item.id];
            const tone = tones[i];
            return (
              <article
                key={item.id}
                className="flex flex-col rounded-panel border border-line bg-panel/60 p-7"
              >
                <span
                  aria-hidden="true"
                  className={`grid size-11 place-items-center rounded-control ${tone.chip}`}
                >
                  <Glyph size={20} />
                </span>
                <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-fg-2">{item.body}</p>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.8125rem] font-medium text-azure-soft transition-colors duration-200 hover:text-fg"
                >
                  {item.link}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
