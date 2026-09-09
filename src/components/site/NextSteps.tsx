import { ArrowRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { nextSteps } from "@/lib/content";

const tones: Record<string, string> = {
  azure: "text-azure-soft",
  violet: "text-violet-soft",
  magenta: "text-magenta-soft",
};

/**
 * Layout family: three commitment-level paths over vertical light beams,
 * dark closing band. This is the home page's actual closing section now,
 * replacing the plain Cta banner (still used on /services): three concrete
 * next steps at different commitment levels reads as more useful than one
 * generic "get in touch" button, and having both on the same page would be
 * a duplicate CTA.
 *
 * Mobile (< 640px): paths stack, CTA row wraps.
 */
export function NextSteps() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 beam-field opacity-70" />

      <Container className="relative">
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.16] text-fg">
            {nextSteps.heading}
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mx-auto mt-12 grid max-w-[64rem] grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {nextSteps.paths.map((path) => (
            <div
              key={path.title}
              className="rounded-panel border border-line bg-panel/60 p-7 text-left"
            >
              <h3 className="text-[1.0625rem] font-semibold text-fg">{path.title}</h3>
              <p className={`mt-2 text-[1.375rem] font-semibold leading-none ${tones[path.tone]}`}>
                {path.price}
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-fg-2">{path.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.14} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button href={nextSteps.ctas[0].href}>{nextSteps.ctas[0].label}</Button>
          <Button href={nextSteps.ctas[1].href} variant="ghost" className="!border-line-2">
            {nextSteps.ctas[1].label}
          </Button>
          <Link
            href={nextSteps.ctas[2].href}
            className="inline-flex items-center gap-1.5 text-[0.875rem] text-fg-2 transition-colors duration-200 hover:text-fg"
          >
            {nextSteps.ctas[2].label}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
