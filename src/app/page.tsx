import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustTicker } from "@/components/site/TrustTicker";
import { Problem } from "@/components/site/Problem";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Projects } from "@/components/site/Projects";
import { WhyAxora } from "@/components/site/WhyAxora";
import { Faq } from "@/components/site/Faq";
import { Inquiry } from "@/components/site/Inquiry";
import { Footer } from "@/components/site/Footer";

/**
 * Home page.
 *
 * The page opens and closes dark (hero, ticker, inquiry, footer) and alternates
 * paper (light) bands through the middle, matching the Axora brand reference:
 * dark, dark, paper, paper, dark, paper, dark, paper, dark, dark. See the theme
 * doc comment in globals.css for the token scheme behind the switch.
 *
 * Layout families, one use each:
 *   Hero        full-bleed media with a glass panel
 *   Ticker      hairline band with a horizontal marquee (the only marquee)
 *   Problem     two-column comparison diptych
 *   Services    asymmetric bento
 *   Process     step rail, horizontal at lg
 *   Projects    editorial case study showcase
 *   Why Axora   stat band over a reason grid, no cards
 *   FAQ         sticky heading beside a disclosure list
 *   Inquiry     form beside a supporting panel
 *   Footer      multi-column footer
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
        <WhyAxora />
        <Faq />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
