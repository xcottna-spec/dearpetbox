import StickyNav from "@/components/ui/StickyNav";
import JsonLd from "@/components/JsonLd";
import Popups from "@/components/Popups";
import FloatingRail from "@/components/FloatingRail";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import PainSection from "@/components/landing/PainSection";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import ProductPreview from "@/components/landing/ProductPreview";
import EditorialBand from "@/components/landing/EditorialBand";
import ReviewSection from "@/components/landing/ReviewSection";
import RiskReversal from "@/components/landing/RiskReversal";
import FinalCTA from "@/components/landing/FinalCTA";
import FAQAccordion from "@/components/landing/FAQAccordion";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Popups />
      <StickyNav />
      <FloatingRail />
      <main>
        <HeroSection />
        <TrustBar />
        <PainSection />
        <HowItWorks />
        {/* 구독 상품(플랜) — 소비자 결정 구간을 상단으로 */}
        <PricingSection />
        <ProductPreview />
        <EditorialBand />
        <ReviewSection />
        <RiskReversal />
        <FinalCTA />
        <FAQAccordion />
      </main>
      <Footer />
    </>
  );
}
