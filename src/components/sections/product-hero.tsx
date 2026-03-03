import React from "react";

interface ProductHeroProps {
  title: string;
  subtitle: string;
}

export default function ProductHero({ title, subtitle }: ProductHeroProps) {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-6 pt-[100px] md:pt-[140px] pb-[80px]">
        <h1 className="text-black max-w-[800px] mb-6">{title}</h1>
        <p className="max-w-[560px] text-[17px] md:text-[19px] leading-[1.65] mb-10" style={{ color: "rgba(0,0,0,0.45)" }}>{subtitle}</p>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <a
            href="/pricing"
            className="inline-flex h-[48px] px-8 items-center justify-center rounded-full bg-black text-white text-[15px] font-semibold transition-opacity w-full sm:w-auto"
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Get Started
          </a>
          <a
            href="/demo"
            className="inline-flex h-[48px] px-8 items-center justify-center rounded-full text-black text-[15px] font-medium transition-colors w-full sm:w-auto"
            style={{ backgroundColor: "#f5f5f7" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#EBEBEB"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f7"; }}
          >
            Book a call
          </a>
        </div>
      </div>

      <div className="w-full" style={{ borderTop: "1px solid #f5f5f7", borderBottom: "1px solid #f5f5f7" }}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-stretch">
          <div className="shrink-0 py-5 px-6 md:px-8 flex items-center justify-center md:justify-start" style={{ borderRight: "1px solid #f5f5f7" }}>
            <p className="text-[13px] font-medium whitespace-nowrap" style={{ color: "rgba(0,0,0,0.5)" }}>
              Backed by the world&apos;s best investors
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start flex-1 py-4 px-4 gap-x-8 gap-y-3">
            {["a16z", "Goodwater", "Atreides", "Valor", "Long Journey"].map((name) => (
              <span key={name} className="font-semibold text-[14px] text-black opacity-40 hover:opacity-70 transition-opacity">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
