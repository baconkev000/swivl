import React from 'react';
import Image from 'next/image';
import Logo from '../logo';

const QuoteFooter = () => {
  return (
    <div className="flex flex-col w-full bg-background-primary">
      {/* Testimonial Section */}
      <section className="flex flex-col items-center justify-center px-16 py-[160px] text-center max-w-[1280px] mx-auto w-full">
        <div className="mb-32">
          {/* Quote Icon */}
          <svg
            width="40"
            height="29"
            viewBox="0 0 40 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-text-primary mx-auto"
          >
            <path
              d="M0 17.525C0 7.825 6.025 0 16.325 0V7.275C12.125 7.275 9.475 9.875 9.475 13.925C9.475 14.975 9.675 16.275 10.125 17.275H17.075V29H0V17.525ZM22.925 17.525C22.925 7.825 28.95 0 39.25 0V7.275C35.05 7.275 32.4 9.875 32.4 13.925C32.4 14.975 32.6 16.275 33.05 17.275H40V29H22.925V17.525Z"
              fill="currentColor"
            />
          </svg>
        </div>

            <h2 className="text-title-1 min-1024:text-spotlight font-semibold text-text-primary max-w-[880px] leading-[1.1] tracking-tight mb-40 text-balance">
              swivo is about recognizing the best AI has to offer — the intelligence, the scale, and the agents who raise the bar for all of us.
            </h2>


<div className="flex flex-col items-center gap-y-12">
<div className="relative w-48 h-48 rounded-full overflow-hidden grayscale">
<Image
src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-17.webp"
alt="Jiho Lim"
fill
className="object-cover"
/>
</div>
<div className="flex flex-col gap-y-2">
<span className="text-body-bold text-text-primary">Jiho Lim</span>
<span className="text-compact text-text-secondary">
Co-founder & CEO<br />swivo
</span>
</div>
</div>
</section>

{/* Footer Section */}
<footer className="bg-[#121212] text-[#ffffff] rounded-t-[32px] pt-[80px] pb-[40px] px-16 min-1024:px-[152px]">
<div className="max-w-[1280px] mx-auto w-full">
<div className="grid grid-cols-1 min-720:grid-cols-12 gap-y-16 min-720:gap-x-40 mb-[80px]">
{/* Brand Column */}
<div className="min-720:col-span-6 flex flex-col gap-y-8">
<a href="/" className="flex items-center">
<Logo height={24} variant="light" />
</a>

<p className="text-[14px] text-[#666666] max-w-[280px]">
Scale your business with AI agents.
</p>
</div>

{/* Links Columns */}
<div className="min-720:col-span-3">
<ul className="flex flex-col gap-y-6">
<li><a href="/" className="text-[14px] font-semibold hover:text-[#666666] transition-colors">Home</a></li>
<li><a href="/pricing" className="text-[14px] font-semibold hover:text-[#666666] transition-colors">Pricing</a></li>
</ul>
</div>

<div className="min-720:col-span-3">
<ul className="flex flex-col gap-y-6">
<li><a href="https://twitter.com" className="text-[14px] font-semibold hover:text-[#666666] transition-colors">X (Twitter)</a></li>
<li><a href="https://linkedin.com" className="text-[14px] font-semibold hover:text-[#666666] transition-colors">LinkedIn</a></li>
</ul>
</div>
</div>

{/* Bottom Bar */}
<div className="flex flex-col min-720:flex-row justify-between items-start min-720:items-center pt-24 border-t border-white/10 gap-y-8">
<span className="text-[12px] text-[#666666]">
© swivo 2026. All rights reserved
</span>
              <div className="flex items-center gap-x-12">
                <a href="/privacy" className="text-[12px] text-[#666666] hover:text-[#ffffff] transition-colors">Privacy policy</a>
                <a href="/terms" className="text-[12px] text-[#666666] hover:text-[#ffffff] transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
};

export default QuoteFooter;