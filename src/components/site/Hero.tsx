import { Container } from "@/components/ui/Container";
import { HeroCopy } from "./HeroCopy";
import { HeroGraphic } from "./HeroGraphic";

/**
 * Layout family: full-bleed generative graphic, left-weighted copy.
 * Used once. No other section on this page puts copy on top of a graphic.
 *
 * Mobile (< 1024px): copy goes full width, the graphic stays behind it, the
 * scrim in HeroGraphic keeps the copy legible.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-24 pb-16 sm:pb-20"
    >
      <HeroGraphic />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-7">
            <HeroCopy />
          </div>
        </div>
      </Container>
    </section>
  );
}
