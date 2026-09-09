import { Plus } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { homeFaq } from "@/lib/content";

/**
 * Layout family: native disclosure list, split into two columns. Ten
 * questions is too many for ContactFaq's single centred column (see Section
 * 4.9, long lists need a different shape, not a longer list), so this
 * splits into two five-item columns instead of one ten-item one.
 *
 * `<details>` rather than a JS accordion: state per item, no client
 * component needed, and the page stays usable with JavaScript disabled.
 *
 * Mobile (< 1024px): the two columns stack into one.
 */
export function Faq() {
  const [left, right] = [homeFaq.items.slice(0, 5), homeFaq.items.slice(5)];

  return (
    <section className="relative bg-panel-light py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-violet uppercase">
            {homeFaq.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-onlight">
            {homeFaq.heading}
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-12 grid grid-cols-1 gap-x-12 lg:grid-cols-2"
        >
          {[left, right].map((column, i) => (
            <div key={i} className="divide-y divide-paper-line border-t border-paper-line">
              {column.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[0.9375rem] font-medium text-onlight marker:content-none">
                    {item.q}
                    <Plus
                      size={16}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-onlight-3 transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-3 max-w-[46ch] text-[0.875rem] leading-relaxed text-onlight-3">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
