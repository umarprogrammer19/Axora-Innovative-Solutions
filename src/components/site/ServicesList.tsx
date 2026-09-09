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
import { cta, services } from "@/lib/content";

const icons: Record<string, Icon> = {
  automation: Cpu,
  data: ChartBar,
  integration: Compass,
  agents: Robot,
  security: ShieldCheck,
  software: CodeSimple,
};

/**
 * Layout family: divided list, one hairline between rows rather than a
 * bordered box around each (see globals.css design-token comment on the two
 * radius sizes, cards are for elevation, a listing page's six items do not
 * need six boxes). White band, the fuller cousin of the home page bento: the
 * same six services, each with the capability bullets the home page has no
 * room for.
 *
 * Mobile (< 640px): icon moves above the title instead of beside it.
 */
export function ServicesList() {
  return (
    <section className="relative bg-panel-light py-20 sm:py-24">
      <Container>
        <div className="divide-y divide-paper-line border-t border-paper-line">
          {services.map((service, i) => {
            const Glyph = icons[service.id];
            return (
              <Reveal
                as="div"
                key={service.id}
                delay={i * 0.05}
                id={service.id}
                className="scroll-mt-28 py-10 sm:py-12"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
                  <div className="flex items-center gap-4 sm:w-[15rem] sm:shrink-0 sm:flex-col sm:items-start sm:gap-5">
                    <span
                      aria-hidden="true"
                      className="grid size-12 shrink-0 place-items-center rounded-control border border-azure/25 text-azure"
                    >
                      <Glyph size={22} />
                    </span>
                    <h2 className="text-[1.25rem] font-semibold tracking-[-0.01em] text-onlight">
                      {service.title}
                    </h2>
                  </div>

                  <div className="flex-1">
                    <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-onlight-3">
                      {service.body}
                    </p>
                    <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-onlight-2"
                        >
                          <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-azure/60" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <Link
            href={cta.contactHref}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-azure transition-colors duration-200 hover:text-azure-deep"
          >
            Talk to us about a project
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
