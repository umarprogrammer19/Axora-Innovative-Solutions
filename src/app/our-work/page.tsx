import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { OurWorkGrid } from "@/components/site/OurWorkGrid";
import { Inquiry } from "@/components/site/Inquiry";
import { ourWorkPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work | Axora Innovative Solutions",
  description: ourWorkPage.body,
};

/**
 * /our-work: a filterable wall of case studies, the same normal PageHero
 * band used on /services and /contact rather than a full-bleed video hero
 * (that treatment stays reserved for the home page). Bands: dark hero, dark
 * case-study wall, white inquiry form.
 */
export default function OurWorkPage() {
  return (
    <main>
      <PageHero
        eyebrow={ourWorkPage.eyebrow}
        heading={
          <>
            {ourWorkPage.heading.lead}{" "}
            <span className="bg-gradient-to-r from-azure to-violet bg-clip-text text-transparent">
              {ourWorkPage.heading.accent}
            </span>
          </>
        }
        body={ourWorkPage.body}
      />
      <OurWorkGrid />
      <Inquiry showInterests />
    </main>
  );
}
