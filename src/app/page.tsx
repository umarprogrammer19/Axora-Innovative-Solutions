import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustTicker } from "@/components/site/TrustTicker";
import { Problem } from "@/components/site/Problem";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { WhyAxora } from "@/components/site/WhyAxora";
import { TechStack } from "@/components/site/TechStack";
import { Faq } from "@/components/site/Faq";
import { Inquiry } from "@/components/site/Inquiry";
import { Footer } from "@/components/site/Footer";

/**
 * Home page.
 *
 * Mostly black (systemsltd.com-style), with paper (light) bands used sparingly
 * for contrast rather than in strict alternation: dark, dark, paper, dark,
 * dark, paper, dark, dark, paper, dark, dark. See the theme doc comment in
 * globals.css for the token scheme behind the switch.
 *
 * Layout families, one use each:
 *   Hero          full-bleed media, copy sits directly on it, no panel
 *   Ticker        hairline band with a horizontal marquee (the only marquee)
 *   Problem       two-column comparison diptych
 *   Services      asymmetric bento
 *   Process       step rail, horizontal at lg
 *   Projects      editorial case study showcase
 *   Testimonials  staggered quote row
 *   Why Axora     stat band over a reason grid, no cards
 *   Tech Stack    logo grid, 8 across, real simple-icons marks
 *   FAQ           sticky heading beside a disclosure list
 *   Inquiry       form beside a supporting panel
 *   Footer        multi-column footer
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustTicker />
        <Problem />
        <Services />
        <Process />
        <Projects />
        <Testimonials />
        <WhyAxora />
        <TechStack />
        <Faq />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
