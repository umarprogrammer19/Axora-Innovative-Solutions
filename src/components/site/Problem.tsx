import { Check, X } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { problem } from "@/lib/content";

/**
 * Layout family: two-column comparison diptych split by a single vertical
 * hairline. Used once. The heading is stacked above the columns rather than set
 * beside an explainer paragraph.
 *
 * Paper band: the first light section on the page, sitting right under the
 * dark hero and ticker, matching the reference's white section directly
 * below its hero.
 *
 * Mobile (< 768px): the two columns stack, the vertical hairline becomes a
 * horizontal one between them.
 */
export function Problem() {
  return (
    <section id="problem" className="relative bg-paper py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-onlight">
            {problem.heading}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-onlight-2">
            {problem.body}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-14 sm:mt-16">
          <div className="grid grid-cols-1 divide-y divide-paper-line md:grid-cols-2 md:divide-x md:divide-y-0">
            {/* Cost side. Muted on purpose so the eye lands on the right column. */}
            <div className="pb-10 md:pr-10 md:pb-0 lg:pr-14">
              <h3 className="text-sm font-medium text-onlight-3">{problem.now.title}</h3>
              <ul className="mt-6 space-y-5">
                {problem.now.items.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[6px] border border-paper-line-2 text-onlight-3"
                    >
                      <X size={11} />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-onlight-2">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome side, carries the accent. */}
            <div className="pt-10 md:pt-0 md:pl-10 lg:pl-14">
              <h3 className="text-sm font-medium text-violet-ink">
                {problem.after.title}
              </h3>
              <ul className="mt-6 space-y-5">
                {problem.after.items.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[6px] bg-violet/12 text-violet-ink ring-1 ring-violet/25"
                    >
                      <Check size={11} weight="bold" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-onlight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
