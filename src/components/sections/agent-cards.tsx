"use client";

import React from 'react';
import Image from 'next/image';

const SEO_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/SEO-Agent-1772568773314.png?width=8000&height=8000&resize=contain";
const REVIEWS_AVATAR = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Reviews-Agent-2-1772554135484.png?width=800&height=800&resize=contain";
const ADS_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Ads-Agent-1772552994043.png?width=800&height=800&resize=contain";

const AGENTS = [
  {
    id: 'seo',
    title: 'SEO Agent',
    description: 'Demand Capture Operator. Identifies high-intent keywords, creates conversion-focused content, and strengthens your technical authority. Traffic without conversion is failure.',
    imageUrl: SEO_AVATAR,
  },
  {
    id: 'reviews',
    title: 'Reviews Agent',
    description: 'Trust & Conversion Operator. Requests reviews, responds within minutes, escalates high-risk issues, and turns praise into ad copy angles.',
    imageUrl: REVIEWS_AVATAR,
  },
  {
    id: 'ads',
    title: 'Ads Agent',
    description: 'Demand Generation Operator. Scales winning campaigns, kills losers, and builds creatives from real review language and SEO keyword data.',
    imageUrl: ADS_AVATAR,
  },
];

const AgentCards = () => {
  return (
    <section className="w-full bg-white py-[80px] md:py-[140px]" id="agents-section">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-y-16 px-6 lg:px-[152px]">
        {/* Section Label */}
        <div className="flex flex-col gap-y-6">
          <h2 className="text-[32px] md:text-[48px] font-semibold tracking-tight text-[#121212] leading-[1.1]">
            Your AI marketing agents
          </h2>
            <p className="text-[18px] text-[#666666] max-w-xl leading-relaxed">
              swivo provides AI agents that continuously improve your business’s growth systems.
            </p>
        </div>

        {/* Scrollable Container */}
        <div className="scrollbar-none -mx-6 overflow-x-auto px-6 outline-none sm:-mx-8 sm:px-8 lg:-mx-[152px] lg:px-[152px]">
          <ul className="flex w-fit flex-row gap-x-12 pb-8">
            {AGENTS.map((agent) => (
              <li key={agent.id} className="w-[300px] shrink-0 md:w-[380px]">
                <div className="flex flex-col gap-y-8 group">
                    <div className="relative aspect-square w-full overflow-hidden transition-all duration-500 ease-out">
                      <Image
                        src={agent.imageUrl}
                        alt={agent.title}
                        fill
                          className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 300px, 380px"
                      />
                    </div>
                  <div className="flex flex-col gap-y-3 px-2">
                    <h3 className="text-[20px] font-semibold text-[#121212]">
                      {agent.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-[#666666]">
                      {agent.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default AgentCards;
