"use client";

import React from 'react';
import Image from 'next/image';

/**
 * AgentCategories Component
 * 
 * Clones the horizontal scrolling category section to showcase swivo agents:
 * Atlas (SEO), Avery (Reputation), and Mark (Ads).
 */
const agents = [
  {
    id: 'seo',
    name: 'SEO',
    role: 'SEO Agent',
    href: '/seo',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/SEO-Agent-1772568773314.png?width=8000&height=8000&resize=contain',
  },
  {
    id: 'reviews',
    name: 'Reviews',
    role: 'Reviews Agent',
    href: '/reputation',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Reviews-Agent-2-1772554135484.png?width=400&height=550&resize=contain',
  },
  {
    id: 'ads',
    name: 'Ads',
    role: 'Ads Agent',
    href: '/paid-ads',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Ads-Agent-1772552994043.png?width=400&height=550&resize=contain',
  },
];

const AgentCategories: React.FC = () => {
  return (
    <section 
      className="w-full bg-white py-[80px] min-1024:py-[120px] overflow-hidden"
      aria-labelledby="agent-categories-title"
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-24 mb-16 lg:mb-24 px-6 md:px-0">
          <span className="text-[20px] font-semibold text-[#121212] tracking-tight">
            swivo Agents
          </span>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full overflow-x-auto scrollbar-none">
        <div className="flex flex-row gap-x-16 px-6 md:px-[152px] pb-8 pt-4">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              className="flex-shrink-0 w-[280px] min-720:w-[320px] min-1024:w-[calc((100vw-304px-64px)/4)] min-w-[300px]"
            >
              <figure className="flex flex-col gap-y-12">
                <a 
                  href={agent.href} 
                  className="group relative block focus-visible:outline-none"
                >
                  <div className="relative aspect-[0.73] min-720:aspect-[0.8] w-full overflow-hidden bg-[#F3F3F3] rounded-[28px] transition-all duration-300 ease-out group-hover:after:bg-[hsla(0,0%,25%,0.04)] after:absolute after:inset-0 after:rounded-[28px] after:transition-colors group-focus-visible:ring-4 group-focus-visible:ring-[#121212]/10">
                    <div className="absolute inset-0 flex items-center justify-center text-[48px] font-bold text-black/10">
                      {agent.name}
                    </div>
                  </div>
                </a>
                <figcaption className="text-center">
                  <span className="block text-[16px] font-semibold text-[#121212] leading-[1.4]">
                    {agent.role}
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
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

export default AgentCategories;
