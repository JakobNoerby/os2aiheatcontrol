import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import CorePartsSection from "@/components/CorePartsSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import VendorSection from "@/components/VendorSection";
import DataModelDiagram from "@/components/DataModelDiagram";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <main className="min-h-screen bg-background">
    <HeroSection />
    <IntroSection />
    <CorePartsSection />
    <ArchitectureDiagram />
    <VendorSection />
    <DataModelDiagram />
    <FooterSection />
  </main>
);

export default Index;
