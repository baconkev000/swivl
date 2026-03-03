import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  heading: string;
  steps: Step[];
}

const stepColors = ["#0088FF", "#0088FF", "#0088FF"];

export default function HowItWorks({ heading, steps }: HowItWorksProps) {
  return (
    <section className="bg-white py-[80px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[36px] md:text-[48px] font-semibold text-black tracking-[-0.03em] leading-[1.1] mb-16 max-w-[560px]">
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col gap-y-4">
              <div
                className="text-[48px] md:text-[56px] font-semibold leading-none mb-2 tracking-tight"
                style={{ color: stepColors[index % stepColors.length], opacity: 0.15 }}
              >
                {step.number}
              </div>
              <h3 className="text-[18px] font-bold text-[#121212] leading-tight">{step.title}</h3>
              <p className="text-[15px] leading-[1.6] text-[#666666]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
