"use client";

import React from 'react';
import { Info, Check } from 'lucide-react';

interface ComparisonTableProps {
  billingInterval: "Yearly" | "Quarterly";
}

interface FeatureRow {
  name: string;
  tooltip?: string;
  free: string | React.ReactNode;
  pro: string | React.ReactNode;
  team: string | React.ReactNode;
}

interface Category {
  title: string;
  features: FeatureRow[];
}

const comparisonData: Category[] = [
  {
    title: 'Content',
    features: [
      { name: 'Apps', free: 'Latest 4', pro: <Check className="w-5 h-5 stroke-[2.5]" />, team: <Check className="w-5 h-5 stroke-[2.5]" /> },
      { name: 'Sites', free: 'Latest 4', pro: <Check className="w-5 h-5 stroke-[2.5]" />, team: <Check className="w-5 h-5 stroke-[2.5]" /> },
      { name: 'Flows', free: 'Limited', pro: <Check className="w-5 h-5 stroke-[2.5]" />, team: <Check className="w-5 h-5 stroke-[2.5]" /> },
      { name: 'Animations', free: 'Limited', pro: <Check className="w-5 h-5 stroke-[2.5]" />, team: <Check className="w-5 h-5 stroke-[2.5]" /> },
      { name: 'Filter & search results', free: 'Limited', pro: <Check className="w-5 h-5 stroke-[2.5]" />, team: <Check className="w-5 h-5 stroke-[2.5]" /> },
      { name: 'App history', free: 'Limited', pro: <Check className="w-5 h-5 stroke-[2.5]" />, team: <Check className="w-5 h-5 stroke-[2.5]" /> },
    ],
  },
  {
    title: 'Features',
    features: [
      { name: 'SEO Agent', free: 'Basic Audits', pro: <Check className="w-5 h-5 stroke-[2.5]" />, team: <Check className="w-5 h-5 stroke-[2.5]" /> },
      { name: 'Reviews Agent', free: 'Monitoring', pro: <Check className="w-5 h-5 stroke-[2.5]" />, team: <Check className="w-5 h-5 stroke-[2.5]" /> },
      { name: 'Ads Agent', free: 'Limited', pro: <Check className="w-5 h-5 stroke-[2.5]" />, team: <Check className="w-5 h-5 stroke-[2.5]" /> },
      { name: 'Automated tasks', free: '10 / mo', pro: '1,000 / mo', team: '10,000 / mo' },
      { name: 'Agent Customization', free: 'Standard', pro: 'Advanced', team: 'Expert' },
    ],
  },
];

export default function ComparisonTable({ billingInterval }: ComparisonTableProps) {
  const proPrice = billingInterval === "Yearly" ? "10" : "15";
  const teamPrice = billingInterval === "Yearly" ? "12" : "18";

  return (
    <section id="comparison" className="py-24 bg-white overflow-visible">
      <div className="container max-w-[1200px] mx-auto px-6">
        <div className="relative">
          
          {/* Header Row - Sticky */}
          <div className="sticky top-[80px] z-30 bg-white pt-4">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-0 items-end border-b border-[#f5f5f7]">
              <div className="pr-12 pb-12 bg-white">
                <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-tight text-[#121212]">
                  Compare plans & <br /> features
                </h2>
              </div>
              
              {/* Free Plan */}
              <div className="flex flex-col gap-3 px-8 pb-12 h-full justify-end items-start bg-white">
                <div className="text-[17px] font-semibold text-[#121212]">Free</div>
                <div className="text-[17px] font-semibold text-[#121212]">$0</div>
                <button className="mt-2 h-[40px] px-6 rounded-full border border-[#e5e5e5] bg-white text-[14px] font-semibold hover:bg-[#f5f5f7] transition-all text-[#121212]">
                  Get started
                </button>
              </div>
              
              {/* Pro Plan Header */}
              <div className="flex flex-col gap-3 px-8 pb-12 h-full justify-end items-start bg-[#f5f5f7] rounded-t-[24px] relative">
                <div className="flex items-center gap-2">
                  <span className="text-[17px] font-semibold text-[#121212]">Pro</span>
                  <span className="inline-flex items-center rounded-full bg-[#007AFF] px-2.5 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider">Popular</span>
                </div>
                  <div className="text-[17px] font-semibold text-[#121212]">
                    ${proPrice} <span className="text-[15px] font-semibold text-[#121212]">per mo</span>
                  </div>
                  <button className="mt-2 h-[40px] px-6 rounded-full bg-[#121212] text-white text-[14px] font-semibold hover:bg-[#121212]/90 transition-all">
                    Get started
                  </button>
                </div>
                
                {/* Team Plan */}
                <div className="flex flex-col gap-3 px-8 pb-12 h-full justify-end items-start bg-white">
                  <div className="text-[17px] font-semibold text-[#121212]">Team</div>
                  <div className="text-[17px] font-semibold text-[#121212]">
                    ${teamPrice} <span className="text-[15px] font-semibold text-[#121212]">per member/mo</span>
                  </div>
                <button className="mt-2 h-[40px] px-6 rounded-full border border-[#e5e5e5] bg-white text-[14px] font-semibold hover:bg-[#f5f5f7] transition-all text-[#121212]">
                  Get started
                </button>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="w-full relative z-10">
            {comparisonData.map((category) => (
              <div key={category.title} className="mt-0">
                {/* Category Row */}
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-0">
                  <div className="pt-12 pb-6 text-[18px] font-semibold text-[#121212] bg-white">
                    {category.title}
                  </div>
                  <div className="pt-12 pb-6 bg-white"></div>
                  <div className="pt-12 pb-6 bg-[#f5f5f7]"></div>
                  <div className="pt-12 pb-6 bg-white"></div>
                </div>

                {/* Feature Rows */}
                  {category.features.map((feature) => (
                    <div key={feature.name} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-0 group">
                      <div className="py-5 pr-12 border-b border-[#f5f5f7] text-[15px] text-[#121212] font-semibold flex items-center gap-2 bg-white">
                        {feature.name}
                        <Info className="w-4 h-4 text-[#121212] opacity-20 cursor-help" />
                      </div>
                      <div className="py-5 px-8 border-b border-[#f5f5f7] text-[15px] text-[#121212] font-semibold flex items-center bg-white">
                        {feature.free}
                      </div>
                      <div className="py-5 px-8 border-b border-[#f5f5f7] bg-[#f5f5f7] text-[15px] text-[#121212] font-semibold flex items-center">
                        {feature.pro}
                      </div>
                      <div className="py-5 px-8 border-b border-[#f5f5f7] text-[15px] text-[#121212] font-semibold flex items-center bg-white">
                        {feature.team}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
