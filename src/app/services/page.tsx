import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { ServicesList } from "@/components/site/ServicesList";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { Cta } from "@/components/site/Cta";
import { servicesPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services | Axora Innovative Solutions",
  description: servicesPage.body,
};

/**
 * /services: the full catalogue behind the home page's Services bento,
 * which only has room for a one-line body per service. Bands: dark hero,
 * light service list, light process rail, dark closing Cta.
 */
export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow={servicesPage.eyebrow}
        heading={
          <>
            {servicesPage.heading.lead}{" "}
            <span className="bg-gradient-to-r from-azure to-violet bg-clip-text text-transparent">
              {servicesPage.heading.accent}
            </span>
          </>
        }
        body={servicesPage.body}
      />
      <ServicesList />
      <ProcessSteps />
      <Cta />
    </main>
  );
}
