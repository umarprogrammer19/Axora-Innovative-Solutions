import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

/**
 * Layout family: compact dark intro band for interior pages (/services,
 * /contact). Not the home page's full-bleed video Hero, on purpose: that
 * treatment is the one moment on the whole site that should feel like an
 * event, and repeating it on every page would cheapen it. This is a quieter
 * cousin, same aurora-field ambience, no video, a fraction of the height.
 *
 * pt-32 clears the fixed Navbar (68px at rest) with real breathing room, the
 * same margin Hero.tsx budgets for the same reason.
 */
export function PageHero({
  eyebrow,
  heading,
  body,
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-16 sm:pb-20">
      <div aria-hidden="true" className="absolute inset-0 aurora-field opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink" />

      <Container className="relative">
        <div className="max-w-[46ch]">
          {eyebrow && (
            <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-magenta-soft uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className={`text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] text-fg ${eyebrow ? "mt-4" : ""}`}>
            {heading}
          </h1>
          {body && (
            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-fg-2">{body}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
