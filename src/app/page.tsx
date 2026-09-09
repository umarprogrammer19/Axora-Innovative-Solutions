import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
// import { Impact } from "@/components/site/Impact";
// import { Industries } from "@/components/site/Industries";
// import { TrustBadges } from "@/components/site/TrustBadges";
// import { PartnerEcosystem } from "@/components/site/PartnerEcosystem";
// import { MeaningfulWork } from "@/components/site/MeaningfulWork";
import { Projects } from "@/components/site/Projects";
import { Founder } from "@/components/site/Founder";
import { Cta } from "@/components/site/Cta";

/**
 * Home page. Navbar and Footer live in the root layout now that the site has
 * more than one route (see src/app/layout.tsx), so this file is content only.
 *
 * Band order is a strict dark/light/dark/light alternation, not the
 * reference image's own order: Hero opens dark, and every section after it
 * flips shade so no two content bands in a row share a background. Trust
 * Badges is the one exception, it shares Industries' light band on purpose
 * (no gap between them, see TrustBadges) so the two   read as one light beat.
 * The footer stays dark regardless, as a closing band rather than part of
 * the content rhythm.
 *
 *   Hero               dark   full-bleed video, copy on top
 *   Services           light  bento grid, six services
 *   Impact             dark   stat band, four cards
 *   Industries          light  heading rail + seven cards
 *   Trust Badges        light  same band as Industries, certifications
 *   Partner Ecosystem   dark   logo band (was an inset card on a light
 *                              wrapper, now a full dark band, see that file)
 *   Meaningful Work      light  lavender card, purpose and culture
 *   Projects             dark   single-slide case study carousel
 *   Founder               light  photo, quote, stats (was dark, flipped
 *                              here to keep the alternation, see that file)
 *   Cta                   dark   closing banner over vertical light beams
 *
 * The contact form used to live at the end of this page (#inquiry). It is
 * now the whole point of /contact, so every "Contact Us" style link on the
 * page routes there instead (see cta.contactHref in content.ts).
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Founder />
      <Cta />
    </main>
  );
}
