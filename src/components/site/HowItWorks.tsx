import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorks } from "@/lib/content";

/**
 * Layout family: four-step timeline keyed by week number, white band.
 * Distinct from /services' ProcessSteps (Discover/Design/Build/Operate,
 * numbered 01-04): this one is week-labelled and lives on the home page,
 * pitched at the SME buyer asking "how fast" rather than the enterprise
 * buyer asking "how do you run an engagement".
 *
 * Mobile (< 768px): steps stack into a single column.
 */
export function HowItWorks() {
  return (
    <section className="relative bg-panel-light py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[36ch]">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-onlight">
            {howItWorks.heading}
          </h2>
          <p className="mt-3 text-[0.9375rem] text-onlight-3">{howItWorks.subheading}</p>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-12 grid grid-cols-1 gap-8 border-t border-paper-line pt-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4"
        >
          {howItWorks.steps.map((step) => (
            <div key={step.week}>
              <span className="font-mono text-[0.8125rem] text-azure">{step.week}</span>
              <h3 className="mt-3 text-[1.0625rem] font-semibold text-onlight">{step.title}</h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-onlight-3">{step.body}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
