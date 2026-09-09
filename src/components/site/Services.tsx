import {
  ArrowRight,
  ChartBar,
  CodeSimple,
  Compass,
  Cpu,
  Robot,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services, servicesSection } from "@/lib/content";

const icons: Record<string, Icon> = {
  automation: Cpu,
  data: ChartBar,
  integration: Compass,
  agents: Robot,
  security: ShieldCheck,
  software: CodeSimple,
};

/**
 * Layout family: even card grid, white band. Six services, six equal cards,
 * three per row on desktop. Ran dark for a pass (matching a reference
 * screenshot with all six cards the same size on a dark surface), flipped
 * back to white on request; hierarchy still comes from the icon colour and
 * copy rather than card size.
 *
 * Mobile (< 640px): one column. sm: two columns. lg: three columns.
 */
export function Services() {
  return (
    <section id="services" className="relative bg-panel-light py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[52ch]">
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-magenta uppercase">
            {servicesSection.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-onlight">
            {servicesSection.heading.lead}{" "}
            <span className="bg-gradient-to-r from-azure to-violet bg-clip-text text-transparent">
              {servicesSection.heading.accent}
            </span>
          </h2>
          <p className="mt-5 max-w-[48ch] text-[0.9375rem] leading-relaxed text-onlight-3">
            {servicesSection.body}
          </p>
          <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 sm:divide-x sm:divide-paper-line-2">
            {servicesSection.stats.map((stat) => (
              <li
                key={stat}
                className="text-[0.8125rem] font-medium text-onlight-2 sm:pl-4 sm:first:pl-0"
              >
                {stat}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16"
        >
          {services.map((service) => {
            const Glyph = icons[service.id];
            return (
              <article
                key={service.id}
                className="rounded-panel border border-paper-line bg-panel-light p-7 transition-colors duration-300 hover:border-paper-line-2"
              >
                <span
                  aria-hidden="true"
                  className="grid size-11 place-items-center rounded-control border border-violet/25 text-violet"
                >
                  <Glyph size={20} />
                </span>
                <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.01em] text-onlight">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-onlight-3">
                  {service.body}
                </p>
              </article>
            );
          })}
        </Reveal>

        <Reveal delay={0.14} className="mt-10 flex justify-center">
          <Link
            href={servicesSection.exploreHref}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-azure transition-colors duration-200 hover:text-azure-deep"
          >
            {servicesSection.exploreLink}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
