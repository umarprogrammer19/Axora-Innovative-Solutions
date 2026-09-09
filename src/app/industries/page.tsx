import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { IndustriesList } from "@/components/site/IndustriesList";
import { Cta } from "@/components/site/Cta";
import { industriesPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries | Axora Innovative Solutions",
  description: industriesPage.body,
};

/**
 * /industries: the full sector catalogue behind the nav's Industries dropdown
 * and the footer's Industries column, both of which used to point at a dead
 * "/#industries" anchor (the home page never had a matching id). Same shape
 * as /services on purpose: dark hero, light listing, dark closing Cta.
 */
export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow={industriesPage.eyebrow}
        heading={
          <>
            {industriesPage.heading.lead}{" "}
            <span className="bg-gradient-to-r from-violet to-magenta bg-clip-text text-transparent">
              {industriesPage.heading.accent}
            </span>
          </>
        }
        body={industriesPage.body}
      />
      <IndustriesList />
      <Cta />
    </main>
  );
}
