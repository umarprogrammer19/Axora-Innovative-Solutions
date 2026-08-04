import { AssetSlot } from "@/components/ui/AssetSlot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/lib/content";

/**
 * Layout family: editorial case study showcase. Used once.
 * The lead study is a wide media and copy split, the two behind it are
 * media over copy. Only one image plus text split row, so the page never falls
 * into a zigzag.
 *
 * Case study names and metrics are illustrative placeholders. See content.ts.
 *
 * Mobile (< 1024px): the lead study stacks media above copy, the pair below goes
 * single column.
 *
 * Paper band, third light section on the page.
 */
export function Projects() {
  const [lead, ...rest] = projects;

  return (
    <section id="work" className="relative bg-paper py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-onlight">
            Recent{" "}
            <span className="bg-gradient-to-r from-violet-deep to-magenta-deep bg-clip-text text-transparent">
              work
            </span>
          </h2>
          <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-onlight-2">
            Three systems now running every day, each replacing a process someone
            used to do by hand.
          </p>
        </Reveal>

        {/* Lead study. */}
        <Reveal delay={0.08} className="mt-14 sm:mt-16">
          <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <AssetSlot
              label={lead.asset}
              className="aspect-[16/10] w-full lg:col-span-7"
            />

            <div className="lg:col-span-5">
              <p className="text-sm text-onlight-3">
                {lead.client} &middot; {lead.sector}
              </p>
              <h3 className="mt-3 text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold leading-[1.2] text-onlight">
                {lead.title}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-onlight-2">
                {lead.body}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-paper-line pt-7">
                {lead.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="block font-mono text-[1.75rem] leading-none tracking-tight text-violet-ink">
                        {m.value}
                      </span>
                      <span className="mt-2.5 block text-[0.8125rem] leading-snug text-onlight-3">
                        {m.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </Reveal>

        {/* Supporting pair. */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 md:grid-cols-2 lg:gap-10">
          {rest.map((project, i) => (
            <Reveal as="div" key={project.id} delay={i * 0.08}>
              <article>
                <AssetSlot label={project.asset} className="aspect-[4/3] w-full" />

                <p className="mt-6 text-sm text-onlight-3">
                  {project.client} &middot; {project.sector}
                </p>
                <h3 className="mt-2.5 text-[1.1875rem] font-semibold leading-[1.25] text-onlight">
                  {project.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-onlight-2">
                  {project.body}
                </p>

                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="block font-mono text-[1.25rem] leading-none tracking-tight text-violet-ink">
                          {m.value}
                        </span>
                        <span className="mt-2 block text-[0.8125rem] text-onlight-3">
                          {m.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
