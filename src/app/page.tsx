"use client";

import React from 'react';
import Navigation from '@/components/sections/navigation';
import HeroSection from '@/components/sections/hero';
import IntroVideo from '@/components/sections/intro-video';
import CategorySlider from '@/components/sections/category-slider';
import ScheduleTimeline from '@/components/sections/schedule-timeline';
import Footer from '@/components/sections/footer';

/**
 * LandingPage Component
 * 
 * Primary showcase for swivo's AI agents using the Awards-style design.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#121212] font-sans selection:bg-[#121212] selection:text-white">
      {/* Floating Global Navigation */}
      <Navigation />

      <main className="relative z-0 bg-white">
        {/* Awards-style Hero Section */}
        <HeroSection />

        {/* Video Showcase Section */}
        <IntroVideo />

        {/* Horizontal Agent Category Slider */}
        <CategorySlider />

        {/* Meet the Agents (Schedule-style timeline) */}
        <ScheduleTimeline />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
