import React from 'react';

/**
 * TrophyShowcase component
 * 
 * Features a large responsive video player within a rounded container
 * followed by a descriptive headline about the award's purpose.
 * 
 * Design characteristics:
 * - Rounded corners (28px - 32px)
 * - Clean typography (Spotlight/Showcase font sizes)
 * - Pristine white background
 * - Responsive spacing (160px vertical padding)
 */
const TrophyShowcase: React.FC = () => {
  const videoUrl = "https://bytescale.mobbin.com/FW25bBB/video/mobbin.com/prod/assets/file.mp4?enc=1.BQnbdJK6.1sgXhAN6qJ9Mo7Vw.H3X_64Yjm4Uf1NRMl1aEk-BLcyNuifbmlgt6AVLt9CJJCLJnPwEiez3mpXf-rpyiaAI908OCFfaflEtSXE_DfX8rJJN1FrfpEdB7atviLMXMq_3YX8WKir0XejXunT-KXwHQy0Q6s9PvVyaQbHnLzCEFWyyO5WkCRJ3MkycFiwDReFJYm-P9tHFEbIkqb3zJfbSmeIW1r90xEVmWv6ScUE0XRPqAlwVAflSip5C4JLBlT9vVhCY4HmZ0An2mksY4lZI6W3PUKC0cNJrTO2rm6PvD9_Z3ojsTT6ZJG9N7SFRcC_R69cH2X4vkmbqXuSCE0ZyttGvUF_y-uBRrgA";

  return (
    <section 
      className="flex flex-col items-center gap-y-64 place-self-center px-4 min-1024:gap-y-[160px] min-1024:px-32 max-w-[calc(1280px+304px)]"
      style={{
        width: '100%',
        margin: '0 auto'
      }}
    >
      {/* Video Container */}
      <article 
        className="group relative flex items-center justify-center aspect-[4/5] w-full overflow-hidden rounded-[28px] min-1024:aspect-[99/59] bg-[#f5f5f7]"
        style={{
          boxShadow: 'none'
        }}
      >
        <video 
          className="size-full object-cover object-center"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play Button Overlay (Visible on hover/focus matching the original design) */}
        <div className="absolute bottom-24 left-24 hidden min-1024:flex opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity duration-300 ease-out">
          <button 
            className="relative inline-flex size-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-black transition-transform hover:scale-105"
            aria-label="Play video"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="size-4 ml-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </article>

      {/* Description Content */}
      <div className="flex max-w-[792px] flex-col items-center gap-y-24 px-16">
        <h2 
          className="text-balance text-center text-[32px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#000000] min-1024:text-[56px] min-1024:font-semibold min-1024:leading-[1.2] min-1024:tracking-[-0.03em]"
        >
          Each year, your votes spotlight products that set the new standard for digital design.
        </h2>
        <p 
          className="max-w-[584px] text-balance text-center text-[20px] font-normal leading-[1.5] text-[#6e6e73]"
        >
          Mobbin Awards is our first-ever design award, celebrating the best in craftsmanship across iOS, Web, Sites, Animation, and Innovation.
        </p>
      </div>
    </section>
  );
};

export default TrophyShowcase;