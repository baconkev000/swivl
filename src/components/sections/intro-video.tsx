"use client";

import React from "react";

export default function IntroVideo() {
  const videoSrc =
    "https://bytescale.mobbin.com/FW25bBB/video/mobbin.com/prod/assets/file.mp4?enc=1.BQnbdJK6.1sgXhAN6qJ9Mo7Vw.H3X_64Yjm4Uf1NRMl1aEk-BLcyNuifbmlgt6AVLt9CJJCLJnPwEiez3mpXf-rpyiaAI908OCFfaflEtSXE_DfX8rJJN1FrfpEdB7atviLMXMq_3YX8WKir0XejXunT-KXwHQy0Q6s9PvVyaQbHnLzCEFWyyO5WkCRJ3MkycFiwDReFJYm-P9tHFEbIkqb3zJfbSmeIW1r90xEVmWv6ScUE0XRPqAlwVAflSip5C4JLBlT9vVhCY4HmZ0An2mksY4lZI6W3PUKC0cNJrTO2rm6PvD9_Z3ojsTT6ZJG9N7SFRcC_R69cH2X4vkmbqXuSCE0ZyttGvUF_y-uBRrgA";

  return (
    <section 
      className="flex flex-col items-center gap-y-64 place-self-center px-4 min-1024:gap-y-[160px] min-1024:px-[32px] w-full max-w-[1280px] mx-auto"
      data-sentry-component="TrophySection"
    >
      <article 
        className="group relative flex items-center justify-center aspect-[4/5] w-full overflow-hidden rounded-[28px] min-1024:aspect-[99/59] bg-[#f2f2f2]"
        data-sentry-component="TrophyVideoClient"
      >
        <video 
          className="h-full w-full object-cover object-center" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Interaction overlay elements if needed, preserving the original structure */}
        <div className="absolute bottom-24 left-24 hidden min-1024:flex opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity duration-300 ease-out">
          <button 
            className="relative inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-semibold bg-white/20 text-white backdrop-blur-md" 
            aria-label="Play video"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="h-3 w-3">
              <title>play icon</title>
              <path d="M5 4V16L16 10L5 4Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </article>
  </section>
);
}