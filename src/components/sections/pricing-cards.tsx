import React from 'react';
import { 
  Zap, 
  Search, 
  BarChart3, 
  ShieldCheck, 
  Bot, 
  Users, 
  Check, 
  Settings, 
  FileText,
  MousePointer2
} from 'lucide-react';

interface PricingCardsProps {
  billingInterval: "Yearly" | "Quarterly";
}

const PricingCards = ({ billingInterval }: PricingCardsProps) => {
  const proPrice = billingInterval === "Yearly" ? "10" : "15";
  const teamPrice = billingInterval === "Yearly" ? "12" : "18";

  return (
    <div className="container mx-auto px-6 py-10">
      <div 
        className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-[1100px] mx-auto"
        data-testid="pricing-cards"
      >
          {/* Free Plan Card */}
          <article className="flex w-full flex-col gap-y-12 rounded-[24px] p-6 border border-[#f5f5f7] bg-white transition-all duration-200">
            <header className="flex flex-col gap-y-1">
              <h2 className="text-[24px] font-semibold text-[#121212] leading-[1.3]">
                Free
              </h2>
              <h3 className="text-[16px] text-[#666666] font-normal leading-[1.5]">
                For individuals just starting out
              </h3>
            </header>

            <section className="flex items-baseline gap-x-2">
              <h2 className="text-[48px] font-semibold text-[#121212] tracking-[-0.04em] leading-none">
                $0
              </h2>
              <div className="flex flex-col justify-center">
                <h3 className="text-[12px] text-[#666666] leading-[1.4]">per month</h3>
              </div>
            </section>

            <button className="w-full relative rounded-full h-[44px] text-[16px] font-semibold px-4 bg-transparent text-[#121212] border border-[#f5f5f7] hover:bg-[#f5f5f7] active:scale-95 cursor-pointer transition-all ease-out flex items-center justify-center">
              <span className="truncate">Get started</span>
            </button>

            <ul className="flex flex-col pt-2 gap-y-1">
              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#666666]">
                <Bot className="size-5 shrink-0 opacity-40" strokeWidth={1.5} />
                Basic AI Audits
              </li>
              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#666666]">
                <MousePointer2 className="size-5 shrink-0 opacity-40" strokeWidth={1.5} />
                10 tasks / mo
              </li>
              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#666666]">
                <BarChart3 className="size-5 shrink-0 opacity-40" strokeWidth={1.5} />
                Limited reporting
              </li>
            </ul>
          </article>

            {/* Pro Plan Card */}
            <article className="flex w-full flex-col gap-y-12 rounded-[24px] p-6 bg-[#f5f5f7] transition-all duration-200 relative">
              <header className="flex flex-col gap-y-1">
                <h2 className="flex flex-row items-center gap-2 text-[24px] font-semibold text-[#121212] leading-[1.3]">
                  Pro
                  <span className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-[#007AFF] text-white">
                    Popular
                  </span>
                </h2>
                <h3 className="text-[16px] text-[#666666] font-normal leading-[1.5]">
                  For growing businesses
                </h3>
              </header>


            <section className="flex items-baseline gap-x-2">
              <h2 className="text-[48px] font-semibold text-[#121212] tracking-[-0.04em] leading-none">
                ${proPrice}
              </h2>
              <div className="flex flex-col justify-center">
                <h3 className="text-[12px] text-[#666666] leading-[1.4]">per month</h3>
                <h3 className="text-[12px] text-[#666666] leading-[1.4]">billed {billingInterval.toLowerCase()}</h3>
              </div>
            </section>

            <button className="w-full relative rounded-full h-[44px] text-[16px] font-semibold px-4 bg-[#121212] text-white hover:bg-[#121212]/90 active:scale-95 cursor-pointer transition-all ease-out flex items-center justify-center">
              <span className="truncate">Get started</span>
            </button>

            <ul className="flex flex-col pt-2 gap-y-1">
                <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#121212] font-medium">
                  <Bot className="size-5 shrink-0" strokeWidth={1.5} />
                  Assign seo
                </li>
                <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#121212] font-medium">
                  <ShieldCheck className="size-5 shrink-0" strokeWidth={1.5} />
                  Assign reviews
                </li>
                <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#121212] font-medium">
                  <Zap className="size-5 shrink-0" strokeWidth={1.5} />
                  Assign ads
                </li>

              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#666666]">
                <Settings className="size-5 shrink-0" strokeWidth={1.5} />
                1,000 automated tasks / mo
              </li>
              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#666666]">
                <BarChart3 className="size-5 shrink-0" strokeWidth={1.5} />
                Real-time reporting
              </li>
            </ul>
          </article>

          {/* Team Plan Card */}
          <article className="flex w-full flex-col gap-y-12 rounded-[24px] p-6 border border-[#f5f5f7] bg-white transition-all duration-200">
            <header className="flex flex-col gap-y-1">
              <h2 className="text-[24px] font-semibold text-[#121212] leading-[1.3]">
                Team
              </h2>
              <h3 className="text-[16px] text-[#666666] font-normal leading-[1.5]">
                For agencies & large teams
              </h3>
            </header>

            <section className="flex items-baseline gap-x-2">
              <h2 className="text-[48px] font-semibold text-[#121212] tracking-[-0.04em] leading-none">
                ${teamPrice}
              </h2>
              <div className="flex flex-col justify-center">
                <h3 className="text-[12px] text-[#666666] leading-[1.4]">per member/month</h3>
                <h3 className="text-[12px] text-[#666666] leading-[1.4]">billed {billingInterval.toLowerCase()}</h3>
              </div>
            </section>

            <button className="w-full relative rounded-full h-[44px] text-[16px] font-semibold px-4 bg-transparent text-[#121212] border border-[#f5f5f7] hover:bg-[#f5f5f7] active:scale-95 cursor-pointer transition-all ease-out flex items-center justify-center">
              <span className="truncate">Get started</span>
            </button>

            <ul className="flex flex-col pt-2 gap-y-1">
              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#121212] font-medium">
                <Check className="size-5 shrink-0" strokeWidth={2} />
                Everything in Pro
              </li>
              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#666666]">
                <Users className="size-5 shrink-0" strokeWidth={1.5} />
                Unlimited agents
              </li>
              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#666666]">
                <Zap className="size-5 shrink-0" strokeWidth={1.5} />
                10,000 automated tasks / mo
              </li>
              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#666666]">
                <FileText className="size-5 shrink-0" strokeWidth={1.5} />
                API Access
              </li>
              <li className="text-[16px] flex items-center gap-x-3 py-1.5 text-[#666666]">
                <ShieldCheck className="size-5 shrink-0" strokeWidth={1.5} />
                Priority Support
              </li>
            </ul>
          </article>
      </div>
    </div>
  );
};

export default PricingCards;
