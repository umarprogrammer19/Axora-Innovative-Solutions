import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";

/** Rotates through brand blue, deep blue, and a neutral dark chip, same ramp as WhyAxora and Services. */
const monogramTones = ["bg-azure", "bg-azure-deep", "bg-line-2"];

/** md:mt offset per card, the staggered rhythm that keeps this from reading as three identical boxes. */
const offsets = ["", "md:mt-8", ""];

function monogram(company: string) {
  return company
    .split(" ")
    .filter((w) => w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/**
 * Layout family: staggered quote row, 3 cards the same size but offset in Y.
 * New family, distinct from the bento (Services), the stat band (WhyAxora),
 * and the editorial split (Projects). The stagger is what keeps three
 * same-size cards from reading as the generic "3 equal feature cards" tell.
 *
 * Quotes and companies are illustrative, tied to the same three placeholder
 * clients as Projects. Each gets a generated monogram (not a real logo) per
 * the same-invented-name-invented-mark rule Projects/Services already follow.
 *
 * Black band, sits between the two light bands (Projects before, Why Axora's
 * dark stat band after stays dark, which is fine, two dark in a row already
 * happens once elsewhere on this page).
 *
 * Mobile (< 768px): single column, offsets drop out.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-ink py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-fg">
            What the teams we work with say.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 sm:mt-16">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.id}
              delay={i * 0.08}
              className={`rounded-panel border border-line bg-panel p-7 sm:p-8 ${offsets[i]}`}
            >
              <p className="text-[1.0625rem] leading-relaxed text-fg">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-7 flex items-center gap-3 border-t border-line pt-6">
                <span
                  aria-hidden="true"
                  className={`grid size-10 shrink-0 place-items-center rounded-full text-[0.8125rem] font-semibold text-white ${monogramTones[i]}`}
                >
                  {monogram(t.company)}
                </span>
                <span>
                  <span className="block text-[0.9375rem] font-medium text-fg">
                    {t.name}
                  </span>
                  <span className="block text-[0.8125rem] text-fg-3">
                    {t.role}, {t.company}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
