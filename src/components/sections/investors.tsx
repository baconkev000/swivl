import React from 'react';

const Investors = () => {
  return (
    <section className="w-full overflow-hidden" style={{ borderTop: "1px solid #f5f5f7", borderBottom: "1px solid #f5f5f7" }}>
      <div className="flex flex-col md:flex-row items-stretch min-h-[100px]">
        {/* Left Section: Heading Text */}
        <div className="flex items-center px-6 md:px-12 py-8 md:py-0 min-w-[240px]" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <p className="text-[14px] font-medium leading-[1.4] text-black tracking-[-0.01em]" style={{ opacity: 0.6 }}>
              Backed by the world&apos;s<br className="hidden md:block" /> best investors
            </p>

        </div>

        {/* Right Section: Logos Grid */}
        <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center">
          <div className="flex justify-center items-center h-full px-8 py-8 md:py-0" style={{ borderRight: "1px solid #f5f5f7" }}>
            <span className="text-[15px] font-semibold text-black tracking-tight uppercase" style={{ opacity: 0.5 }}>a16z</span>
          </div>
          <div className="flex justify-center items-center h-full px-8 py-8 md:py-0" style={{ borderRight: "1px solid #f5f5f7" }}>
            <span className="text-[15px] font-semibold text-black tracking-tight uppercase" style={{ opacity: 0.5 }}>Goodwater</span>
          </div>
          <div className="flex justify-center items-center h-full px-8 py-8 md:py-0" style={{ borderRight: "1px solid #f5f5f7" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-4 bg-black" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', opacity: 0.5 }}></div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black" style={{ opacity: 0.5 }}>Atreides</span>
            </div>
          </div>
          <div className="flex justify-center items-center h-full px-8 py-8 md:py-0" style={{ borderRight: "1px solid #f5f5f7" }}>
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4">
                <div className="absolute inset-0 border border-black rotate-45" style={{ opacity: 0.5 }}></div>
                <div className="absolute inset-[3px] border border-black" style={{ opacity: 0.5 }}></div>
              </div>
              <span className="text-[13px] font-semibold tracking-[0.1em] uppercase text-black" style={{ opacity: 0.5 }}>Valor</span>
            </div>
          </div>
          <div className="flex justify-center items-center h-full px-8 py-8 md:py-0 col-span-2 sm:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center" style={{ opacity: 0.5 }}>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              </div>
              <span className="text-[13px] font-semibold tracking-tight text-black" style={{ opacity: 0.5 }}>Long Journey</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investors;
