import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import GrundelementerSection from "@/components/GrundelementerSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import VendorSection from "@/components/VendorSection";
import GovernanceSection from "@/components/GovernanceSection";
import DataModelDiagram from "@/components/DataModelDiagram";
import StandardAnalogySection from "@/components/StandardAnalogySection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <div id="intro"><IntroSection /></div>
    <div id="grundelementer"><GrundelementerSection /></div>
    <div id="arkitektur"><ArchitectureDiagram /></div>
    <div id="leverandoerer"><VendorSection /></div>
    <div id="governance"><GovernanceSection /></div>
    <div id="datamodel"><DataModelDiagram /></div>
    <StandardAnalogySection />
    <FooterSection />
  </main>
);

export default Index;
