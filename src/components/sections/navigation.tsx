"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '../logo';

/**
 * Navigation Component
 * Features a floating capsule-style glass-morphism navbar.
 */
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full pointer-events-none px-4 md:px-0" data-nosnippet="true">
      {/* Desktop Navigation */}
      <nav className={`hidden md:flex h-[64px] w-full max-w-[640px] absolute left-1/2 top-8 -translate-x-1/2 items-center justify-between px-6 pointer-events-auto rounded-full border border-white/20 transition-all duration-300 ${scrolled ? 'bg-[#F2F2F2]/90 backdrop-blur-xl' : 'bg-[#F2F2F2]/80 backdrop-blur-lg'}`}>
        <div className="flex items-center gap-x-4">
            <Link
              href="/"
              className="flex items-center focus-visible:outline-none rounded-sm transition-opacity hover:opacity-80"
                  aria-label="swivo Home"
>
<Logo height={20} />
</Link>

          <div className="h-4 w-[1px] bg-[#121212]/10 mx-2" />
            <div className="flex items-center gap-x-6">
              <Link
                href="/pricing"
                className="text-[14px] font-semibold text-[#121212]/60 transition-colors hover:text-[#121212]"
              >
                Pricing
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-x-4">
            <Link
              href="/login"
              className="text-[14px] font-semibold text-[#121212]/60 transition-colors hover:text-[#121212]"
            >
              Log in
            </Link>
              <Link
                href="/signup"
                className="relative rounded-full flex items-center justify-center h-10 px-5 bg-[#121212] text-white text-[14px] font-semibold hover:bg-[#121212]/90 active:scale-[0.98] transition-all"
              >
                Get started
              </Link>
          </div>

      </nav>

      {/* Mobile Navigation */}
      <nav className={`md:hidden absolute left-4 right-4 top-4 z-50 h-[56px] flex items-center justify-between px-5 pointer-events-auto rounded-full border border-white/20 transition-all duration-300 bg-[#F2F2F2]/90 backdrop-blur-xl`}>
        <Link
          href="/"
          className="focus-visible:outline-none"
          aria-label="swivo Home"
>
<Logo height={18} />
</Link>
        <button
          className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-[#121212]" /> : <Menu className="w-5 h-5 text-[#121212]" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#F2F2F2]/95 backdrop-blur-md pt-24 px-6 pointer-events-auto flex flex-col items-center">
            <div className="flex flex-col gap-8 text-center w-full">
              <Link href="/pricing" className="text-3xl font-semibold text-[#121212]" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/login" className="text-3xl font-semibold text-[#121212]" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
            <Link href="/signup" className="mt-4 w-full bg-[#121212] text-white py-5 rounded-full text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Join free</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
