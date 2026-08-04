import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Results } from "@/components/sections/Results";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <Results />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
