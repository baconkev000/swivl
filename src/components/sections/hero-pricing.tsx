"use client";

import React from "react";

interface HeroPricingProps {
  billingInterval: "Yearly" | "Quarterly";
  setBillingInterval: (interval: "Yearly" | "Quarterly") => void;
}

const HeroPricing = ({ billingInterval, setBillingInterval }: HeroPricingProps) => {
  return (
    <section className="relative flex w-full flex-col gap-y-12 pb-[80px] pt-[calc(64px+120px)] bg-white">
      {/* Headlines */}
      <div className="flex h-full w-full flex-col items-center gap-y-10 px-6">
        <h1 className="max-w-[900px] text-center text-[48px] md:text-[84px] leading-[0.95] tracking-[-0.04em] font-semibold text-[#121212]">
          Scale <span className="whitespace-nowrap">like a Pro.</span>
        </h1>
        <p className="text-[18px] md:text-[22px] text-[#666666] max-w-2xl text-center leading-relaxed font-medium">
          Get full access to all agents & features from only $0.33 per day —{" "}
          <span className="whitespace-nowrap font-semibold">Cancel anytime.</span>
        </p>

        {/* Billing Selector */}
        <div className="mt-4 flex flex-col items-center gap-6">
          <div
            role="radiogroup"
            className="relative isolate w-fit select-none rounded-full bg-[#f5f5f7] p-[4px] flex gap-[2px] h-[44px]"
          >
            <button
              onClick={() => setBillingInterval("Yearly")}
              role="radio"
              aria-checked={billingInterval === "Yearly"}
              className={`relative z-10 rounded-full flex items-center justify-center px-5 text-[14px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#121212]/50 ${
                billingInterval === "Yearly" ? "text-[#121212]" : "text-[#666666]"
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => setBillingInterval("Quarterly")}
              role="radio"
              aria-checked={billingInterval === "Quarterly"}
              className={`relative z-10 rounded-full flex items-center justify-center px-5 text-[14px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#121212]/50 ${
                billingInterval === "Quarterly" ? "text-[#121212]" : "text-[#666666]"
              }`}
            >
              Quarterly
            </button>
            
            {/* Animated Background Slider */}
            <div
              className={`absolute inset-y-[4px] z-0 rounded-full bg-white border border-[#f5f5f7] transition-all duration-200 ease-out`}
              style={{
                left: billingInterval === "Yearly" ? "4px" : "calc(50% + 1px)",
                width: "calc(50% - 5px)",
              }}
            ></div>
          </div>

          {/* Savings Text */}
          <p className="text-[14px] md:text-[16px] text-[#666666] font-normal">
            <strong className="font-semibold text-[#121212]">Save 33%</strong> on a yearly subscription
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroPricing;
