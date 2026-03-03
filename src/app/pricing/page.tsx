"use client";

import React, { useState } from "react";
import Navigation from "@/components/sections/navigation";
import HeroPricing from "@/components/sections/hero-pricing";
import PricingCards from "@/components/sections/pricing-cards";
import SecondaryPlans from "@/components/sections/secondary-plans";
import FAQSection from "@/components/sections/faq";
import Footer from "@/components/sections/footer";
import ComparisonTable from "@/components/sections/comparison-table";

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<"Yearly" | "Quarterly">("Yearly");

  return (
    <div className="min-h-screen bg-white text-[#121212] font-sans selection:bg-[#121212] selection:text-white">
      <Navigation />
      <main className="relative z-0 bg-white">
        <HeroPricing
          billingInterval={billingInterval}
          setBillingInterval={setBillingInterval}
        />

        <div className="pb-[120px]">
          <PricingCards billingInterval={billingInterval} />
        </div>

        <div className="container px-4 md:px-6 lg:px-[152px] pb-[120px]">
          <ComparisonTable billingInterval={billingInterval} />
        </div>

        <div className="container px-4 md:px-6 lg:px-[152px] pb-[120px]">
          <SecondaryPlans />
        </div>

        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
