import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { AIExperience } from "@/components/sections/AIExperience";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Work />
        <Stats />
        <Process />
        <AIExperience />
        <Testimonials />
        <About />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
