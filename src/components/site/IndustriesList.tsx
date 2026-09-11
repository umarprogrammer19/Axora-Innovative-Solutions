import { ArrowRight, Bank, Buildings, Heart, Lightning, PuzzlePiece, ShoppingBagOpen, WifiHigh } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { cta, industries } from "@/lib/content";

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
 * Layout family: alternating media/content rows (image left, then image
 * right, repeating), white band. A different shape from ServicesList's
 * divided list on purpose - seven sectors read better as seven distinct
 * "moments" than as one more hairline-divided list right after /services.
 */
export function IndustriesList() {
  return (
    <section className="relative bg-panel-light py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-20 sm:gap-24">
          {industries.map((industry, i) => {
            const Glyph = icons[industry.id];
            const reversed = i % 2 === 1;
            return (
              <Reveal
                key={industry.id}
                id={industry.id}
                className={`scroll-mt-28 flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${
                  reversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                <AssetSlot label={industry.asset} className="aspect-[4/3] w-full lg:w-1/2" />

                <div className="w-full lg:w-1/2">
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-control border border-violet/25 text-violet"
                  >
                    <Glyph size={22} />
                  </span>
                  <h2 className="mt-5 text-[1.5rem] font-semibold tracking-[-0.01em] text-onlight">
                    {industry.title}
                  </h2>
                  <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-onlight-3">
                    {industry.body}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {industry.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-onlight-2"
                      >
                        <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-violet/60" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-16 flex justify-center">
          <Link
            href={cta.contactHref}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-azure transition-colors duration-200 hover:text-azure-deep"
          >
            Talk to us about your sector
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
