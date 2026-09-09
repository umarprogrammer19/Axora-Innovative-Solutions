import { ArrowRight, Bank, Buildings, Heart, Lightning, PuzzlePiece, ShoppingBagOpen, WifiHigh } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { industries, industriesSection } from "@/lib/content";

const icons: Record<string, Icon> = {
  financial: Bank,
  telecom: WifiHigh,
  retail: ShoppingBagOpen,
  energy: Lightning,
  manufacturing: PuzzlePiece,
  healthcare: Heart,
  public: Buildings,
};

/**
 * Layout family: narrow heading rail beside a row of seven industry cards.
 * White band, directly under Services. Matches that section's rail-plus-grid
 * shape so the two read as one family even though this row has one more cell.
 *
 * Mobile (< 640px): 2 columns. sm: 4 columns. lg: heading moves to its own
 * column and the seven cards line up across the remaining width.
 */
export function Industries() {
  return (
    <section id="industries" className="relative bg-panel-light pb-24 sm:pb-28 lg:pb-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="text-[0.6875rem] font-mono tracking-[0.2em] text-violet uppercase">
              {industriesSection.eyebrow}
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.14] text-onlight">
              {industriesSection.headingLine1}
              <br />
              {industriesSection.headingLine2Lead}{" "}
              <span className="bg-gradient-to-r from-azure to-violet bg-clip-text text-transparent">
                {industriesSection.headingAccent}
              </span>
            </h2>
          </Reveal>

          <Reveal
            delay={0.08}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-9 lg:grid-cols-7"
          >
            {industries.map((item) => {
              const Glyph = icons[item.id];
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-panel border border-paper-line bg-panel-light p-5 transition-colors duration-200 hover:border-paper-line-2"
                >
                  <span aria-hidden="true" className="text-violet">
                    <Glyph size={24} />
                  </span>
                  <p className="text-[0.875rem] font-semibold leading-snug text-onlight">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </Reveal>
        </div>

        <Reveal delay={0.14} className="mt-10 flex justify-center">
          <a
            href={industriesSection.exploreHref}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-azure transition-colors duration-200 hover:text-azure-deep"
          >
            {industriesSection.exploreLink}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
