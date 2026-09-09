import { ArrowRight } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { meaningfulWork } from "@/lib/content";

/**
 * Layout family: lavender card, text rail, photo, stat column. The
 * reference's one warm-toned section, floated as a rounded card on the white
 * canvas rather than running full-bleed, matching PartnerEcosystem's card
 * treatment directly above it.
 *
 * The team photo has no source asset (see AssetSlot); the frame keeps its
 * aspect ratio so dropping a real photo in later is a one-line change.
 *
 * Mobile (< 1024px): stacks text, then photo, then stats.
 */
export function MeaningfulWork() {
  return (
    <section className="relative bg-panel-light py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal
          className="overflow-hidden rounded-panel border border-paper-line bg-[linear-gradient(115deg,var(--color-lavender)_0%,var(--color-lavender-2)_45%,var(--color-lavender)_100%)] p-8 sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-3">
              <p className="text-[0.6875rem] font-mono tracking-[0.2em] text-violet uppercase">
                {meaningfulWork.eyebrow}
              </p>
              <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.2] text-onlight">
                {meaningfulWork.headingLine1Lead}{" "}
                <span className="text-azure">{meaningfulWork.headingLine1Accent}</span>
                <br />
                {meaningfulWork.headingLine2Lead}{" "}
                <span className="text-azure">{meaningfulWork.headingLine2Accent}</span>
              </h2>
              <p className="mt-4 max-w-[36ch] text-[0.875rem] leading-relaxed text-onlight-3">
                {meaningfulWork.body}
              </p>
              <a
                href={meaningfulWork.linkHref}
                className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-medium text-azure transition-colors duration-200 hover:text-azure-deep"
              >
                {meaningfulWork.link}
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>

            <AssetSlot
              label="Team photograph, colleagues around a laptop, 16:9"
              className="aspect-[16/10] lg:col-span-6"
            />

            <div className="flex flex-row gap-8 lg:col-span-3 lg:flex-col lg:gap-6">
              {meaningfulWork.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[1.5rem] font-semibold leading-none text-azure">{stat.value}</p>
                  <p className="mt-1.5 text-[0.8125rem] text-onlight-3">{stat.label}</p>
                </div>
              ))}
              <p className="text-[0.8125rem] leading-snug font-medium text-onlight-2 lg:mt-2">
                {meaningfulWork.purpose}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
