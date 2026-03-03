import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Logo from '../logo';

/**
 * Navbar component for the swivo website.
 * Features a fixed glassmorphism navigation bar with a logo and CTA.
 * Styled following the "High-End Minimalist" aesthetic: white/gray palette, flat design, no shadows.
 */
const Navbar = () => {
  return (
    <nav className="fixed top-0 z-[50] w-full bg-[#F2F2F2]/90 backdrop-blur-[20px] border-b border-[#E5E5E5] px-6 min-[1024px]:px-10 py-8">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between">
        {/* Logo and Award Link Section */}
        <a 
          href="/" 
          className="flex items-center gap-x-3 outline-none focus-visible:ring-4 focus-visible:ring-black/10 transition-shadow"
        >
          <div className="flex items-center gap-x-3">
            <Logo height={20} />
            <span className="text-[16px] font-semibold leading-[1.5] text-[#1A1A1A]">
              Agents
            </span>
          </div>

        </a>

        {/* Action Button Section */}
        <div className="flex items-center">
          <a 
            href="https://swivo.ai" 
            className="group flex items-center gap-x-[2px] rounded-full px-4 py-[11px] bg-[#F2F2F2] hover:bg-[#E5E5E5] transition-colors ease-out outline-none focus-visible:ring-4 focus-visible:ring-black/5"
          >
            <span className="text-[16px] font-semibold leading-[1.1] text-[#1A1A1A]/64 group-hover:text-[#1A1A1A] transition-colors">
              Start building
            </span>
            <ArrowUpRight className="size-[12px] text-[#1A1A1A]/64 group-hover:text-[#1A1A1A] transition-colors" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;