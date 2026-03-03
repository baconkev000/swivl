import React from "react";

const SEO_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/SEO-Agent-1772568773314.png?width=8000&height=8000&resize=contain";
const REVIEWS_AVATAR = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Reviews-Agent-2-1772554135484.png?width=400&height=400&resize=contain";
const ADS_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Ads-Agent-1772552994043.png?width=200&height=200&resize=contain";

const agents = [
    {
      avatar: SEO_AVATAR,
      initial: "S",
      name: "SEO Agent",
      role: "SEO Agent — Demand Capture Operator",
      metric: "1,240",
      metricLabel: "Visitors This Month",
      stats: [
        { label: "Blog posts published", value: "48" },
        { label: "Keywords ranking", value: "248" },
        { label: "Organic growth", value: "+34%" },
      ],
      status: "Publishing 2 blog posts today",
      pain: "Most SMBs are invisible on Google. SEO fixes that — permanently.",
      href: "/seo",
      color: "#0088FF",
      lightColor: "#f5f5f7",
    },
      {
        avatar: REVIEWS_AVATAR,
        initial: "R",
        name: "Reviews Agent",
        role: "Reviews Agent — Trust & Conversion Operator",
        metric: "4.8 ★",
        metricLabel: "Star Rating",
        stats: [
          { label: "Reviews answered", value: "312" },
          { label: "New reviews this week", value: "14" },
          { label: "Response rate", value: "98%" },
        ],
        status: "Responded to 3 reviews this morning",
        pain: "Customers read reviews before calling. Reviews makes yours shine.",
        href: "/reputation",
        color: "#1d1d1f",
        lightColor: "#f5f5f7",
      },
      {
        avatar: ADS_AVATAR,
        initial: "A",
        name: "Ads Agent",
        role: "Ads Agent — Demand Generation Operator",
        metric: "32",
        metricLabel: "New Customers This Month",
        stats: [
          { label: "Active ad campaigns", value: "3" },
          { label: "Cost per customer", value: "$4.20" },
          { label: "Close rate", value: "6.2%" },
        ],
        status: "Optimizing ad budget for best ROI",
        pain: "Ads without strategy burn money. Ads makes every dollar count.",
        href: "/paid-ads",
        color: "#111827",
        lightColor: "#F3F4F6",
      },

];

export default function AIAgents() {
  return (
    <section style={{ backgroundColor: "#f5f5f7" }} className="py-[80px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-14 md:mb-16 max-w-[600px]">
          <p className="text-[13px] font-semibold text-black uppercase tracking-widest mb-4" style={{ opacity: 0.4 }}>
            Your AI Team
          </p>
          <h2 className="text-[36px] md:text-[48px] font-semibold text-black tracking-[-0.03em] leading-[1.1] mb-5">
            Every SMB needs all three.<br />Most are failing at all three.
          </h2>
          <p className="text-[17px] text-black leading-[1.65]" style={{ opacity: 0.5 }}>
            No time, staff, or expertise to manage marketing, reputation, and ads. That&apos;s exactly what SEO, Reviews, and Ads handle — autonomously, every day.
          </p>
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {agents.map((agent) => (
            <a
              key={agent.name}
              href={agent.href}
              className="bg-white rounded-3xl p-7 flex flex-col gap-6 hover:shadow-sm transition-shadow"
            >
              {/* Agent header */}
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 overflow-hidden">
                        <img src={agent.avatar} alt={agent.name} width={44} height={44} style={{ width: 44, height: 44, objectFit: "contain", display: "block" }} />
                      </div>
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                        style={{ backgroundColor: agent.color }}
                      />
                    </div>
                <div>
                  <p className="text-[15px] font-semibold text-black leading-tight">{agent.name}</p>
                  <p className="text-[12px] text-black leading-tight mt-0.5" style={{ opacity: 0.4 }}>{agent.role}</p>
                </div>
              </div>

              {/* Primary metric */}
              <div>
                <p className="text-[11px] font-semibold text-black uppercase tracking-wide mb-1.5" style={{ opacity: 0.4 }}>
                  {agent.metricLabel}
                </p>
                <p className="text-[40px] font-semibold tracking-[-0.04em] leading-none" style={{ color: agent.color }}>
                  {agent.metric}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-2.5">
                {agent.stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-[13px] text-black" style={{ opacity: 0.5 }}>{s.label}</span>
                    <span className="text-[13px] font-semibold text-black">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Status chip */}
              <div
                className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                style={{ backgroundColor: agent.lightColor }}
              >
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: agent.color }} />
                <p className="text-[12px]" style={{ color: agent.color }}>{agent.status}</p>
              </div>

              {/* Pain point */}
              <p className="text-[13px] text-black leading-relaxed" style={{ opacity: 0.4 }}>{agent.pain}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
