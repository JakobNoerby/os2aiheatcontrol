import Navbar from "@/components/Navbar";
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
    <Navbar />
    <HeroSection />
    <div id="intro"><IntroSection /></div>
    <div id="kernedele"><CorePartsSection /></div>
    <div id="arkitektur"><ArchitectureDiagram /></div>
    <div id="leverandoerer"><VendorSection /></div>
    <div id="governance"><GovernanceSection /></div>
    <div id="datamodel"><DataModelDiagram /></div>
    <FooterSection />
  </main>
);

export default Index;
