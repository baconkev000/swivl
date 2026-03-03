import React from 'react';
import Image from 'next/image';

/**
 * Assets mapping from provided section-specific assets and content mapping.
 * Image 1: iOS App of the Year
 * Image 2: Web App of the Year
 * Image 3: Site of the Year
 * Image 4: Animation of the Year
 * Image 5: Innovator of the Year
 */
const CATEGORIES = [
  {
    id: 'ios-app-of-the-year',
    title: 'iOS App of the Year',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-1.webp',
    href: '/awards/category/ios-app-of-the-year',
  },
  {
    id: 'web-app-of-the-year',
    title: 'Web App of the Year',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-2.webp',
    href: '/awards/category/web-app-of-the-year',
  },
  {
    id: 'site-of-the-year',
    title: 'Site of the Year',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-3.webp',
    href: '/awards/category/site-of-the-year',
  },
  {
    id: 'animation-of-the-year',
    title: 'Animation of the Year',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-4.webp',
    href: '/awards/category/animation-of-the-year',
  },
  {
    id: 'innovator-of-the-year',
    title: 'Innovator of the Year',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-5.webp',
    href: '/awards/category/innovator-of-the-year',
  },
];

const AwardsCategories = () => {
  return (
    <section className="w-full bg-white py-[60px] md:py-[120px]" id="award-category-section">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-y-24 px-4 md:px-[152px]">
        {/* Section Label */}
        <span className="text-[20px] font-semibold tracking-tight text-[#000000] md:text-[24px]">
          Awards
        </span>

        {/* Scrollable Container */}
        <div className="scrollbar-none -mx-4 overflow-x-auto px-4 outline-none sm:-mx-8 sm:px-8 md:-mx-[152px] md:px-[152px]">
          <ul className="flex w-fit flex-row gap-x-16 pb-4">
            {CATEGORIES.map((category) => (
              <li key={category.id} className="w-[280px] shrink-0 md:w-[264px]">
                <figure className="flex flex-col gap-y-20">
                  <a
                    href={category.href}
                    className="group relative block overflow-hidden rounded-[28px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0071e3]/50"
                  >
                    <div className="relative aspect-[4/5] w-full bg-[#f5f5f7] transition-colors duration-300 group-hover:bg-[#ebebeb]">
                      <Image
                        src={category.imageUrl}
                        alt={category.title}
                        fill
                        className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 280px, 264px"
                      />
                    </div>
                  </a>
                  <figcaption className="text-center text-[16px] font-semibold leading-[1.5] text-[#000000]">
                    {category.title}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default AwardsCategories;