import React from 'react';
import { GraduationCap, Building2, Search, Zap } from 'lucide-react';

const SecondaryPlans = () => {
  return (
    <section className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Enterprise Card */}
        <div className="flex flex-col p-8 rounded-[32px] bg-[#f5f5f7] border border-[#f5f5f7] hover:bg-white hover:border-[#e5e5e5] transition-all duration-300">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-[#f5f5f7]">
            <Building2 className="h-5 w-5 text-[#121212]" strokeWidth={2} />
          </div>
          <h3 className="mb-3 text-[18px] font-semibold text-[#121212]">
            Enterprise
          </h3>
          <p className="mb-6 text-[15px] leading-[1.6] text-[#666666] flex-grow">
            Get advanced security (SOC 2 reports), priority support, standard legal agreement & custom SLAs.
          </p>
            <a
              href="mailto:sales@swivo.ai"
              className="w-fit text-[14px] font-semibold py-2.5 px-6 rounded-full bg-white text-[#121212] border border-[#e5e5e5] hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-all"
            >
              Contact Sales
            </a>
          </div>
  
          {/* Education Card */}
          <div className="flex flex-col p-8 rounded-[32px] bg-[#f5f5f7] border border-[#f5f5f7] hover:bg-white hover:border-[#e5e5e5] transition-all duration-300">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-[#f5f5f7]">
              <GraduationCap className="h-5 w-5 text-[#121212]" strokeWidth={2} />
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-[#121212]">
              Student or educator?
            </h3>
            <p className="mb-6 text-[15px] leading-[1.6] text-[#666666] flex-grow">
              Discover swivo for Education and get a 50% discount if you&rsquo;re eligible.
            </p>
            <a
              href="mailto:edu@swivo.ai"
              className="w-fit text-[14px] font-semibold py-2.5 px-6 rounded-full bg-white text-[#121212] border border-[#e5e5e5] hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-all"
            >
              Request discount
            </a>
          </div>
  
          {/* Custom AI Card - Bento style spanning 1 on desktop, could span more on LG */}
          <div className="flex flex-col p-8 rounded-[32px] bg-[#121212] text-white border border-[#121212] transition-all duration-300">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <Zap className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-white">
              Custom Training
            </h3>
            <p className="mb-6 text-[15px] leading-[1.6] text-white/70 flex-grow">
              We&rsquo;ll train a custom agent on your proprietary business data. Starting from $3,999.
            </p>
            <a
              href="mailto:custom@swivo.ai"
              className="w-fit text-[14px] font-semibold py-2.5 px-6 rounded-full bg-white text-[#121212] hover:bg-[#f2f2f2] transition-all"
            >
              Get a quote
            </a>

        </div>
      </div>
    </section>
  );
};

export default SecondaryPlans;
