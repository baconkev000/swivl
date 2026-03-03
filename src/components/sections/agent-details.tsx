'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AgentSpecialization {
  id: string;
  name: string;
  badge: string;
  description: string;
  assetUrl: string;
  assetType: 'image' | 'video';
}

const agents: AgentSpecialization[] = [
  {
    id: 'seo',
    name: 'SEO Agent',
    badge: 'Demand Capture',
    description: 'SEO Agent is your autonomous Demand Capture Operator. It identifies high-intent keywords driving competitors\' revenue, creates conversion-focused content, fixes technical SEO issues, and shares keyword insights directly with the Ads Agent. Traffic without conversion is failure — SEO Agent is wired for revenue.',
    assetUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/SEO-Agent-1772568773314.png?width=8000&height=8000&resize=contain',
    assetType: 'image',
  },
  {
    id: 'reviews',
    name: 'Reviews Agent',
    badge: 'Trust & Conversion',
    description: 'Reviews Agent is your autonomous Trust & Conversion Operator. More reviews → higher trust → higher close rate → lower ad cost. It requests reviews after every service, responds to every review with brand-aligned tone, escalates high-risk issues, and sends praise themes to the Ads Agent as creative angles.',
    assetUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Reviews-Agent-2-1772554135484.png?width=800&height=1000&resize=contain',
    assetType: 'image',
  },
  {
    id: 'ads',
    name: 'Ads Agent',
    badge: 'Demand Generation',
    description: 'Ads Agent is your autonomous Demand Generation Operator. It runs profitable campaigns on Google, Meta, and TikTok — using real review language from Reviews Agent and high-intent keywords from SEO Agent. Profit > Traffic. ROAS > Vanity metrics. Scale only what works.',
    assetUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Ads-Agent-1772552994043.png?width=800&height=1000&resize=contain',
    assetType: 'image',
  },
];

export default function AgentDetails() {
  const [activeSection, setActiveSection] = useState<string>('seo');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    agents.forEach((agent) => {
      const element = document.getElementById(agent.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="flex w-full flex-col gap-y-64 px-[16px] lg:px-[152px] py-[120px] place-self-center max-w-[1280px]">
      <h3 className="text-center text-[48px] lg:text-[64px] font-semibold tracking-[-0.04em] leading-[1.1] text-[#121212]">
        Agent Specializations
      </h3>

      <div className="grid grid-cols-1 gap-x-40 lg:grid-cols-2 mt-32">
        {/* Sticky Sidebar Navigation */}
        <div className="relative pointer-events-none lg:pointer-events-auto">
          <nav className="hidden lg:grid grid-flow-row sticky top-1/2 -translate-y-1/2 h-fit gap-y-12 text-[24px] font-semibold">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => scrollToSection(agent.id)}
                className={`text-left transition-colors duration-300 focus:outline-none cursor-pointer ${
                  activeSection === agent.id ? 'text-[#121212]' : 'text-[#A3A3A3]'
                }`}
              >
                {agent.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Scrollable Content List */}
        <ul className="flex flex-col gap-y-64 lg:gap-y-[120px]">
          {agents.map((agent) => (
            <li
              key={agent.id}
              id={agent.id}
              className="flex w-full scroll-mt-[120px] flex-col gap-y-32"
            >
              <div className="flex w-full flex-col items-start gap-y-32">
                <div className="flex w-full flex-col items-start gap-y-8">
                  <div className="inline-flex items-center justify-center rounded-[8px] px-8 py-4 text-[12px] font-semibold tracking-[0.05em] uppercase bg-[#EBEBEB] text-[#121212]">
                    {agent.badge}
                  </div>
                  <p className="w-full text-balance text-[16px] leading-[1.4] text-[#121212]">
                    {agent.description}
                  </p>
                </div>
                
                  <div className="aspect-square w-full overflow-hidden">
                    {agent.assetType === 'video' ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-contain"
                      >
                        <source src={agent.assetUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={agent.assetUrl}
                        alt={agent.name}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
