import React from "react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  heading: string;
  features: Feature[];
}

export default function FeaturesGrid({ heading, features }: FeaturesGridProps) {
  return (
    <section className="bg-white py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16 max-w-[700px]">
          <h2 className="text-black">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-7 rounded-3xl transition-shadow duration-200"
              style={{ backgroundColor: "#f5f5f7" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-black">
                <feature.icon size={20} strokeWidth={1.6} className="text-white" />
              </div>
              <p className="text-[15px] font-semibold text-black mb-2 leading-tight">{feature.title}</p>
              <p className="text-[14px] leading-[1.6] text-black" style={{ opacity: 0.5 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
