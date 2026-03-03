import React from 'react';
import Image from 'next/image';

const QuoteSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-16 py-[160px] text-center max-w-[1280px] mx-auto w-full bg-white">
      <div className="mb-32">
        {/* Quote Icon */}
        <svg
          width="40"
          height="29"
          viewBox="0 0 40 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#121212] mx-auto"
        >
          <path
            d="M0 17.525C0 7.825 6.025 0 16.325 0V7.275C12.125 7.275 9.475 9.875 9.475 13.925C9.475 14.975 9.675 16.275 10.125 17.275H17.075V29H0V17.525ZM22.925 17.525C22.925 7.825 28.95 0 39.25 0V7.275C35.05 7.275 32.4 9.875 32.4 13.925C32.4 14.975 32.6 16.275 33.05 17.275H40V29H22.925V17.525Z"
            fill="currentColor"
          />
        </svg>
      </div>

        <h2 className="text-[32px] md:text-[60px] lg:text-[72px] font-semibold text-[#121212] max-w-[900px] leading-[1.1] tracking-tight mb-32 text-balance">
          swivo represents the shift from tools you manage to agents that manage your growth. It is the new standard for automated marketing.
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
<span className="text-[16px] font-semibold text-[#121212]">Jiho Lim</span>
<span className="text-[14px] text-[#666666]">
Co-founder & CEO<br />swivo
</span>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
