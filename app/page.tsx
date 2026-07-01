import StickyNav from "@/components/ui/StickyNav";
import JsonLd from "@/components/JsonLd";
import Popups from "@/components/Popups";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import PainSection from "@/components/landing/PainSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ProductPreview from "@/components/landing/ProductPreview";
import EditorialBand from "@/components/landing/EditorialBand";
import ReviewSection from "@/components/landing/ReviewSection";
import RiskReversal from "@/components/landing/RiskReversal";
import PricingSection from "@/components/landing/PricingSection";
import FinalCTA from "@/components/landing/FinalCTA";
import FAQAccordion from "@/components/landing/FAQAccordion";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Popups />
      <StickyNav />
      <main>
        <HeroSection />
        <TrustBar />
        <PainSection />
        <HowItWorks />
        <ProductPreview />
        <EditorialBand />
        <ReviewSection />
        <RiskReversal />
        <PricingSection />
        <FinalCTA />
        <FAQAccordion />
      </main>
      <Footer />
    </>
  );
}
