import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import CorePartsSection from "@/components/CorePartsSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import VendorSection from "@/components/VendorSection";
import GovernanceSection from "@/components/GovernanceSection";
import DataModelDiagram from "@/components/DataModelDiagram";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <main className="min-h-screen bg-background">
    <HeroSection />
    <IntroSection />
    <CorePartsSection />
    <ArchitectureDiagram />
    <VendorSection />
    <GovernanceSection />
    <DataModelDiagram />
    <FooterSection />
  </main>
);

export default Index;
