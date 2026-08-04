import { Gauge, Kanban, Plugs, Repeat, Robot } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

import { AssetSlot } from "@/components/ui/AssetSlot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content";

const icons: Record<string, Icon> = {
  workflow: Repeat,
  agents: Robot,
  integration: Plugs,
  software: Kanban,
  operate: Gauge,
};

const panel =
  "group relative overflow-hidden rounded-panel border border-paper-line bg-panel-light " +
  "transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:-translate-y-0.5 hover:border-paper-line-2";

function CellHead({ id, title }: { id: string; title: string }) {
  const Glyph = icons[id];
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-control border border-paper-line-2 bg-azure/8 text-azure-deep">
        <Glyph size={17} aria-hidden="true" />
      </span>
      <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-onlight">
        {title}
      </h3>
    </div>
  );
}

/**
 * Layout family: asymmetric bento, 5 services and exactly 5 cells.
 * Row 1 carries two wide cells, row 2 carries three narrow ones. No empty tiles.
 *
 * Row 2 runs 5 / 4 / 3 rather than 4 / 4 / 4 on purpose. Three equal tiles side by
 * side collapses back into the generic feature-card row this grid exists to avoid,
 * so the widths step down and the copy shortens with them.
 *
 * Background diversity: cell 1 holds a real graphic slot, cell 2 an accent light
 * field, cell 3 the blueprint pattern. Cells 4 and 5 stay plain so the grid has
 * quiet space in it.
 *
 * Mobile (< 768px): single column. At md the first cell spans both columns and the
 * remaining four pair up, so there is never a hanging half-row.
 *
 * Paper band: matches the reference's white "what we do" grid, the second
 * light section on the page.
 */
export function Services() {
  const [feature, second, third, fourth, fifth] = services;

  return (
    <section id="services" className="relative bg-paper-2 py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-onlight-3 uppercase">
            What we build
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-onlight">
            Built for the operation you actually run.
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 sm:mt-16"
        >
          {/* Feature cell, holds the section's only graphic. */}
          <article className={`${panel} md:col-span-2 lg:col-span-7`}>
            <div className="grid grid-cols-1 gap-6 p-7 sm:grid-cols-5 sm:gap-8 sm:p-8">
              <div className="sm:col-span-3">
                <CellHead id={feature.id} title={feature.title} />
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-onlight-2">
                  {feature.body}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {feature.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 text-[0.875rem] text-onlight-2"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-4 shrink-0 bg-azure/60"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <AssetSlot
                label="Workflow diagram graphic, portrait 3:4"
                className="min-h-[220px] sm:col-span-2"
              />
            </div>
          </article>

          {/* Accent light field. */}
          <article className={`${panel} lg:col-span-5`}>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(130%_105%_at_100%_0%,rgb(61_110_247/0.10),transparent_58%)]"
            />
            <div className="relative p-7 sm:p-8">
              <CellHead id={second.id} title={second.title} />
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-onlight-2">
                {second.body}
              </p>
              <ul className="mt-6 space-y-2.5">
                {second.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-[0.875rem] text-onlight-2"
                  >
                    <span aria-hidden="true" className="h-px w-4 shrink-0 bg-azure/60" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Blueprint pattern. */}
          <article className={`${panel} lg:col-span-5`}>
            <div
              aria-hidden="true"
              className="absolute inset-0 field-grid-light [mask-image:linear-gradient(to_top,black,transparent_78%)]"
            />
            <div className="relative p-7 sm:p-8">
              <CellHead id={third.id} title={third.title} />
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-onlight-2">
                {third.body}
              </p>
            </div>
          </article>

          <article className={`${panel} lg:col-span-4`}>
            <div className="p-7 sm:p-8">
              <CellHead id={fourth.id} title={fourth.title} />
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-onlight-2">
                {fourth.body}
              </p>
            </div>
          </article>

          <article className={`${panel} lg:col-span-3`}>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure/50 to-transparent"
            />
            <div className="p-7 sm:p-8">
              <CellHead id={fifth.id} title={fifth.title} />
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-onlight-2">
                {fifth.body}
              </p>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
