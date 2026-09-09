import { ArrowRight } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MicrosoftMark, SimpleIconMark } from "./BrandMark";
import { partners } from "@/lib/content";

function PartnerLogo({ name }: { name: string }) {
  switch (name) {
    case "Microsoft":
      return (
        <span className="inline-flex items-center gap-2 text-[1rem] font-semibold text-fg">
          <MicrosoftMark className="size-5" />
          Microsoft
        </span>
      );
    case "AWS":
      return <span className="text-[1.1875rem] font-bold tracking-tight text-fg">aws</span>;
    case "Google Cloud":
      return (
        <span className="inline-flex items-center gap-2 text-[1rem] font-medium text-fg">
          <SimpleIconMark slug="googlecloud" label="Google Cloud" className="size-5" />
          Google Cloud
        </span>
      );
    case "Oracle":
      return <span className="text-[1.0625rem] font-bold tracking-wide text-fg">ORACLE</span>;
    case "SAP":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-[3px] bg-azure px-1.5 py-0.5 text-[0.8125rem] font-bold text-white">
          SAP
        </span>
      );
    case "servicenow":
      return <span className="text-[1rem] font-semibold lowercase text-fg">servicenow</span>;
    case "Snowflake":
      return (
        <span className="inline-flex items-center gap-2 text-[1rem] font-medium text-fg">
          <SimpleIconMark slug="snowflake" label="Snowflake" className="size-5" />
          Snowflake
        </span>
      );
    default:
      return <span className="text-[1rem] font-medium text-fg">{name}</span>;
  }
}

/**
 * Layout family: dark logo band, matching Impact's full-bleed dark treatment
 * rather than the reference's inset card. It used to run as a rounded card
 * on a light wrapper; against the page's strict dark/light alternation that
 * read as a light section with a dark sticker on it rather than a real dark
 * beat, so the whole section is dark now and the card is just a hairline
 * rule above the logos instead of a bordered box.
 *
 * Mobile (< 1024px): logos wrap onto multiple lines instead of scrolling.
 */
export function PartnerEcosystem() {
  return (
    <section id="partners" className="relative bg-ink py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-line pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="shrink-0">
              <p className="font-mono text-[0.625rem] tracking-[0.2em] text-violet-soft uppercase">
                {partners.eyebrow}
              </p>
              <h2 className="mt-2 text-[1.5rem] font-semibold text-fg">{partners.heading}</h2>
            </div>

            <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-center">
              {partners.logos.map((logo) => (
                <li key={logo} className="opacity-90 transition-opacity duration-200 hover:opacity-100">
                  <PartnerLogo name={logo} />
                </li>
              ))}
            </ul>

            <a
              href={partners.linkHref}
              className="inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-medium text-azure-soft transition-colors duration-200 hover:text-fg"
            >
              {partners.link}
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
