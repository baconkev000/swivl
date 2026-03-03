import React from 'react';
import Image from 'next/image';

interface Agent {
  name: string;
  role: string;
  firm: string;
  image: string;
}

const agents: Agent[] = [
    {
      name: 'SEO Agent',
      role: 'Demand Capture Operator',
      firm: 'swivo Core',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/SEO-Agent-1772568773314.png?width=8000&height=8000&resize=contain',
    },
    {
      name: 'Reviews Agent',
      role: 'Trust & Conversion Operator',
      firm: 'swivo Core',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Reviews-Agent-2-1772554135484.png?width=800&height=800&resize=contain',
    },
    {
      name: 'Ads Agent',
      role: 'Demand Generation Operator',
      firm: 'swivo Core',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Ads-Agent-1772552994043.png?width=400&height=400&resize=contain',
    },
  ];

  const AgentsGrid: React.FC = () => {
    return (
      <section 
        id="agents-grid"
        className="flex flex-col items-center gap-y-24 px-6 pb-[160px] pt-20 md:px-8 lg:px-10 max-w-[1280px] mx-auto w-full"
      >
    <div className="flex flex-col items-center gap-y-6 text-center">
    <h2 className="text-[32px] md:text-[64px] font-semibold leading-[1.1] tracking-tight text-[#121212]">
      The swivo Fleet
    </h2>
    <p className="max-w-[600px] text-[16px] md:text-[20px] leading-[1.6] text-[#666666] text-balance">
      Specialized AI agents designed to operate autonomously across your entire growth stack.
    </p>
    </div>

<ul className="grid w-full gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
{agents.map((agent, index) => (
<li key={index} className="group">
<div className="relative aspect-square overflow-hidden">
<Image
src={agent.image}
alt={agent.name}
fill
className="object-contain transition-all duration-700 ease-out group-hover:scale-110"
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>

<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />

<div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
  <div className="flex flex-col gap-y-1">
    <span className="text-white text-[18px] font-semibold">{agent.name}</span>
    <span className="text-white/70 text-[14px]">{agent.role}</span>
  </div>
</div>
</div>
</li>
))}
</ul>

    </section>
  );
};

export default AgentsGrid;
