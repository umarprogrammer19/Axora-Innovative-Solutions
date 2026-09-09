import { Cloud, Cpu, ShieldCheck, TrendUp } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { impact } from "@/lib/content";

const icons: Icon[] = [TrendUp, Cpu, Cloud, ShieldCheck];

const tones: Record<string, { border: string; chip: string; value: string }> = {
  azure: { border: "border-line", chip: "bg-azure/15 text-azure-soft", value: "text-fg" },
  violet: { border: "border-violet/25", chip: "bg-violet/15 text-violet-soft", value: "text-fg" },
  magenta: { border: "border-magenta/30", chip: "bg-magenta/15 text-magenta-soft", value: "text-magenta-soft" },
};

/**
 * Layout family: narrow copy rail beside a row of four stat cards, dark band.
 * The reference's "AI that drives outcomes" section, sitting directly under
 * the white Services band.
 *
 * Mobile (< 640px): stat cards stack to one column.
 */
export function Impact() {
  return (
    <section id="impact" className="relative bg-ink py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className="bg-gradient-to-r from-magenta-soft to-azure-soft bg-clip-text font-mono text-[0.6875rem] tracking-[0.2em] text-transparent uppercase">
              {impact.eyebrow}
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.14] text-fg">
              {impact.heading.lead}{" "}
              <span className="bg-gradient-to-r from-azure to-azure-soft bg-clip-text text-transparent">
                {impact.heading.accent}
              </span>
            </h2>
            <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-fg-2">
              {impact.body}
            </p>
            <div className="mt-8">
              <Button href={impact.ctaHref} variant="ghost" className="!border-line-2">
                {impact.cta}
              </Button>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4"
          >
            {impact.stats.map((stat, i) => {
              const Glyph = icons[i];
              const tone = tones[stat.tone];
              return (
                <div
                  key={stat.label}
                  className={`rounded-panel border bg-panel/40 p-6 ${tone.border}`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-11 place-items-center rounded-full ${tone.chip}`}
                  >
                    <Glyph size={20} />
                  </span>
                  <p className={`mt-5 text-[2rem] leading-none font-semibold tracking-tight ${tone.value}`}>
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.9375rem] font-semibold text-fg">{stat.label}</p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-3">{stat.body}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
