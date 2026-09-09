import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { servicesPage } from "@/lib/content";

/**
 * Layout family: numbered horizontal rail, four steps. White band, distinct
 * from ServicesList's divided rows directly above it (different content
 * shape: a sequence rather than a catalogue) so the two white sections in a
 * row still read as different moments.
 *
 * Mobile (< 768px): steps stack into a single column, numbers move above
 * the title instead of beside it.
 */
export function ProcessSteps() {
  return (
    <section className="relative bg-paper py-20 sm:py-24">
      <Container>
        <Reveal>
          <h2 className="max-w-[24ch] text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.16] text-onlight">
            {servicesPage.process.heading}
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-12 grid grid-cols-1 gap-8 border-t border-paper-line pt-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4"
        >
          {servicesPage.process.steps.map((step, i) => (
            <div key={step.title}>
              <span className="font-mono text-[0.8125rem] text-azure">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[1.0625rem] font-semibold text-onlight">{step.title}</h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-onlight-3">{step.body}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
