import { Gauge, Kanban, Plugs, Repeat, Robot } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

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

/** Rotates through the page's decorative ramp, same three hues WhyAxora uses. */
const chipTones = ["bg-violet", "bg-violet-deep", "bg-magenta-deep", "bg-violet", "bg-violet-deep"];

const card =
  "group relative flex flex-col overflow-hidden rounded-panel border border-line bg-panel " +
  "transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:-translate-y-1 hover:border-line-2 hover:shadow-[0_24px_60px_-32px_rgb(120_98_190/0.45)]";

function IconChip({ id, tone, size = "lg" }: { id: string; tone: string; size?: "lg" | "md" }) {
  const Glyph = icons[id];
  const box = size === "lg" ? "size-12" : "size-11";
  const glyph = size === "lg" ? 22 : 19;
  return (
    <span aria-hidden="true" className={`grid ${box} place-items-center rounded-full text-white ${tone}`}>
      <Glyph size={glyph} />
    </span>
  );
}

function Points({ points }: { points: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {points.map((point) => (
        <li key={point} className="flex items-center gap-2.5 text-[0.875rem] text-fg-2">
          <span aria-hidden="true" className="h-px w-4 shrink-0 bg-violet-deep/70" />
          {point}
        </li>
      ))}
    </ul>
  );
}

/**
 * Layout family: asymmetric bento, 5 services and exactly 5 cells. Row 1 carries
 * two wide cells, row 2 carries three narrow ones. No empty tiles.
 *
 * Black band, matching the rest of the page (bg-panel over bg-ink, one elevation
 * step up, same surfaces the stat chips in WhyAxora use). Every icon sits in a
 * filled, rotating violet/magenta circular chip rather than a bordered square, so
 * this reads as the same design language as the stat band instead of a leftover
 * light-mode holdover.
 *
 * Background diversity: cell 1 carries a violet radial glow, cell 3 the blueprint
 * pattern. Cells 2, 4, 5 stay quiet so the grid still has calm space in it.
 *
 * Mobile (< 768px): single column. At md the first cell spans both columns and the
 * remaining four pair up, so there is never a hanging half-row.
 */
export function Services() {
  const [feature, second, third, fourth, fifth] = services;

  return (
    <section id="services" className="relative bg-ink py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-fg-3 uppercase">
            What we build
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-fg">
            Built for the operation you actually{" "}
            <span className="bg-gradient-to-r from-violet-deep to-magenta-deep bg-clip-text text-transparent">
              run.
            </span>
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 sm:mt-16"
        >
          {/* Feature cell, the flagship service. */}
          <article className={`${card} md:col-span-2 lg:col-span-7`}>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,rgb(120_98_190/0.22),transparent_62%)]"
            />
            <div className="relative p-7 sm:p-9">
              <IconChip id={feature.id} tone={chipTones[0]} />
              <h3 className="mt-5 text-[1.1875rem] font-semibold tracking-[-0.01em] text-fg">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-fg-2">
                {feature.body}
              </p>
              <Points points={feature.points} />
            </div>
          </article>

          {/* Second cell. */}
          <article className={`${card} lg:col-span-5`}>
            <div className="relative p-7 sm:p-9">
              <IconChip id={second.id} tone={chipTones[1]} />
              <h3 className="mt-5 text-[1.1875rem] font-semibold tracking-[-0.01em] text-fg">
                {second.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">{second.body}</p>
              <Points points={second.points} />
            </div>
          </article>

          {/* Third cell, blueprint pattern. */}
          <article className={`${card} lg:col-span-4`}>
            <div
              aria-hidden="true"
              className="absolute inset-0 field-grid [mask-image:linear-gradient(to_top,black,transparent_78%)]"
            />
            <div className="relative p-7 sm:p-8">
              <IconChip id={third.id} tone={chipTones[2]} size="md" />
              <h3 className="mt-4 text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                {third.title}
              </h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-fg-2">{third.body}</p>
            </div>
          </article>

          <article className={`${card} lg:col-span-4`}>
            <div className="relative p-7 sm:p-8">
              <IconChip id={fourth.id} tone={chipTones[3]} size="md" />
              <h3 className="mt-4 text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                {fourth.title}
              </h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-fg-2">{fourth.body}</p>
            </div>
          </article>

          <article className={`${card} lg:col-span-4`}>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-magenta/50 to-transparent"
            />
            <div className="relative p-7 sm:p-8">
              <IconChip id={fifth.id} tone={chipTones[4]} size="md" />
              <h3 className="mt-4 text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                {fifth.title}
              </h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-fg-2">{fifth.body}</p>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
