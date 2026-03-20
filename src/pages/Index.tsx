import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import CorePartsSection from "@/components/CorePartsSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <main className="min-h-screen bg-background">
    <HeroSection />
    <IntroSection />
    <CorePartsSection />
    <ArchitectureDiagram />
    <FooterSection />
  </main>
);

export default Index;
