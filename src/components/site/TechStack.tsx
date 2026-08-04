import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { techStack } from "@/lib/content";
import { simpleIcon } from "@/lib/simpleIcon";

/**
 * Layout family: logo grid, 16 items and exactly 16 cells, 8 across at lg so
 * it reads as two even rows of 8.
 *
 * Real SVG logos from simple-icons (icon + label, generous padding), not
 * hand-rolled marks.
 *
 * Paper band, sits between the dark Why Axora stat band and the paper Faq
 * section (two paper bands in a row here, which the page already does once
 * elsewhere).
 *
 * Mobile (< 640px): 2 columns. sm: 4 columns. lg: 8 columns, 2 rows.
 */
export function TechStack() {
  return (
    <section id="tech-stack" className="relative bg-paper-2 py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="max-w-[46ch]">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.12] text-onlight">
            Built on modern AI and automation tooling.
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 sm:mt-16"
        >
          {techStack.map((tool) => {
            const icon = simpleIcon(tool.slug);
            return (
              <div
                key={tool.slug}
                className="flex flex-col items-center gap-3 rounded-panel border border-paper-line bg-panel-light px-3 py-5 text-center transition-colors duration-200 hover:border-paper-line-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label={tool.name}
                  className="size-8"
                  fill={`#${icon.hex}`}
                >
                  <path d={icon.path} />
                </svg>
                <span className="text-[0.8125rem] font-medium text-onlight-2">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
