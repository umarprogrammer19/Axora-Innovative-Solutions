import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { founder } from "@/lib/content";

/**
 * Layout family: photo with an overlapping name card, beside a headline and
 * two plain stat pairs. Used once, directly before the closing Cta banner.
 *
 * White band. This ran dark in an earlier pass, borrowed straight from the
 * reference; against the page's strict dark/light alternation, two dark
 * sections in a row here (this one and Projects, right before it) broke the
 * rhythm, so this one flipped to light instead of Projects, since a photo
 * and a quote read fine on either surface and Projects' carousel cards do not.
 *
 * Deliberately not another stat-card grid (Impact already owns that
 * treatment): the two figures here sit as plain text separated by a
 * hairline, so this reads as a quieter, more personal beat rather than a
 * second metrics band.
 *
 * Mobile (< 1024px): photo stacks above the text, name card stays anchored
 * to the photo's corner.
 */
export function Founder() {
  return (
    <section className="relative bg-panel-light py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="relative lg:col-span-5">
            <AssetSlot label={founder.photo} className="aspect-[4/5]" />
            <div className="absolute -bottom-6 left-6 max-w-[15rem] rounded-panel border border-paper-line bg-panel-light px-5 py-4 shadow-[0_20px_50px_-24px_rgb(2_10_30/0.25)]">
              <p className="text-[0.6875rem] font-medium tracking-[0.1em] text-azure uppercase">
                {founder.title}
              </p>
              <p className="mt-1 text-[1.0625rem] font-semibold text-onlight">{founder.name}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.14] text-onlight">
                {founder.headline.lead}{" "}
                <span className="bg-gradient-to-r from-azure to-violet bg-clip-text text-transparent">
                  {founder.headline.accent}
                </span>
              </h2>
              <p className="mt-6 max-w-[56ch] text-[0.9375rem] leading-relaxed text-onlight-3">
                {founder.body}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10 flex gap-10 border-t border-paper-line pt-8">
              {founder.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[1.75rem] leading-none font-semibold text-onlight">
                    {stat.value}
                  </p>
                  <p className="mt-2 max-w-[18ch] text-[0.8125rem] leading-snug text-onlight-3">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
