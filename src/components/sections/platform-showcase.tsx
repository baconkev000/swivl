"use client";

import React, { useState } from "react";
import Logo from "@/components/logo";
import {
  LayoutDashboard, ListChecks, BarChart3, FileText, RotateCcw,
  Settings, LogOut, ArrowRight, CheckCircle2, Circle,
} from "lucide-react";

const SEO_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/SEO-Agent-1772568773314.png?width=8000&height=8000&resize=contain";
const REVIEWS_AVATAR = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Reviews-Agent-2-1772554135484.png?width=400&height=400&resize=contain";
const ADS_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Ads-Agent-1772552994043.png?width=200&height=200&resize=contain";

const tabs = [
  {
    id: "seo",
    agentName: "SEO Agent",
    avatar: SEO_AVATAR,
    initial: "S",
    color: "#0088FF",
    lightColor: "#f5f5f7",
    title: "Demand Capture Operator — owns qualified inbound traffic",
    metric: "1,240",
    metricLabel: "Visitors This Month",
    stats: [
      { label: "Keywords ranking", value: "248" },
      { label: "Blog posts published", value: "48" },
      { label: "Organic growth", value: "+34%" },
    ],
    status: "Publishing 2 blog posts today",
    tasks: {
      pending: ["Best HVAC company near you", "5 Reasons to hire a local plumber"],
      inProgress: ["Fixing 34 existing blog posts", "Submitting new pages to Google"],
      completed: ["Published 12 new blog posts", "Fixed 48 broken internal links"],
    },
  },
  {
    id: "reviews",
    agentName: "Reviews Agent",
    avatar: REVIEWS_AVATAR,
    initial: "R",
    color: "#1d1d1f",
    lightColor: "#f5f5f7",
    title: "Trust & Conversion Operator — owns public perception and close rate",
    metric: "4.8 ★",
    metricLabel: "Star Rating",
    stats: [
      { label: "Reviews answered", value: "312" },
      { label: "New reviews this week", value: "14" },
      { label: "Response rate", value: "98%" },
    ],
    status: "Responded to 3 reviews this morning",
    tasks: {
      pending: ["Reply to Sarah M.'s review", "Request reviews from 8 customers"],
      inProgress: ["Monitoring new Google reviews", "Drafting response templates"],
      completed: ["Replied to 14 reviews this week", "Rating improved 4.6 → 4.8"],
    },
  },
  {
    id: "ads",
    agentName: "Ads Agent",
    avatar: ADS_AVATAR,
    initial: "A",
    color: "#111827",
    lightColor: "#F3F4F6",
    title: "Demand Generation Operator — owns profitable customer acquisition",
    metric: "32",
    metricLabel: "New Customers This Month",
    stats: [
      { label: "Active campaigns", value: "3" },
      { label: "Cost per customer", value: "$4.20" },
      { label: "Avg ROAS", value: "4.8x" },
    ],
    status: "Optimizing ad budget for best ROI",
    tasks: {
      pending: ["Review Black Friday campaign", "Approve Google search terms"],
      inProgress: ["Creating TikTok ad variations", "Optimizing Meta audience"],
      completed: ["Launched 3 Google campaigns", "Redesigned Meta ad creatives"],
    },
  },
];

const sidebarNav = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ListChecks, label: "Tasks", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: FileText, label: "Files", active: false },
  { icon: RotateCcw, label: "Recaps", active: false },
];

function MiniTask({ text, variant }: { text: string; variant: "pending" | "progress" | "done" }) {
  return (
    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-full" style={{ backgroundColor: "#f5f5f7" }}>
      <span className={`text-[9px] truncate font-medium ${variant === "done" ? "line-through text-black" : "text-black"}`} style={{ opacity: variant === "done" ? 0.3 : 0.8 }}>
        {text}
      </span>
      <div className="shrink-0 ml-1.5">
        {variant === "pending" && <ArrowRight size={7} className="text-black" />}
        {variant === "progress" && <Circle size={11} className="text-black" style={{ opacity: 0.3 }} />}
        {variant === "done" && <CheckCircle2 size={11} className="text-black" style={{ opacity: 0.4 }} />}
      </div>
    </div>
  );
}

export default function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabs[activeTab];

  return (
    <section className="bg-white py-[80px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-[640px]">
          <h2 className="text-[36px] md:text-[48px] font-semibold text-black tracking-[-0.03em] leading-[1.1]">
            Your agents, live in the dashboard
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-6 p-1 rounded-2xl w-fit" style={{ backgroundColor: "#f5f5f7" }}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all"
              style={
                activeTab === i
                  ? { backgroundColor: "#fff", color: t.color }
                  : { backgroundColor: "transparent", color: "#000000", opacity: 0.4 }
              }
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: activeTab === i ? t.color : "#000000", opacity: activeTab === i ? 1 : 0.3 }}
              />
              {t.agentName}
            </button>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ backgroundColor: "#f5f5f7", padding: "10px" }}
        >
          <div className="bg-white rounded-2xl overflow-hidden flex min-h-[480px]">
            {/* Sidebar */}
            <div className="w-[160px] p-4 flex-col hidden sm:flex shrink-0" style={{ borderRight: "1px solid #f5f5f7" }}>
            <div className="flex items-center gap-1.5 mb-6 px-2">
              <Logo height={20} />
            </div>
              <nav className="space-y-0.5">
                {sidebarNav.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 text-[10px] font-medium px-3 py-2.5 rounded-full"
                    style={item.active ? { backgroundColor: "#000000", color: "#fff" } : { color: "#000000", opacity: 0.35 }}
                  >
                    <item.icon size={13} strokeWidth={item.active ? 2 : 1.6} />
                    {item.label}
                  </div>
                ))}
              </nav>
              <div className="mt-auto pt-4 space-y-0.5" style={{ borderTop: "1px solid #f5f5f7" }}>
                <div className="flex items-center gap-2 text-[10px] text-black px-3 py-2" style={{ opacity: 0.4 }}>
                  <Settings size={12} strokeWidth={1.6} /> Settings
                </div>
                <div className="flex items-center gap-2 text-[10px] text-black px-3 py-2" style={{ opacity: 0.4 }}>
                  <LogOut size={12} strokeWidth={1.6} /> Logout
                </div>
              </div>
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0 p-5" style={{ backgroundColor: "#f5f5f7" }}>
              {/* Welcome */}
              <div className="mb-4">
                <p className="text-[11px] text-black" style={{ opacity: 0.4 }}>Good morning — your agents are active</p>
              </div>

              {/* Agent metric card */}
                <div className="bg-white rounded-2xl p-4 mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 overflow-hidden shrink-0">
                        <img src={tab.avatar} alt={tab.agentName} width={36} height={36} style={{ width: 36, height: 36, objectFit: "contain", display: "block" }} />
                      </div>
                    <div>
                    <p className="text-[11px] font-semibold text-black">{tab.agentName}</p>
                    <p className="text-[9px] text-black" style={{ opacity: 0.4 }}>{tab.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[22px] font-semibold tracking-[-0.04em] leading-none" style={{ color: tab.color }}>
                    {tab.metric}
                  </p>
                  <p className="text-[9px] text-black mt-0.5" style={{ opacity: 0.4 }}>{tab.metricLabel}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {tab.stats.map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-3">
                    <p className="text-[9px] text-black mb-1" style={{ opacity: 0.4 }}>{s.label}</p>
                    <p className="text-[14px] font-semibold text-black">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Tasks */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-[9px] text-black mb-2 font-medium" style={{ opacity: 0.4 }}>To review</p>
                  <div className="space-y-1.5">
                    {tab.tasks.pending.map((t, i) => <MiniTask key={i} text={t} variant="pending" />)}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-[9px] text-black mb-2 font-medium" style={{ opacity: 0.4 }}>In progress</p>
                  <div className="space-y-1.5">
                    {tab.tasks.inProgress.map((t, i) => <MiniTask key={i} text={t} variant="progress" />)}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-[9px] text-black mb-2 font-medium" style={{ opacity: 0.4 }}>Done</p>
                  <div className="space-y-1.5">
                    {tab.tasks.completed.map((t, i) => <MiniTask key={i} text={t} variant="done" />)}
                  </div>
                </div>
              </div>

              {/* Status chip */}
              <div
                className="flex items-center gap-2 mt-3 rounded-xl px-3 py-2 w-fit"
                style={{ backgroundColor: tab.lightColor }}
              >
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tab.color }} />
                <p className="text-[10px]" style={{ color: tab.color }}>{tab.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
