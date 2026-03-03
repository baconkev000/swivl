import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      className="relative flex w-full flex-col gap-y-12 pb-[80px] pt-[calc(64px+120px)] bg-white" 
      id="hero-section"
    >
      <div className="flex h-full w-full flex-col items-center gap-y-10 px-6">
        {/* Badge container */}
        <div className="flex flex-row items-center justify-center gap-x-4">
          <span 
            className="rounded-full bg-[#f5f5f7] px-4 py-1.5 text-[12px] font-semibold tracking-wider uppercase text-[#666666]"
          >
            2026
          </span>
          <span 
            className="text-[14px] font-medium text-[#121212]"
          >
            swivo Agents
</span>
</div>

{/* Main Heading */}
<h1 
className="max-w-[900px] text-center text-[48px] md:text-[84px] leading-[0.95] tracking-[-0.04em] font-semibold text-[#121212]"
>
Scale your business <br className="hidden md:block" /> with AI agents.
</h1>

{/* Subheadline */}
<p className="text-[18px] md:text-[22px] text-[#666666] max-w-2xl text-center leading-relaxed">
swivo deploys AI agents that run your SEO, optimize your ads, and improve your website automatically — so your business grows continuously.
</p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 mb-4">
          <Link 
            href="/signup" 
            className="w-full sm:w-auto bg-[#121212] text-white text-[16px] font-semibold px-10 py-4 rounded-full hover:bg-[#121212]/90 transition-all active:scale-95"
          >
            Get started
          </Link>
          <Link 
            href="/demo" 
            className="w-full sm:w-auto bg-white text-[#121212] border border-[#f5f5f7] text-[16px] font-semibold px-10 py-4 rounded-full hover:bg-[#f5f5f7] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            See how it works <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
