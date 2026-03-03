"use client";

import React from "react";
import Image from "next/image";

const scheduleData = [
  {
    id: "finalists",
    date: "Dec 31 2025",
    description:
      "Our panel of industry experts reviews thousands of products each year to curate a shortlist of standout work. These finalists represent the most thoughtful, well-crafted digital experiences across each category.",
    asset: {
      type: "image",
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-6.webp",
      alt: "Finalists showcase grid",
    },
  },
  {
    id: "voting",
    date: "Feb 23 2026",
    description:
      "Now it’s your turn. As a community, your votes decide which finalists deserve the top spot and ultimately take home the Mobbin Award.",
    asset: {
      type: "video",
      src: "https://bytescale.mobbin.com/FW25bBB/video/mobbin.com/prod/assets/file.mp4?enc=1.BQnbdJK6.e_kOm5ma2i8lPqWF.g6e6LdoqxCultaXJBpTPQDY7q6ngTXVRNapIjrmhix7CK14G5Rvtp2rlNAChptdyaPyhws7b7LHI_s0BD6U4tG6wOdvDEZvDNOiktCd6jZ5AYLlh3nXuBExEUIoHxF9PC9PDwNuhMN8s2Sg__GhL2Akl4ycTo-ty1q_t_CcuNp60B3SraASzrt3Lc0ob97VP3pJAtawTBxbB2yE8AuszKlI0LF4B1LzEocrg4XHXgIpGfwtt5EfyCQ2Z87eHGfFvzupQTBZAuvzt-nBlH2oadIBQICLBQ6yd8-nlupY9u4su3k1lA1G4gs7T",
    },
  },
  {
    id: "winners",
    date: "Mar 23 2026",
    description:
      "Winners are announced across all categories, celebrating the products that received the most community votes and stood out as the year’s best digital work.",
    asset: {
      type: "video",
      src: "https://bytescale.mobbin.com/FW25bBB/video/mobbin.com/prod/assets/file.mp4?enc=1.BQnbdJK6.IUZXrJ2-V1Mb-bY2.UU14a_nSvQ6bj_bqlz7dVnSzr8OxSnCiNJtb-859K5yQxNqR4HqOD80O245uh1aY41ryMgbyUL-FNn55-ab62nlYx0t3aIQxAsueaiFahxOpUM23k6JI8CDHjygvY4EpcAxoL5WN0Y54HffeFYUU1XKiPG4J878IUEifzlorvmPyQ8MpxRsKf2iLm06aqzv2Hk3B3gRq3ba_qV7zJeo1EqY72gVQBsDXYbP4e5oUzjijmDhXSAhjZfjtbiuSgo5O-2wafCDPeLYAGdfuiHoFa7SW2r3qboO8e1sFuR8mwyge02ww5Lb9oYA",
    },
  },
];

export default function Schedule() {
  const [activeSection, setActiveSection] = React.useState("winners");

  // Simple scroll spy logic
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0% -10% 0%" }
    );

    scheduleData.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-[120px] px-4 md:px-[var(--container-x-padding,152px)]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-center text-[56px] font-semibold tracking-tight mb-[80px] md:mb-[120px]">
          Schedule
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 relative">
          {/* Sticky Sidebar */}
          <div className="hidden lg:block">
            <nav className="sticky top-1/2 -translate-y-1/2 h-fit flex flex-col gap-y-4">
              {["Finalists", "Voting", "Winners"].map((label) => {
                const id = label.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`text-[20px] font-semibold transition-colors duration-300 ${
                      isActive ? "text-black" : "text-[#AEAEB2]"
                    }`}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Timeline content */}
          <ul className="flex flex-col gap-y-[64px] lg:gap-y-[120px]">
            {scheduleData.map((item) => (
              <li
                key={item.id}
                id={item.id}
                className="scroll-mt-32 flex flex-col items-start gap-y-8"
              >
                <div className="w-full flex flex-col gap-y-8">
                  {/* Date Badge */}
                  <div className="inline-flex items-center justify-center rounded-[8px] border-[1.5px] border-[#D2D2D7] bg-[#F5F5F7] px-2 py-1 text-[12px] font-semibold uppercase tracking-wider w-fit">
                    {item.date}
                  </div>

                  {/* Description */}
                  <p className="text-[16px] leading-[1.5] text-black max-w-full">
                    {item.description}
                  </p>
                </div>

                {/* Asset Container */}
                <div className="mt-8 relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-[#D2D2D7]">
                  {item.asset.type === "image" ? (
                    <Image
                      src={item.asset.src!}
                      alt={item.asset.alt || ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    >
                      <source src={item.asset.src} type="video/mp4" />
                    </video>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}