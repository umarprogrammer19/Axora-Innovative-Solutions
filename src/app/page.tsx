import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { IndustrySolutions } from "@/components/site/IndustrySolutions";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Projects } from "@/components/site/Projects";
import { Founder } from "@/components/site/Founder";
import { Faq } from "@/components/site/Faq";
import { NextSteps } from "@/components/site/NextSteps";

/**
 * Home page. Navbar and Footer live in the root layout now that the site has
 * more than one route (see src/app/layout.tsx), so this file is content only.
 *
 * NextSteps is the closing section here, not Cta (still used on /services):
 * three concrete next steps at different commitment levels is the more
 * specific version of the same "get in touch" job, and running both on one
 * page would be a duplicate CTA.
 *
 *   Hero               dark   full-bleed video, copy on top
 *   Services           light  card grid, six services, stats strip
 *   Industry Solutions dark   four industry-specific pain points and CTAs
 *   How It Works       light  four-step timeline, keyed by week
 *   Projects           dark   single-slide case study carousel
 *   Founder            light  photo, quote, stats
 *   Faq                light  two-column disclosure list, ten questions
 *   Next Steps         dark   three commitment-level paths, closing CTA row
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <IndustrySolutions />
      <HowItWorks />
      <Projects />
      <Founder />
      <Faq />
      <NextSteps />
    </main>
  );
}
