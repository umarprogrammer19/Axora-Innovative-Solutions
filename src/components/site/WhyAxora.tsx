import { ChartLineUp, ShieldCheck, Timer } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { why } from "@/lib/content";

/**
 * Layout family: stat band over a reason grid, no card containers anywhere.
 * Used once. Grouping is done with hairlines and space, which is why this section
 * reads quieter than the bento above it.
 *
 * The three stat chips rotate through the full accent ramp (azure, violet,
 * magenta), the one place on the page besides the hero headline where the
 * decorative hues appear, matching the reference's colored stat icons.
 *
 * Metrics are illustrative placeholders. See content.ts.
 *
 * Mobile (< 640px): stats stack, reasons collapse to one column.
 */
const statIcons: [Icon, string][] = [
  [Timer, "bg-azure-deep"],
  [ChartLineUp, "bg-violet-deep"],
  [ShieldCheck, "bg-magenta-deep"],
];

const headingWords = why.heading.split(" ");
const headingLead = headingWords.slice(0, -1).join(" ");
const headingAccent = headingWords[headingWords.length - 1];

export function WhyAxora() {
  return (
    <section id="why" className="relative bg-ink py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-fg">
            {headingLead}{" "}
            <span className="bg-gradient-to-r from-azure via-violet to-violet-deep bg-clip-text text-transparent">
              {headingAccent}
            </span>
          </h2>
        </Reveal>

        <Reveal
          delay={0.06}
          className="mt-12 grid grid-cols-1 gap-9 border-y border-line py-10 sm:grid-cols-3 sm:gap-8 sm:py-11"
        >
          {why.stats.map((stat, i) => {
            const [Glyph, chip] = statIcons[i];
            return (
              <div key={stat.label}>
                <span
                  aria-hidden="true"
                  className={`grid size-9 place-items-center rounded-full text-white ${chip}`}
                >
                  <Glyph size={17} />
                </span>
                <p className="mt-4 font-mono text-[clamp(1.75rem,3vw,2.25rem)] leading-none tracking-tight text-fg">
                  {stat.value}
                </p>
                <p className="mt-3 max-w-[26ch] text-[0.875rem] leading-snug text-fg-3">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-14 gap-y-11 md:grid-cols-2 sm:mt-16">
          {why.reasons.map((reason, i) => (
            <Reveal as="div" key={reason.title} delay={i * 0.06}>
              <div className="border-t border-line pt-6">
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">
                  {reason.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-fg-2">
                  {reason.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
