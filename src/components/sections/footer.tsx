import React from 'react';
import Logo from '../logo';

/**
 * Footer component
 * Theme: Light main content with a dark, premium footer aesthetic.
 * Design: Multi-column links, brand logo, and no shadows.
 * Features: Rounded top corners for a more sophisticated transition.
 */
const Footer = () => {
  return (
    <footer className="w-full bg-[#121212] text-[#ffffff] px-6 pt-[80px] pb-[40px] md:px-[152px] rounded-t-[32px]">
      <div className="mx-auto max-w-[1280px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-40 mb-[80px]">
          {/* Logo and Description */}
              <div className="md:col-span-6 flex flex-col gap-y-8 max-w-[320px]">
                <div className="flex items-center gap-x-2">
                  <Logo height={24} variant="light" />
                </div>
            </div>

          {/* Links Grid */}
            <div className="md:col-span-3">
              <nav className="flex flex-col gap-y-6">
                <a href="/" className="text-[14px] font-semibold text-[#ffffff] hover:text-[#666666] transition-colors">Home</a>
                <a href="/pricing" className="text-[14px] font-semibold text-[#ffffff] hover:text-[#666666] transition-colors">Pricing</a>
              </nav>
            </div>

          <div className="md:col-span-3">
            <nav className="flex flex-col gap-y-6">
              <a href="https://twitter.com" className="text-[14px] font-semibold text-[#ffffff] hover:text-[#666666] transition-colors">X (Twitter)</a>
              <a href="https://linkedin.com" className="text-[14px] font-semibold text-[#ffffff] hover:text-[#666666] transition-colors">LinkedIn</a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 flex flex-col gap-y-8 pt-12 border-t border-white/10 md:flex-row md:justify-between md:items-center">
          <div className="text-[12px] text-[#666666]">
                © swivo 2026. All rights reserved
          </div>
          <div className="flex gap-x-12">
            <a href="/privacy" className="text-[12px] text-[#666666] hover:text-[#ffffff] transition-colors">Privacy policy</a>
            <a href="/terms" className="text-[12px] text-[#666666] hover:text-[#ffffff] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
