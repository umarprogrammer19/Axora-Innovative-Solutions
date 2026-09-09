import { Certificate, SealCheck } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MicrosoftMark, SimpleIconMark } from "./BrandMark";
import { trust } from "@/lib/content";

const glyphs: Record<string, Icon> = {
  "ISO 27001": SealCheck,
  "ISO 9001": SealCheck,
  CMMI: Certificate,
};

function BadgeMark({ title }: { title: string }) {
  if (title === "Microsoft") return <MicrosoftMark />;
  if (title === "AWS") {
    return <span className="text-[1.0625rem] font-bold tracking-tight text-onlight">aws</span>;
  }
  if (title === "Google Cloud") {
    return <SimpleIconMark slug="googlecloud" label="Google Cloud" />;
  }
  const Glyph = glyphs[title] ?? SealCheck;
  return <Glyph size={22} className="text-azure" aria-hidden="true" />;
}

/**
 * Layout family: narrow heading rail beside a row of certification badges,
 * light gray band. Sits directly under Industries with no gap, reading as
 * that section's closing strip in the reference.
 *
 * Mobile (< 640px): badges wrap to two columns.
 */
export function TrustBadges() {
  return (
    <section className="relative bg-paper py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="text-[0.6875rem] font-mono tracking-[0.2em] text-violet uppercase">
              {trust.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold leading-[1.2] text-onlight">
              {trust.headingLine1}
              <br />
              {trust.headingLine2Lead}{" "}
              <span className="text-azure">{trust.headingAccent}</span>
            </h2>
          </Reveal>

          <Reveal
            delay={0.08}
            className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6"
          >
            {trust.badges.map((badge) => (
              <div key={badge.title} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center">
                  <BadgeMark title={badge.title} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.8125rem] font-semibold text-onlight">
                    {badge.title}
                  </span>
                  <span className="block text-[0.75rem] text-onlight-3">{badge.subtitle}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
