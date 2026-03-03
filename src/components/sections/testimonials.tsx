"use client";

import React, { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote: "I'm thrilled with their exceptional service; within an hour of my call, they coordinated a solution that set us on the path to rapid growth in the window and solar panel cleaning industry.",
    name: "Kent H.",
    role: "Home services business",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-gomega-ai/assets/images/L6PyxBMtXtG0IxL6LzcdEyH8w-4.jpg",
  },
    {
      quote: "Since starting with the platform, our sales and qualified leads graph has just been up and to the right. Best tool I've invested in across any marketing channel by far.",
      name: "Tom Z.",
      role: "Accounting company",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-gomega-ai/assets/images/5VENvE7QayIR6KIN2C7ZF1RC0-7.png",
    },
    {
      quote: "Started using the SEO Agent for blog content & SEO, and have seen a direct & substantial increase in traffic & quality leads within the first few months of signing up.",
      name: "Richard F.",
      role: "Law firm",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-gomega-ai/assets/images/vLFxC1dqXn6m05QLJGbOBRkmqQ-8.png",
    },
    {
      quote: "Our SEO Agent helped us by creating tons of organic content and improved our technical SEO to help us rank number one for our branded keywords.",
      name: "Kevin S.",
      role: "Software company",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-gomega-ai/assets/images/XLo32iXKmxabiDAiD5AyFDsFQ0-9.png",
    },
    {
      quote: "We've seen a huge uptick in organic traffic since using our SEO Agent — they consistently improve our SEO rankings and working with them is completely seamless.",
      name: "David A.",
      role: "Startup",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-gomega-ai/assets/images/SJ1nECtIH4aeU2BYb1MU1VA9Kw-10.png",
    },
    {
      quote: "The SEO Agent replaces an entire marketing team for us — does an incredible job managing our technical SEO & generating relevant content that drives traffic & increases revenue.",
      name: "Jason B.",
      role: "Finance company",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-gomega-ai/assets/images/ITg464Di5D4euyvonHD2LHQVw-11.png",
    },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = testimonials[activeIndex];

  return (
    <section className="bg-white py-[80px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[36px] md:text-[48px] font-semibold text-black tracking-[-0.03em] leading-[1.1] mb-14 md:mb-16 max-w-[580px]">
          Businesses growing with their AI agents
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Quote */}
          <div className="flex-1 min-w-0">
            <blockquote className="text-[20px] md:text-[22px] leading-[1.65] text-black font-normal mb-8">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover grayscale" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-black">{t.name}</div>
                <div className="text-[14px] text-black" style={{ opacity: 0.4 }}>{t.role}</div>
              </div>
            </div>
          </div>

          {/* Avatar selector */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0 lg:w-[72px]">
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="shrink-0"
                aria-label={item.name}
              >
                <div
                  className={`relative w-11 h-11 rounded-full overflow-hidden transition-all grayscale ${
                    activeIndex === i
                      ? "ring-2 ring-black ring-offset-2"
                      : "opacity-30 hover:opacity-60"
                  }`}
                >
                  <Image src={item.avatar} alt={item.name} fill sizes="44px" className="object-cover" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
