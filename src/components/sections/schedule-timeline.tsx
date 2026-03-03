import React from 'react';

const scheduleData = [
  {
    id: "seo",
    date: "seo agent",
    title: "seo agent",
    description: "Our seo agent autonomously reviews your entire digital footprint to identify and execute growth opportunities. It optimizes keywords, site structure, and content quality to ensure your business remains at the top of search results without manual intervention.",
    asset: {
      type: "image",
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/SEO-Agent-1772568773314.png?width=8000&height=8000&resize=contain",
    },
  },
  {
    id: "reviews",
    date: "reviews agent",
    title: "reviews agent",
    description: "The reviews agent monitors brand sentiment across all platforms, automatically responding to feedback and strengthening your online authority. It ensures your business maintains a premium image while building lasting trust with your audience.",
    asset: {
      type: "image",
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Reviews-Agent-2-1772554135484.png?width=800&height=1000&resize=contain",
    },
  },
  {
    id: "ads",
    date: "ads agent",
    title: "ads agent",
    description: "The ads agent manages and optimizes your advertising spend in real-time. By analyzing performance data continuously, it reallocates budget to high-performing campaigns and creative, maximizing your ROI with precision and speed.",
    asset: {
      type: "image",
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Ads-Agent-1772552994043.png?width=800&height=1000&resize=contain",
    },
  },
];

const ScheduleTimeline: React.FC = () => {
  return (
    <section 
      id="schedule" 
      className="w-full bg-white min-h-screen py-[120px] px-6 lg:px-[152px]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Heading */}
        <h2 className="text-[40px] lg:text-[72px] font-semibold tracking-tight text-center mb-16 lg:mb-32 text-[#121212]">
          Growth in Motion
        </h2>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20">
          
          {/* Left Column: Sticky Navigation */}
          <div className="hidden lg:block relative">
            <nav className="sticky top-[50%] -translate-y-1/2 flex flex-col gap-y-6">
              {scheduleData.map((item) => (
                <a
                  key={`nav-${item.id}`}
                  href={`#${item.id}`}
                  className="text-[20px] font-semibold transition-all duration-300 text-[#666666]/40 hover:text-[#121212] hover:pl-2"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column: Vertical Content Blocks */}
          <ul className="flex flex-col gap-y-24 lg:gap-y-[160px]">
            {scheduleData.map((item) => (
              <li 
                key={item.id} 
                id={item.id}
                className="flex flex-col gap-y-8 scroll-mt-[100px]"
              >
                {/* Text Content */}
                <div className="flex flex-col items-start gap-y-6 max-w-[584px]">
                  {/* Date Badge */}
                  <div className="inline-flex items-center justify-center rounded-full px-4 py-1.5 bg-[#f5f5f7] text-[12px] font-bold uppercase tracking-widest text-[#666666]">
                    {item.date}
                  </div>
                  
                  {/* Description */}
                  <p className="text-[18px] md:text-[20px] leading-relaxed text-[#121212] font-medium">
                    {item.description}
                  </p>
                </div>

                  {/* Media Container */}
                  <div 
                    className="relative overflow-hidden aspect-square w-full"
                  >
                    {item.asset.type === 'video' ? (
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-contain"
                      >
                        <source src={item.asset.url} type="video/mp4" />
                      </video>
                    ) : (
                      <img 
                        src={item.asset.url} 
                        alt={item.title} 
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ScheduleTimeline;
