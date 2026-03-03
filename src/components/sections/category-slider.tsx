import React from 'react';

interface CategoryItem {
  title: string;
  image: string;
  href: string;
  description: string;
}

const SEO_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/SEO-Agent-1772568773314.png?width=8000&height=8000&resize=contain";
const REVIEWS_AVATAR = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Reviews-Agent-2-1772554135484.png?width=800&height=800&resize=contain";
const ADS_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Ads-Agent-1772552994043.png?width=800&height=800&resize=contain";

const categories: CategoryItem[] = [
  {
    title: 'SEO Agent',
    image: SEO_AVATAR,
    href: '#',
    description: 'Demand Capture Operator. Finds the keywords your customers are searching right now, creates conversion-focused content, and sends high-intent signals to the Ads agent. Traffic without conversion is failure.',
  },
  {
    title: 'Reviews Agent',
    image: REVIEWS_AVATAR,
    href: '#',
    description: 'Trust & Conversion Operator. Requests reviews, responds within minutes, escalates high-risk issues, and turns your best reviews into ad copy. More trust means higher close rate and lower ad cost.',
  },
  {
    title: 'Ads Agent',
    image: ADS_AVATAR,
    href: '#',
    description: 'Demand Generation Operator. Scales what works, kills what doesn\'t, and builds creatives from real review language. Feeds performance data back to SEO and Reviews. Growth is the only KPI.',
  },
];

const CategorySlider: React.FC = () => {
  return (
    <section 
      className="w-full bg-white py-[120px]" 
      id="agents-section"
    >
      <div className="container px-4 md:px-6 lg:px-[152px]">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4 max-w-2xl">
            <span className="text-[14px] font-semibold text-[#666666] uppercase tracking-wider">
              A coordinated AI growth system
            </span>
            <h2 className="text-[32px] md:text-[48px] font-semibold text-[#121212] tracking-tight">
              Three agents. One objective. Revenue.
            </h2>
          </div>
          
          <div className="relative -mx-4 overflow-hidden px-4 md:-mx-6 md:px-6 lg:-mx-[152px] lg:px-[152px]">
            <div className="scrollbar-hide flex w-full overflow-x-auto overflow-y-hidden pb-8">
              <ul className="flex flex-row gap-x-6 md:gap-x-8">
                {categories.map((category, index) => (
                  <li key={index} className="flex-shrink-0 group w-[300px] md:w-[400px]">
                    <div className="flex flex-col gap-y-6">
                        <div 
                          className="relative aspect-square w-full overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
                        >
                          <img
                            src={category.image}
                            alt={category.title}
                            className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      <div className="flex flex-col gap-y-2">
                        <h3 className="text-[20px] md:text-[24px] font-semibold text-[#121212]">
                          {category.title}
                        </h3>
                        <p className="text-[16px] text-[#666666] leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
