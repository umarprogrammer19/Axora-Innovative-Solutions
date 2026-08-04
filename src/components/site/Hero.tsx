import { Container } from "@/components/ui/Container";
import { HeroCopy } from "./HeroCopy";
import { HeroMedia } from "./HeroMedia";

/**
 * Layout family: full-bleed media hero, left-weighted glass panel.
 * Used once. No other section on this page puts copy on top of media.
 *
 * Mobile (< 1024px): the panel goes full width, the media stays behind it, the
 * blueprint field and scrim keep the copy legible.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-24 pb-16 sm:pb-20"
    >
      <HeroMedia />

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
