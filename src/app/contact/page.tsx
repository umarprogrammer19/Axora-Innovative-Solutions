import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { ContactChannels } from "@/components/site/ContactChannels";
import { Inquiry } from "@/components/site/Inquiry";
import { ContactFaq } from "@/components/site/ContactFaq";
import { contactPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us | Axora Innovative Solutions",
  description: contactPage.body,
};

/**
 * /contact: the real destination behind every "Contact Us" style link on
 * the site (see cta.contactHref in content.ts). Bands: dark hero, light
 * channel picker, dark form, light FAQ, then the (dark) footer.
 */
export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow={contactPage.eyebrow}
        heading={
          <>
            {contactPage.heading.lead}{" "}
            <span className="bg-gradient-to-r from-azure to-violet bg-clip-text text-transparent">
              {contactPage.heading.accent}
            </span>
          </>
        }
        body={contactPage.body}
      />
      <Inquiry showHeading={false} />
    </main>
  );
}
