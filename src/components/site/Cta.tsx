import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cta, finalCta } from "@/lib/content";

/**
 * Layout family: centred closing banner over vertical light beams. Reused
 * as the closing section on both / and /services, directly above the
 * footer, matching the reference's final CTA band.
 */
export function Cta() {
  return (
    <section id="cta" className="relative overflow-hidden bg-ink py-24 text-center sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 beam-field opacity-70" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-[38ch]">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.16] text-fg">
            {finalCta.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-9 flex flex-col items-center gap-4">
          <Button href={cta.startTransformationHref}>{cta.startTransformation}</Button>
          <Link
            href={cta.bookBriefingHref}
            className="inline-flex items-center gap-1.5 text-[0.875rem] text-fg-2 transition-colors duration-200 hover:text-fg"
          >
            {cta.bookBriefing}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
