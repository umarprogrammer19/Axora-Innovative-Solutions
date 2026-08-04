import { tickerItems } from "@/lib/content";

/**
 * Layout family: full-width hairline band with a horizontal ticker.
 * This is the ONLY marquee on the page.
 *
 * Motion: continuous horizontal drift, driven by CSS so it costs no JavaScript.
 * Motivation is emphasis by repetition on the short promises that qualify a lead.
 * Pauses on hover and on keyboard focus, and stops completely under reduced
 * motion where the first set of items simply sits still.
 */
export function TrustTicker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <section aria-label="What working with Axora means" className="relative bg-ink-2">
      <div aria-hidden="true" className="h-px w-full rule-fade" />

      <div className="ticker-viewport ticker-mask overflow-hidden py-5">
        <div className="ticker-track">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              aria-hidden={i >= tickerItems.length}
              className="flex shrink-0 items-center gap-6 pr-6 text-sm text-fg-2 sm:gap-8 sm:pr-8"
            >
              <span className="text-azure-soft/60">&middot;</span>
              <span className="whitespace-nowrap">{item}</span>
            </span>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="h-px w-full rule-fade" />
    </section>
  );
}
