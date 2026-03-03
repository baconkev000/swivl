"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Logo from "@/components/logo";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Puzzle,
  Settings,
  LogOut,
  ArrowRight,
  CheckCircle2,
  Circle,
  Search,
  Download,
  MoreHorizontal,
  CreditCard,
  User,
  Menu,
  X,
  Plus,
  ArrowUp,
  TrendingUp,
  Star,
  Zap,
  Eye,
  Link2,
  CheckCheck,
  AlertCircle,
  ChevronLeft,
  BarChart3,
  Target,
  DollarSign,
  MessageSquare,
  Bell,
    Repeat,
    Building2,
    Globe,
    Phone,
    Save,
    ChevronDown,
    AlertTriangle,
    X as XIcon,
    Lock,
    RefreshCw,
    Mic,
    Volume2,
    Sparkles,
    AudioLines,
  } from "lucide-react";

/* ─── Types ─── */
interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  plan: string;
  stripe_customer_id: string | null;
  created_at: string;
  business_name?: string | null;
  business_address?: string | null;
  industry?: string | null;
  tone_of_voice?: string | null;
  phone?: string | null;
  description?: string | null;
  website_url?: string | null;
}

interface Subscription {
  id: string;
  plan: string;
  price: number;
  status: string;
  current_period_end: string | null;
}

/* ─── Sidebar nav ─── */
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: CheckSquare, label: "Tasks", id: "tasks" },
  { icon: FileText, label: "Files", id: "files" },
  { icon: Puzzle, label: "Integrations", id: "integrations" },
];

/* ─── Integration definitions per agent ─── */
const agentIntegrations: Record<string, { name: string; logo: React.FC<{ size?: number }>; description: string; required: boolean }[]> = {
  seo: [
    {
      name: "Google Search Console",
      logo: GoogleSearchConsoleLogo,
      description: "Needed to track keyword rankings, indexing status and click-through rates.",
      required: true,
    },
    {
      name: "Google Analytics",
      logo: GoogleAnalyticsLogo,
      description: "Required to monitor organic traffic, sessions, and conversions.",
      required: true,
    },
    {
      name: "WordPress",
      logo: WordPressLogo,
      description: "Allows seo to publish and update blog posts and pages automatically.",
      required: false,
    },
    {
      name: "Semrush",
      logo: SemrushLogo,
      description: "Used for competitor analysis and keyword research at scale.",
      required: false,
    },
  ],
  reviews: [
    {
      name: "Google Business Profile",
      logo: GoogleBusinessLogo,
      description: "Required to respond to reviews and keep your listing up to date.",
      required: true,
    },
    {
      name: "Yelp",
      logo: YelpLogo,
      description: "Allows reviews to monitor and respond to Yelp reviews on your behalf.",
      required: true,
    },
    {
      name: "Facebook",
      logo: FacebookLogo,
      description: "Connect to manage and respond to Facebook page reviews.",
      required: false,
    },
    {
      name: "Trustpilot",
      logo: TrustpilotLogo,
      description: "Monitor and respond to Trustpilot reviews automatically.",
      required: false,
    },
  ],
  ads: [
    {
      name: "Google Ads",
      logo: GoogleAdsLogo,
      description: "Required for ads to create, optimize, and manage your Google campaigns.",
      required: true,
    },
    {
      name: "Meta Ads",
      logo: MetaLogo,
      description: "Required to run and optimize Facebook and Instagram ad campaigns.",
      required: true,
    },
    {
      name: "Google Analytics",
      logo: GoogleAnalyticsLogo,
      description: "Used to measure ad attribution and conversion tracking.",
      required: false,
    },
    {
      name: "TikTok Ads",
      logo: TikTokLogo,
      description: "Run and optimize TikTok ad campaigns automatically.",
      required: false,
    },
  ],
};

/* ─── Logos for Google & Yelp ─── */
function GoogleSVGLogo({ size = 24 }: { size?: number }) {
  return (
    <img
      src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
      alt="Google"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain", display: "block" }}
    />
  );
}

function YelpSVGLogo({ size = 24 }: { size?: number }) {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/2560px-Yelp_Logo.svg.png"
      alt="Yelp"
      width={size * 2.5}
      height={size}
      style={{ width: "auto", height: size, objectFit: "contain", display: "block" }}
    />
  );
}


/* ─── Real brand logos via img ─── */
const brandLogos: Record<string, string> = {
  "Google Search Console": "https://www.gstatic.com/images/branding/product/2x/search_console_48dp.png",
  "Google Analytics":      "https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg",
  "WordPress":             "https://s.w.org/style/images/about/WordPress-logotype-simplified.png",
  "Semrush":               "https://cdn.worldvectorlogo.com/logos/semrush.svg",
  "Google Business Profile": "GOOGLE_SVG",
  "Yelp":                  "YELP_SVG",
  "Facebook":              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/240px-2023_Facebook_icon.svg.png",
  "Trustpilot":            "https://cdn.worldvectorlogo.com/logos/trustpilot-1.svg",
  "Google Ads":            "GOOGLE_SVG",
  "Meta Ads":              "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
  "TikTok Ads":            "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/800px-TikTok_logo.svg.png",
};

function BrandLogo({ name, size = 24 }: { name: string; size?: number }) {
  if (name === "Google Business Profile" || name === "Google Ads" || name === "Google") {
    return <GoogleSVGLogo size={size} />;
  }
  if (name === "Yelp") {
    return <YelpSVGLogo size={size} />;
  }
  const src = brandLogos[name];
  if (!src || src === "GOOGLE_SVG" || src === "YELP_SVG") return <span style={{ fontSize: size * 0.5, fontWeight: 700, color: "#666" }}>{name[0]}</span>;
  return <img src={src} alt={name} width={size} height={size} style={{ width: size, height: size, objectFit: "contain" }} />;
}

/* keep type-compat shims for agentIntegrations logo fields */
function GoogleSearchConsoleLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="Google Search Console" size={size} />; }
function GoogleAnalyticsLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="Google Analytics" size={size} />; }
function WordPressLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="WordPress" size={size} />; }
function SemrushLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="Semrush" size={size} />; }
function GoogleBusinessLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="Google Business Profile" size={size} />; }
function YelpLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="Yelp" size={size} />; }
function FacebookLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="Facebook" size={size} />; }
function TrustpilotLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="Trustpilot" size={size} />; }
function GoogleAdsLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="Google Ads" size={size} />; }
function MetaLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="Meta Ads" size={size} />; }
function TikTokLogo({ size = 24 }: { size?: number }) { return <BrandLogo name="TikTok Ads" size={size} />; }

/* ─── Task Row ─── */
function TaskRow({ text, variant }: { text: string; variant: "lead" | "progress" | "completed" | "cta" }) {
  if (variant === "cta") {
    return (
      <div className="flex items-center justify-between px-4 py-3 rounded-full cursor-pointer transition-colors" style={{ backgroundColor: "#f5f5f7" }}>
        <span className="text-[13px] text-black font-medium">{text}</span>
        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
          <ArrowRight size={12} className="text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-full" style={{ backgroundColor: "#f5f5f7" }}>
      <span className={`text-[13px] truncate ${variant === "completed" ? "text-black line-through" : "text-black"}`} style={{ opacity: variant === "completed" ? 0.3 : 0.8 }}>
        {text}
      </span>
      <div className="shrink-0 ml-3">
        {variant === "lead" && (
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f5f5f7" }}>
            <ArrowRight size={12} className="text-black" style={{ opacity: 0.5 } as React.CSSProperties} />
          </div>
        )}
        {variant === "progress" && <Circle size={20} className="text-black" style={{ opacity: 0.3 } as React.CSSProperties} />}
        {variant === "completed" && <CheckCircle2 size={20} className="text-black" style={{ opacity: 0.3 } as React.CSSProperties} />}
      </div>
    </div>
  );
}

/* ─── Tasks data ─── */
const allTasks = {
  inProgress: [
    "Reviewing previous ad performance",
    "Fixing 34 of your existing blog posts",
    "Creating TikTok ad variations",
    "Optimizing Meta audience segments",
    "Updating 18 existing blog posts",
    "Building new contact page",
    "Analyzing competitor keyword gaps",
    "Setting up conversion tracking",
  ],
  completed: [
    "Adding programmatic landing pages",
    "Analyzed SEO strategy",
    "Published 12 new blog posts",
    "Fixed 48 broken internal links",
    "Launched 3 new Google campaigns",
    "Redesigned Meta ad creatives",
    "Optimized meta tags on 85 pages",
    "Created content for 15 programmatic pages",
    "Built 34 high-quality backlinks",
    "Improved Core Web Vitals scores",
    "Set up Google Business Profile",
    "Reduced page load time by 2.1s",
  ],
  pending: [
    "Review new landing page design",
    "Approve blog content batch #4",
    "Review Black Friday campaign",
    "Approve Google Search terms",
    "Check new homepage hero",
    "Review pricing page redesign",
  ],
};

/* ─── Files data ─── */
const files = [
  { name: "seo Strategy Q1 2025.pdf", type: "PDF", size: "2.4 MB", date: "Jan 15, 2025", agent: "seo" },
  { name: "Ad Creative Pack - Holiday.zip", type: "ZIP", size: "48 MB", date: "Jan 12, 2025", agent: "ads" },
  { name: "Keyword Research Report.xlsx", type: "XLSX", size: "1.1 MB", date: "Jan 10, 2025", agent: "seo" },
  { name: "Landing Page Wireframe.fig", type: "FIG", size: "8.2 MB", date: "Jan 8, 2025", agent: "website" },
  { name: "Monthly Performance Report.pdf", type: "PDF", size: "3.6 MB", date: "Jan 5, 2025", agent: "seo" },
  { name: "TikTok Ad Variations.mp4", type: "MP4", size: "124 MB", date: "Jan 3, 2025", agent: "ads" },
  { name: "Blog Content Batch #3.docx", type: "DOCX", size: "540 KB", date: "Dec 28, 2024", agent: "seo" },
  { name: "Homepage Redesign V2.fig", type: "FIG", size: "12.4 MB", date: "Dec 22, 2024", agent: "website" },
  { name: "Competitor Analysis.pdf", type: "PDF", size: "4.8 MB", date: "Dec 18, 2024", agent: "seo" },
  { name: "Meta Campaign Assets.zip", type: "ZIP", size: "36 MB", date: "Dec 15, 2024", agent: "ads" },
];

/* ─── Mini sparkline ─── */
function Sparkline({ data, color = "#1d1d1f" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 4) - 2}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        opacity="0.7"
      />
    </svg>
  );
}

/* ─── Agent Card ─── */
interface AgentCardProps {
  name: string;
  role: string;
  initial: string;
  headlineLabel: string;
  headlineValue: string;
  stats: { label: string; value: string }[];
  sparkData: number[];
  status: string;
  color: string;
  lightColor: string;
  onConnect: (agent: string) => void;
  onOpenChat: (agent: string) => void;
  connectedCount: number;
  totalCount: number;
  activeTasks: string[];
}

function AgentCard({
  name,
  role,
  initial,
  headlineLabel,
  headlineValue,
  stats,
  sparkData,
  status,
  color,
  lightColor,
  onConnect,
  onOpenChat,
  connectedCount,
  totalCount,
  activeTasks,
}: AgentCardProps) {
  const requiredIntegrations = agentIntegrations[name]?.filter((i) => i.required) ?? [];
  const allConnected = connectedCount >= requiredIntegrations.length;

    return (
      <div
        className="bg-white rounded-3xl p-6 flex flex-col gap-5 cursor-pointer transition-shadow"
        onClick={() => onOpenChat(name)}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
          {/* Header */}
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                  {agentAvatars[name] ? (
                    <div className="w-10 h-10 overflow-hidden">
                      <img src={agentAvatars[name]} alt={agentDisplayNames[name] ?? name} width={40} height={40} style={{ width: 40, height: 40, objectFit: "contain", display: "block" }} />
                    </div>
                  ) : (
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[15px] font-semibold ${color === "#f5f5f7" ? "text-black" : "text-white"}`}
                    style={{ backgroundColor: color }}
                  >
                    {initial}
                  </div>
                )}
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                  style={{ backgroundColor: allConnected ? color : "#F59E0B" }}
                />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-black leading-tight">{agentDisplayNames[name] ?? name}</p>
              <p className="text-[12px] text-black leading-tight mt-0.5" style={{ opacity: 0.4 }}>{role}</p>
            </div>
          </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: allConnected ? color : "#F59E0B" }} />
          <span className="text-[11px] text-black font-medium" style={{ opacity: 0.5 }}>
            {allConnected ? "Active" : "Setup needed"}
          </span>
        </div>
      </div>

      {allConnected ? (
        <>
          {/* Headline metric + sparkline */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-medium text-black uppercase tracking-wide mb-1" style={{ opacity: 0.4 }}>{headlineLabel}</p>
              <p className="text-[32px] font-semibold tracking-[-0.04em] leading-none" style={{ color }}>
                {headlineValue}
              </p>
            </div>
            <Sparkline data={sparkData} color={color} />
          </div>

          {/* Supporting stats */}
          <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: "1px solid #f5f5f7" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-[10px] text-black leading-tight font-medium uppercase tracking-wide" style={{ opacity: 0.4 }}>{s.label}</p>
                <p className="text-[15px] font-semibold text-black mt-1">{s.value}</p>
              </div>
            ))}
          </div>

            {/* Status pill */}
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ backgroundColor: lightColor }}>
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <p className="text-[12px] leading-snug" style={{ color }}>{status}</p>
            </div>

            {/* Active tasks with spinners */}
            {activeTasks.length > 0 && (
              <div className="space-y-2 pt-1">
                {activeTasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-1">
                    <div
                      className="w-3.5 h-3.5 rounded-full border-2 shrink-0 animate-spin"
                      style={{ borderColor: `${color}33`, borderTopColor: color }}
                    />
                    <p className="text-[11.5px] text-black leading-snug" style={{ opacity: 0.55 }}>{task}</p>
                  </div>
                ))}
              </div>
            )}


        </>
      ) : (
        <>
          {/* Locked state — no data until integrations connected */}
          <div className="flex-1 flex flex-col items-center justify-center py-6 gap-4">
            {/* Blurred placeholder bars */}
            <div className="w-full space-y-2.5 pointer-events-none select-none" style={{ filter: "blur(6px)", opacity: 0.18 }}>
              <div className="h-8 rounded-lg bg-black w-2/3" />
              <div className="h-3 rounded-lg bg-black w-full" />
              <div className="h-3 rounded-lg bg-black w-4/5" />
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="h-10 rounded-lg bg-black" />
                <div className="h-10 rounded-lg bg-black" />
                <div className="h-10 rounded-lg bg-black" />
              </div>
            </div>
            {/* Lock CTA */}
            <div className="text-center px-2">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#f5f5f7" }}>
                <AlertCircle size={18} style={{ color: "#F59E0B" }} />
              </div>
              <p className="text-[13px] font-semibold text-black mb-1">Connect to activate {name}</p>
              <p className="text-[11px] text-black leading-relaxed mb-4" style={{ opacity: 0.45 }}>
                {requiredIntegrations.map((i) => i.name).join(" and ")} required to start
              </p>
              {/* Required integration logos */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {requiredIntegrations.map((integ, idx) => (
                  <div key={idx} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f5f5f7" }}>
                    <integ.logo size={20} />
                  </div>
                ))}
              </div>
              <button
                  onClick={(e) => { e.stopPropagation(); onConnect(name); }}
                  className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-85"
                  style={{ backgroundColor: color }}
                >
                Connect Integrations
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Performance chart data (30 days) ─── */
const perfData = [
  { day: "Feb 1",  visitors: 180, reviews: 2, leads: 4 },
  { day: "Feb 3",  visitors: 210, reviews: 3, leads: 5 },
  { day: "Feb 5",  visitors: 195, reviews: 1, leads: 3 },
  { day: "Feb 7",  visitors: 240, reviews: 4, leads: 7 },
  { day: "Feb 9",  visitors: 260, reviews: 3, leads: 6 },
  { day: "Feb 11", visitors: 230, reviews: 5, leads: 8 },
  { day: "Feb 13", visitors: 285, reviews: 4, leads: 9 },
  { day: "Feb 15", visitors: 310, reviews: 6, leads: 11 },
  { day: "Feb 17", visitors: 295, reviews: 5, leads: 10 },
  { day: "Feb 19", visitors: 340, reviews: 7, leads: 13 },
  { day: "Feb 21", visitors: 370, reviews: 6, leads: 14 },
  { day: "Feb 23", visitors: 355, reviews: 8, leads: 12 },
  { day: "Feb 25", visitors: 400, reviews: 9, leads: 16 },
  { day: "Feb 27", visitors: 420, reviews: 8, leads: 18 },
  { day: "Feb 28", visitors: 445, reviews: 10, leads: 20 },
];

/* ─── Activity feed ─── */
const agentColors: Record<string, string> = {
  seo: "#0088FF",
  reviews: "#1d1d1f",
  ads: "#111827",
};

const activityFeed = [
  { agent: "seo",     time: "2 min ago",  text: 'Published "5 Reasons to Choose a Local Plumber" — targeting high-intent buyer keywords. Conversion CTA included.' },
  { agent: "seo",     time: "18 min ago", text: "Sent 28 high-intent keywords → Ads Agent for campaign targeting. Expected ROAS uplift +18%." },
  { agent: "reviews", time: "22 min ago", text: "Sent praise themes 'fast service' (82x) + 'friendly staff' (64x) → Ads Agent as 3 creative angles." },
  { agent: "ads",     time: "1 hr ago",   text: "Built 3 new ad creatives using real review language from Reviews Agent. A/B test live. Early CTR +31%." },
  { agent: "reviews", time: "2 hr ago",   text: "Flagged 'wait time' recurring complaint (8x) → SEO Agent for landing page improvement + Ads Agent for audience filter." },
  { agent: "ads",     time: "3 hr ago",   text: "Loaded 28 SEO keywords into Google Search — 6 ad groups created. Current ROAS: 6.8x. Scaling +20%." },
  { agent: "seo",     time: "Yesterday",  text: "Sent top 5 customer objections from search data → Reviews Agent for response tone calibration." },
  { agent: "reviews", time: "Yesterday",  text: "Star rating 4.7 → 4.8. Trust rising. Close rate increasing. CAC dropping. Growth System is working." },
];

function DashboardView({ profile, onConnect, onOpenChat }: { profile: Profile | null; onConnect: (agent: string) => void; onOpenChat: (agent: string) => void }) {
  const [showVisitors, setShowVisitors] = useState(true);
  const [showReviews, setShowReviews] = useState(true);
  const [showLeads, setShowLeads] = useState(true);

  const firstName = profile?.full_name?.split(" ")[0] ?? null;
  const bizName = profile?.business_name ?? null;
  const _industry = profile?.industry ?? null;

  return (
    <div className="flex-1 px-5 pt-3 pb-8 md:p-8 space-y-6" style={{ backgroundColor: "#f5f5f7" }}>
  
        {/* ── Welcome line ── */}
      <div>
        <h2 className="text-[22px] font-semibold text-black tracking-[-0.02em]">
          {firstName ? `Good morning, ${firstName}` : "Good morning"}
        </h2>
        <p className="text-[14px] text-black mt-0.5" style={{ opacity: 0.4 }}>
          {bizName
            ? `Your agents are working hard for ${bizName}. Here's where things stand.`
            : "Your agents are working. Here's where things stand."}
        </p>
      </div>

      {/* ── Three Agent Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AgentCard
            name="seo"
            role="Demand Capture Operator — owns qualified inbound traffic"
            initial="s"
            headlineLabel="Organic Visitors This Month"
            headlineValue="1,240"
            stats={[
              { label: "Keywords ranking", value: "248" },
              { label: "Top 3 positions", value: "34" },
              { label: "Organic growth", value: "+34%" },
            ]}
            sparkData={[180, 210, 195, 240, 260, 310, 370]}
            status={bizName ? `Capturing demand for ${bizName} — 2 posts publishing today` : "Capturing demand — 2 posts publishing today"}
            color="#0088FF"
            lightColor="#EFF6FF"
            onConnect={onConnect}
            onOpenChat={onOpenChat}
            connectedCount={2}
            totalCount={4}
            activeTasks={[
              "Writing conversion post: \"Top 5 Signs You Need a Plumber\"",
              "Sending 28 keyword insights → Ads agent",
            ]}
          />
        <AgentCard
          name="reviews"
          role="Trust & Conversion Operator — owns public perception and close rate"
          initial="r"
          headlineLabel="Star Rating"
          headlineValue="4.8 ★"
          stats={[
            { label: "Total reviews", value: "312" },
            { label: "New this week", value: "14" },
            { label: "Response rate", value: "98%" },
          ]}
          sparkData={[4.4, 4.5, 4.5, 4.6, 4.6, 4.7, 4.8]}
          status="Trust rising — 3 reviews responded to, 2 praise themes sent to Ads"
          color="#1d1d1f"
          lightColor="#f5f5f7"
          onConnect={onConnect}
          onOpenChat={onOpenChat}
          connectedCount={0}
          totalCount={4}
          activeTasks={[
            "Drafting reply to 2-star review from John D.",
            "Sending praise themes 'fast service' → Ads agent",
          ]}
        />
        <AgentCard
          name="ads"
          role="Demand Generation Operator — owns profitable customer acquisition"
          initial="a"
          headlineLabel="Cost Per New Customer"
          headlineValue="$4.20"
          stats={[
            { label: "Active campaigns", value: "3" },
            { label: "Avg ROAS", value: "4.8x" },
            { label: "New customers", value: "28" },
          ]}
          sparkData={[8.5, 7.2, 6.8, 6.1, 5.5, 4.8, 4.2]}
          status={_industry ? `Scaling ${_industry} campaigns — 6.8x ROAS on Google Search` : "Scaling campaigns — 6.8x ROAS on Google Search"}
          color="#111827"
          lightColor="#F3F4F6"
          onConnect={onConnect}
          onOpenChat={onOpenChat}
          connectedCount={2}
          totalCount={4}
          activeTasks={[
            "A/B testing creatives built from review language",
            "Loading 28 SEO keywords → Google Search campaigns",
          ]}
        />

      </div>

      {/* ── Your Business Growth Chart ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[18px] font-semibold text-black tracking-[-0.02em]">Your Business Growth</h2>
            <p className="text-[13px] text-black mt-1" style={{ opacity: 0.4 }}>Last 30 days — visitors, reviews, and new customers</p>
          </div>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { key: "visitors", label: "Visitors",      active: showVisitors, toggle: () => setShowVisitors((v) => !v), color: "#0088FF" },
                  { key: "reviews",  label: "Reviews",       active: showReviews,  toggle: () => setShowReviews((v) => !v),  color: "#1d1d1f" },
                  { key: "leads",    label: "New Customers", active: showLeads,    toggle: () => setShowLeads((v) => !v),    color: "#0088FF" },
                ].map((t) => (

              <button
                key={t.key}
                onClick={t.toggle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
                style={
                  t.active
                    ? { backgroundColor: t.color, color: "#ffffff" }
                    : { backgroundColor: "#f5f5f7", color: "#1d1d1f", opacity: 0.5 }
                }
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.active ? "#ffffff" : "#1d1d1f" }} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={perfData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f7" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#1d1d1f", opacity: 0.4 }} tickLine={false} axisLine={false} interval={2} />
            <YAxis tick={{ fontSize: 11, fill: "#1d1d1f", opacity: 0.4 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "none", fontSize: 13, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", color: "#1d1d1f" }}
              labelStyle={{ fontWeight: 600, marginBottom: 4, color: "#1d1d1f" }}
            />
                {showVisitors && <Line type="monotone" dataKey="visitors" stroke="#0088FF" strokeWidth={2} dot={false} name="Visitors" />}
                {showReviews  && <Line type="monotone" dataKey="reviews"  stroke="#1d1d1f" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Reviews" />}
                {showLeads    && <Line type="monotone" dataKey="leads"    stroke="#0088FF" strokeWidth={2} strokeDasharray="3 3" dot={false} name="New Customers" />}

          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Recent Activity Feed ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8">
        <h2 className="text-[18px] font-semibold text-black tracking-[-0.02em] mb-6">What your agents did today</h2>
        <div className="space-y-1">
          {activityFeed.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 py-3 rounded-xl px-3 -mx-3 transition-colors"
              style={{ cursor: "default" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div className="w-2 h-2 rounded-full mt-[6px] shrink-0" style={{ backgroundColor: agentColors[item.agent] || "#1d1d1f" }} />
              <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-black leading-relaxed">
                    <span className="font-semibold">{agentDisplayNames[item.agent] ?? item.agent}</span>
                    {" "}{item.text}
                  </p>
              </div>
              <span className="text-[11px] text-black shrink-0 mt-0.5 whitespace-nowrap" style={{ opacity: 0.4 }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Stat Boxes ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
        {[
            { label: "New Customers This Month", value: "28",    sub: "from Ads Agent campaigns",  icon: Zap },
          { label: "Your Star Rating",          value: "4.8",  sub: "up from 4.6 last month",     icon: Star },
          { label: "People Found You Online",   value: "1,240", sub: "via Google this month",     icon: Eye },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-3xl p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <s.icon size={15} className="text-black" style={{ opacity: 0.5 } as React.CSSProperties} />
              <p className="text-[12px] font-medium text-black" style={{ opacity: 0.5 }}>{s.label}</p>
            </div>
            <p className="text-[40px] font-semibold tracking-[-0.04em] leading-none text-black">
              {s.value}
            </p>
            <p className="text-[12px] text-black" style={{ opacity: 0.4 }}>{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Files View ─── */
function FilesView() {
  const [query, setQuery] = useState("");
  const filtered = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex-1 p-5 md:p-8 space-y-6" style={{ backgroundColor: "#f5f5f7" }}>
      {/* Header */}
      <div>
        <h2 className="text-[22px] font-semibold text-black tracking-[-0.02em]">Files</h2>
        <p className="text-[14px] text-black mt-0.5" style={{ opacity: 0.4 }}>Assets, reports, and documents created by your agents.</p>
      </div>

      {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3">
        <Search size={15} className="text-black shrink-0" style={{ opacity: 0.35 } as React.CSSProperties} />
        <input
          type="text"
          placeholder="Search files…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 text-[14px] text-black bg-transparent outline-none min-w-0"
          style={{ caretColor: "#1d1d1f" }}
        />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-3xl overflow-hidden overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_80px_80px_130px_52px] px-6 py-4" style={{ borderBottom: "1px solid #f5f5f7" }}>
            {["Name", "Type", "Size", "Date", ""].map((h, i) => (
              <span key={i} className="text-[11px] font-semibold text-black uppercase tracking-wider" style={{ opacity: 0.35, textAlign: i === 4 ? "right" : "left" }}>{h}</span>
            ))}
          </div>
          {/* File rows */}
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {filtered.map((file, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_80px_80px_130px_52px] px-6 py-4 items-center transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#f5f5f7" }}>
                    <FileText size={14} className="text-black" style={{ opacity: 0.45 } as React.CSSProperties} />
                  </div>
                  <span className="text-[13px] text-black truncate">{file.name}</span>
                </div>
                <span className="text-[12px] font-semibold text-black" style={{ opacity: 0.45 }}>{file.type}</span>
                <span className="text-[12px] text-black" style={{ opacity: 0.4 }}>{file.size}</span>
                <span className="text-[12px] text-black" style={{ opacity: 0.4 }}>{file.date}</span>
                <div className="flex items-center justify-end">
                  <button
                    className="p-1.5 rounded-lg transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <Download size={14} className="text-black" style={{ opacity: 0.4 } as React.CSSProperties} />
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-[13px] text-black" style={{ opacity: 0.35 }}>No files match &quot;{query}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Integrations View ─── */
const allIntegrations = [
  {
      agent: "seo",
    agentColor: "#0088FF",
    agentLight: "#f5f5f7",
    items: agentIntegrations.seo,
  },
  {
      agent: "reviews",
    agentColor: "#1d1d1f",
    agentLight: "#f5f5f7",
    items: agentIntegrations.reviews,
  },
  {
      agent: "ads",
    agentColor: "#111827",
    agentLight: "#F3F4F6",
    items: agentIntegrations.ads,
  },
];

// Simulated connected state (in a real app, this would come from the backend)
const initialConnected: Record<string, boolean> = {
  "seo-Google Search Console": true,
  "seo-Google Analytics": true,
  "seo-WordPress": false,
  "seo-Semrush": false,
  "reviews-Google Business Profile": false,
  "reviews-Yelp": false,
  "reviews-Facebook": false,
  "reviews-Trustpilot": false,
  "ads-Google Ads": true,
  "ads-Meta Ads": true,
  "ads-Google Analytics": false,
  "ads-TikTok Ads": false,
};

function IntegrationsView({ focusAgent }: { focusAgent?: string }) {
  const [connected, setConnected] = useState<Record<string, boolean>>(initialConnected);
  const [connecting, setConnecting] = useState<string | null>(null);

  const toggle = (agent: string, name: string) => {
    const key = `${agent}-${name}`;
    if (connected[key]) {
      setConnected((prev) => ({ ...prev, [key]: false }));
    } else {
      setConnecting(key);
      setTimeout(() => {
        setConnected((prev) => ({ ...prev, [key]: true }));
        setConnecting(null);
      }, 1200);
    }
  };

  return (
    <div className="flex-1 px-4 md:px-8 pt-6 pb-10">
      <div className="mb-8">
        <h2 className="text-[22px] font-semibold text-black tracking-[-0.02em]">Integrations</h2>
        <p className="text-[14px] text-black mt-1" style={{ opacity: 0.4 }}>
          Connect the tools your agents need to do their job. Required integrations must be connected to activate each agent.
        </p>
      </div>

      <div className="space-y-8">
        {allIntegrations.map(({ agent, agentColor, agentLight, items }) => {
          const connectedCount = items.filter((i) => connected[`${agent}-${i.name}`]).length;
          const requiredCount = items.filter((i) => i.required).length;
          const requiredConnected = items.filter((i) => i.required && connected[`${agent}-${i.name}`]).length;
          const fullyActive = requiredConnected >= requiredCount;

          return (
            <div
              key={agent}
              id={`agent-${agent.toLowerCase()}`}
              className="bg-white rounded-3xl overflow-hidden"
            >
                {/* Agent header */}
                <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
                  <div className="flex items-center gap-3">
                    {agentAvatars[agent] ? (
                      <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0">
                        <img src={agentAvatars[agent]} alt={agentDisplayNames[agent] ?? agent} width={36} height={36} style={{ width: 36, height: 36, objectFit: "cover", display: "block" }} />
                      </div>
                    ) : (
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[13px] font-semibold"
                        style={{ backgroundColor: agentColor }}
                      >
                        {agent[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-[15px] font-semibold text-black">{agentDisplayNames[agent] ?? agent}</p>
                      <p className="text-[12px] text-black" style={{ opacity: 0.4 }}>
                        {connectedCount} of {items.length} connected
                      </p>
                    </div>
                  </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium"
                  style={fullyActive ? { backgroundColor: agentLight, color: agentColor } : { backgroundColor: "#FFFBEB", color: "#D97706" }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: fullyActive ? agentColor : "#F59E0B" }}
                  />
                  {fullyActive ? "Active" : "Needs setup"}
                </div>
              </div>

              {/* Integration rows */}
              <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
                {items.map((integ) => {
                  const key = `${agent}-${integ.name}`;
                  const isConnected = connected[key];
                  const isConnecting = connecting === key;

                  return (
                    <div key={integ.name} className="flex items-center gap-4 px-6 py-4">
                      {/* Logo */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#f5f5f7" }}>
                        <integ.logo size={26} />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-[14px] font-semibold text-black">{integ.name}</p>
                          {integ.required && (
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
                              style={{ backgroundColor: agentLight, color: agentColor }}
                            >
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-black leading-relaxed" style={{ opacity: 0.5 }}>
                          {integ.description}
                        </p>
                      </div>

                      {/* Connect / Connected button */}
                      <div className="shrink-0">
                        {isConnected ? (
                          <button
                            onClick={() => toggle(agent, integ.name)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium transition-all"
                            style={{ backgroundColor: agentLight, color: agentColor }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                          >
                            <CheckCheck size={14} />
                            Connected
                          </button>
                        ) : (
                          <button
                            onClick={() => toggle(agent, integ.name)}
                            disabled={isConnecting}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-white transition-all disabled:opacity-60"
                            style={{ backgroundColor: agentColor }}
                            onMouseEnter={(e) => !isConnecting && (e.currentTarget.style.opacity = "0.85")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                          >
                            {isConnecting ? (
                              <>
                                <div className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                                Connecting...
                              </>
                            ) : (
                              <>
                                <Link2 size={13} />
                                Connect
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Agent profile images ─── */
const SEO_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/SEO-Agent-1772568773314.png?width=8000&height=8000&resize=contain";
const REVIEWS_AVATAR = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Reviews-Agent-2-1772554135484.png?width=800&height=800&resize=contain";
const ADS_AVATAR     = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/Ads-Agent-1772552994043.png?width=400&height=400&resize=contain";

const agentAvatars: Record<string, string> = {
  seo:     SEO_AVATAR,
  reviews: REVIEWS_AVATAR,
  ads:     ADS_AVATAR,
};

/* Agent display names */
const agentDisplayNames: Record<string, string> = {
  seo:     "SEO Agent",
  reviews: "Reviews Agent",
  ads:     "Ads Agent",
};

function AgentAvatar({ agentKey, size = 40, rounded = "" }: { agentKey: string; size?: number; rounded?: string }) {
  const src = agentAvatars[agentKey];
  if (!src) return null;
  return (
    <div className={`${rounded} overflow-hidden shrink-0`} style={{ width: size, height: size }}>
      <img src={src} alt={agentDisplayNames[agentKey] ?? agentKey} width={size} height={size} style={{ width: size, height: size, objectFit: "contain", display: "block" }} />
    </div>
  );
}

/* ─── Agent config ─── */
const agentConfig: Record<string, {
  color: string; light: string; initial: string; role: string; displayName: string;
  emptyState: { headline: string; description: string };
  starters: { icon: React.FC<{ size?: number; className?: string }>; label: string }[];
  quickStats: { label: string; value: string; change: string }[];
  pastChats: { id: number; title: string }[];
  replies: Record<string, string>;
  getReply: (text: string) => string;
  requiredIntegrations: { name: string; connected: boolean }[];
  contextNote: string;
}> = {
  seo: {
    color: "#0088FF", light: "#EFF6FF", initial: "s",
    displayName: "SEO Agent",
    role: "Demand Capture Operator — owns qualified inbound traffic",
    emptyState: {
      headline: "Let's capture more organic demand >",
      description: "I can audit your site, find keyword gaps, and publish content that ranks."
    },
    starters: [
      { icon: Search, label: "What high-intent keywords should I target?" },
      { icon: FileText, label: "Write a conversion-focused blog post" },
      { icon: TrendingUp, label: "Show me this month's organic performance" },
      { icon: BarChart3, label: "Map my competitors' revenue keywords" },
      { icon: Target, label: "Run a full technical SEO audit" },
      { icon: Link2, label: "Share keyword insights with the Ads agent" },
    ],
    quickStats: [
      { label: "Organic Visitors", value: "1,240/mo", change: "+18%" },
      { label: "Keywords Ranking", value: "248", change: "+14 this week" },
      { label: "Domain Authority", value: "62", change: "+4" },
    ],
    pastChats: [
      { id: 1, title: "High-intent keyword map Q2" },
      { id: 2, title: "Competitor gap — 340 keywords found" },
      { id: 3, title: "Technical audit — 8 issues fixed" },
      { id: 4, title: "Keyword insights sent to Ads agent" },
    ],
    replies: {
      default: "My objective is to capture demand — not just traffic. I focus on keywords with buying intent that convert into revenue. Want me to map your highest-value opportunities right now?",
      keyword: "🎯 **High-Intent Keyword Opportunities:**\n\n1. **'best [service] near me'** — 2,400/mo, low comp, HIGH buyer intent\n2. **'emergency [service] [city]'** — 1,100/mo, transactional, immediate need\n3. **'[service] cost [city]'** — 890/mo, commercial intent, high close rate\n\n📤 I've also shared these with your Ads agent — they'll be used in campaign targeting.\n\nWant me to start creating content for these now?",
      blog: "I'll write that post optimized for conversion — not just traffic.\n\nIt will include:\n- Target keyword in title, H1, and first 100 words\n- FAQ schema for featured snippet capture\n- Clear CTA tied to your service offering\n- Internal links to your highest-converting pages\n\nReady within 24 hours. Shall I proceed?",
      audit: "🔍 **Technical SEO Audit Complete:**\n\nFound **8 issues** impacting your rankings:\n- 3 missing meta descriptions (high priority)\n- 2 images without alt text\n- 1 slow-loading script (+1.4s page load)\n- 1 weak title tag on /services\n- 1 duplicate H1 on homepage\n\n📤 I've flagged the slow script to your Ads agent — it may be hurting landing page CVR too.\n\nFix all automatically?",
      performance: "📈 **Demand Capture Report — This Month:**\n\n🔑 **1,240 organic visitors** — up 18% MoM\n💰 **248 keywords ranking**, 34 in top 3\n🌐 Domain Authority: **62** (up from 58)\n🏆 Top converter: 'best plumber Chicago' — 340 visits, 12 leads\n\nTraffic is up. Conversions are tracking. Growth is the only KPI.",
      competitor: "🕵️ **Competitor Demand Map:**\n\nAnalyzed your top 5 competitors. They rank for **340 keywords you're missing.**\n\nBiggest gaps:\n- Service-specific pages (high commercial intent)\n- Location + service combos (local transactional)\n- Comparison pages ('X vs Y service')\n\n📤 Top 20 keywords sent to Ads agent for campaign targeting.\n\nI can build these pages this week. Start?",
      backlink: "🔗 **Authority Building — This Month:**\n\nBuilt **34 high-quality backlinks** from 22 unique domains.\n\nSources: local business directories (14), industry blogs (12), 3 guest posts, 5 resource pages.\n\nDomain Authority: 58 → **62**\nExpected ranking improvement: 2–3 positions on 40+ pages within 60 days.",
      insights: "📤 **Cross-Agent Insights Shared:**\n\n→ **Ads agent:** 28 high-converting keywords for campaign targeting\n→ **Reviews agent:** Top 5 customer objections found in search queries\n→ **Landing pages:** 3 headline improvements based on search intent data\n\nAll agents are operating as one growth system.",
    },
    getReply(text) {
      const l = text.toLowerCase();
      if (l.includes("keyword") || l.includes("target")) return this.replies.keyword;
      if (l.includes("blog") || l.includes("write") || l.includes("post")) return this.replies.blog;
      if (l.includes("audit") || l.includes("technical") || l.includes("issue")) return this.replies.audit;
      if (l.includes("perform") || l.includes("how is") || l.includes("month") || l.includes("organic")) return this.replies.performance;
      if (l.includes("competitor") || l.includes("gap") || l.includes("map")) return this.replies.competitor;
      if (l.includes("backlink") || l.includes("authority")) return this.replies.backlink;
      if (l.includes("share") || l.includes("ads agent") || l.includes("insight")) return this.replies.insights;
      return this.replies.default;
    },
    requiredIntegrations: [
      { name: "Google Search Console", connected: true },
      { name: "Google Analytics", connected: true },
    ],
    contextNote: "SEO Agent — Demand Capture Operator. Connected to Google Search Console, Google Analytics, CMS, keyword ranking tools, technical crawl data, blog publishing. Part of coordinated Growth System: shares high-converting keywords → Ads Agent; sends objections + frequently searched concerns → Reviews Agent; flags CVR issues → landing pages.",
  },
    reviews: {
      color: "#1d1d1f", light: "#f5f5f7", initial: "r",
      displayName: "Reviews Agent",
      role: "Trust & Conversion Operator — owns public perception and close rate",
      emptyState: {
        headline: "Let's build your public trust >",
        description: "I can automate review requests, draft responses, and analyze customer sentiment."
      },
        starters: [
        { icon: Star, label: "Send review requests to recent customers" },
        { icon: MessageSquare, label: "Draft a response to a negative review" },
        { icon: TrendingUp, label: "How is my reputation impacting conversions?" },
        { icon: Bell, label: "Show me unresponded reviews right now" },
        { icon: Eye, label: "Run a full sentiment analysis on all reviews" },
        { icon: Repeat, label: "Turn my best reviews into ad copy for the Ads agent" },
      ],
      quickStats: [
        { label: "Star Rating", value: "4.8 ★", change: "+0.5 this month" },
        { label: "Total Reviews", value: "312", change: "+47 mo" },
        { label: "Response Rate", value: "98%", change: "+12%" },
      ],
      pastChats: [
        { id: 1, title: "Recovery response — John D. 1-star" },
        { id: 2, title: "Review request campaign — March" },
        { id: 3, title: "Praise themes → sent to Ads agent" },
        { id: 4, title: "Escalation: legal threat — held for approval" },
      ],
      replies: {
        default: "I am your autonomous Reputation & Trust Growth Agent.\n\nObjective: increase conversion rate by strengthening public perception.\n\nMore reviews → Higher trust → Higher close rate → Lower ad cost.\n\nI am part of a coordinated Growth System:\n📤 Repeated praise → I send to Ads Agent as creative angles\n📤 Repeated complaints → I notify SEO Agent + Ads Agent\n\nI convert feedback into marketing leverage.",
        request: "📤 **Automated Review Acquisition — Ready to Send:**\n\n📱 **SMS (278 chars — optimised for max response rate):**\n\n*\"Hey [Name], thank you for choosing us! Your honest feedback means the world to us: {{review_link}} 🙏\"*\n\nTone: Friendly | Timing: 2 hrs post-service\n\n**Tone alternatives:**\n— Professional: *\"Dear [Name], we'd greatly appreciate your feedback: {{review_link}}\"*\n— Luxury: *\"Dear [Name], it was a privilege to serve you. We'd be honoured: {{review_link}}\"*\n\nSend to 8 recent customers now?",
        negative: "📋 **Risk Analysis — Incoming Reviews:**\n\n1. ⭐ **1-star — John D.** (2 hrs ago)\n   *\"Waited 3 hours, no call ahead. Unacceptable.\"*\n   🔴 Risk: MEDIUM | Tone: Frustrated | Energy: 3/10\n   ✋ Draft ready — awaiting your approval before posting.\n\n2. ⭐⭐ **2-star — K. Smith** (Yesterday)\n   🟡 Risk: LOW | Auto-responded ✅\n\n📤 **→ SEO Agent:** 'Wait time' recurring complaint — landing page improvement queued\n📤 **→ Ads Agent:** 'Wait time' added as audience filter\n\nI never argue. I never sound robotic.",
        trending: "📈 **Trust & Conversion Report — This Month:**\n\n⭐ **4.3 → 4.8** (+0.5 pts) · Trust rising = close rate rising\n📝 47 new reviews | 8 min avg response (industry avg: 3+ days)\n🟢 91% Positive · 6% Neutral · 3% Negative\n\n**Praise (reinforced):** Fast service (82x) · Friendly staff (64x)\n**Complaints (softened):** Wait time (8x — reframing in progress)\n\n📤 **→ Ads Agent:** 3 creative angles built from praise language\n📤 **→ SEO Agent:** 'Wait time' objection → landing page content\n\nHigher trust = higher close rate = lower CAC.",
        unresponded: "✅ **All reviews responded to within 15 minutes.**\n\nThis morning:\n— 5-star Sarah M. — 4 min (reinforced 'fast response' signal)\n— 4-star Tom R. — 7 min\n— 2-star K. Smith — 2 min (recovery tone, 3/10 energy)\n\nCalibrated to: star rating · sentiment · risk level (LOW/MEDIUM/HIGH)\n\nI respond 24/7. You never miss a review. I never argue.",
        sentiment: "🧠 **Sentiment Intelligence — 312 Reviews:**\n\n🟢 Positive 91% (284) · 🟡 Neutral 6% (19) · 🔴 Negative 3% (9)\n\n**Praise (reinforcing):** Fast service 82x · Friendly staff 64x · Great value 41x\n**Complaints (softening):** Wait time 8x · Pricing 4x · Communication 3x\n**Staff:** Maria 14 positive mentions · Dan 3 neutral\n\n📤 **→ Ads Agent:** Praise themes → 3 high-converting creative angles\n📤 **→ SEO Agent:** Complaint themes → content addressing objections\n\nFeedback converted into marketing leverage.",
        escalation: "⚠️ **ESCALATION REQUIRED — Response HELD**\n\n🔴 **Google — Anonymous** (3 hrs ago)\n*\"I'm going to report this to the BBB and consult my lawyer if I don't hear back.\"*\n\n**Risk Level:** HIGH | Legal threat + media escalation risk\n**Status:** NOT auto-posted — awaiting your approval\n\nI never auto-post HIGH risk reviews.\n\nSay 'draft it' and I will prepare a legally composed, brand-safe response for your review.",
        adscopy: "📤 **Insight Feedback Loop — Praise → Ad Copy:**\n\nReal language from 312 reviews:\n\n1. 'Fast service' (82x) → *'Same-day service, guaranteed'*\n2. 'Friendly team' (64x) → *'People who care about your home'*\n3. 'Great value' (41x) → *'Quality work at honest prices'*\n\n✅ All 3 angles sent to **Ads Agent** for creative production.\n\nReal review language outperforms any copywriter by 2.3x.\nHigher review volume → better ad copy → lower CAC → revenue growth.",
      },
      getReply(text) {
        const l = text.toLowerCase();
        if (l.includes("send") || l.includes("request") || l.includes("ask for")) return this.replies.request;
        if (l.includes("negative") || l.includes("worst") || l.includes("bad") || l.includes("draft")) return this.replies.negative;
        if (l.includes("trend") || l.includes("how is") || l.includes("month") || l.includes("conversion") || l.includes("reputation")) return this.replies.trending;
        if (l.includes("unrespond") || l.includes("show me review") || l.includes("unanswered")) return this.replies.unresponded;
        if (l.includes("sentiment") || l.includes("saying") || l.includes("analysis") || l.includes("people say")) return this.replies.sentiment;
        if (l.includes("escalat") || l.includes("attention") || l.includes("flag") || l.includes("legal")) return this.replies.escalation;
        if (l.includes("ad copy") || l.includes("ads agent") || l.includes("turn") || l.includes("best review") || l.includes("creative")) return this.replies.adscopy;
        return this.replies.default;
      },
      requiredIntegrations: [
        { name: "Google Business Profile", connected: true },
        { name: "Yelp", connected: true },
      ],
      contextNote: "Reviews Agent — Trust & Conversion Operator. Connected to Google Business Profile, Yelp, Facebook, SMS, Email, CRM. Part of coordinated Growth System: sends praise themes → Ads Agent; sends recurring complaints → SEO + Ads Agents; escalates HIGH-risk reviews for human approval.",
    },
    ads: {
      color: "#111827", light: "#F3F4F6", initial: "a",
      displayName: "Ads Agent",
      role: "Demand Generation Operator — owns profitable customer acquisition",
      emptyState: {
        headline: "Let's scale your customer acquisition >",
        description: "I can optimize your ROAS, refresh ad creatives, and manage your daily budget."
      },
      starters: [
      { icon: TrendingUp, label: "Diagnose my campaign performance" },
      { icon: DollarSign, label: "Optimize my budget allocation for max ROAS" },
      { icon: BarChart3, label: "Which campaign has the best ROAS right now?" },
      { icon: Target, label: "Create a new campaign using SEO keyword data" },
      { icon: Zap, label: "Generate new ad creatives using review language" },
      { icon: MessageSquare, label: "Why is my cost per customer dropping?" },
    ],
    quickStats: [
      { label: "New Customers/mo", value: "28", change: "+12" },
      { label: "Average ROAS", value: "4.8x", change: "+2x" },
      { label: "Cost Per Customer", value: "$4.20", change: "-$4.30" },
    ],
    pastChats: [
      { id: 1, title: "ROAS optimization — Google Search" },
      { id: 2, title: "Creatives from review language" },
      { id: 3, title: "Budget reallocation Q2" },
      { id: 4, title: "SEO keyword data → new campaigns" },
    ],
    replies: {
      default: "I am your autonomous Performance Marketing Agent and Demand Generation Operator.\n\nMy objective: generate profitable customer acquisition at scale.\n\nI am connected to Meta Ads, Google Ads, TikTok Ads, conversion tracking, website analytics, and your CRM revenue data.\n\nProfit > Traffic.\nROAS > Vanity metrics.\nScale only what works.\n\nI am part of a coordinated Growth System:\n📤 I use high-converting keywords from SEO Agent in Google Search campaigns\n📤 I use real review language from Reviews Agent to build creatives\n📤 I report conversion data back to all agents for strategy alignment\n\nIf one metric improves but revenue does not — I re-evaluate strategy.\nGrowth is the only KPI.\n\nWant a full performance diagnosis?",
      performance: "📊 **Performance Diagnosis — This Month:**\n\n**Campaign Leaderboard:**\n— Google Search (Local Intent): **6.8x ROAS** ✅ Scaling +20%\n— Meta Retargeting (Warm Audience): **4.1x ROAS** ✅ Stable\n— TikTok (New Creative Test): **2.9x ROAS** ⚠️ Testing new hooks\n\n**Funnel Metrics:**\nCTR: 4.2% | CVR: 6.8% | CPC: $1.80 | CPM: $12 | Frequency: 2.1 (healthy)\n\n💰 28 new customers | $2,840 total spend | **$4.20 CPA** (down from $8.50)\n\n**Bottleneck identified:** TikTok hook fatigue — refreshing creative before performance drops.\n\n📤 **→ SEO Agent:** Conversion data shared — top landing page flagged for headline alignment\n📤 **→ Reviews Agent:** Ad performance data shared — 'fast service' creative outperforming 2.3x\n\nNo major fatigue signals on Google or Meta. System healthy.",
      budget: "💡 **Optimised Budget Allocation — Intelligence Report:**\n\nBased on current ROAS, CVR, and fatigue signals:\n\n— **Google Search** $1,400/mo · 6.8x ROAS · Scale signal ✅ (+20% this week)\n— **Meta Ads** $900/mo · 4.1x ROAS · Stable ✅ · Maintain\n— **TikTok Ads** $540/mo · 2.9x ROAS · Testing new hooks before scaling\n— **Snapchat** $0 · Paused at 1.4x ROAS · Below profitability threshold\n\nTotal: **$2,840/mo → 28 customers → $4.20 CPA**\n\nProfit > Traffic. Scale only what works. Kill what doesn't.\n\n📤 Applying reallocation now. Apply?",
      roas: "🏆 **ROAS Leaderboard — Real-time:**\n\n1. Google Search — **6.8x** ✅ Scale signal active · +20% budget approved\n2. Meta Retargeting — **4.1x** ✅ Stable · Maintain allocation\n3. TikTok — **2.9x** ⚠️ Below threshold · Testing new hooks from Reviews Agent language\n\nSnapchat paused last week at 1.4x — below profitability threshold.\n\n**Why Google is performing:**\n📤 28 high-intent keywords from SEO Agent loaded → keyword-intent match is near-perfect\n📤 Ad creatives built from Reviews Agent praise language → outperforming generic copy by 2.3x\n\nThis is the Growth System in action. Coordinated = profitable.",
      campaign: "🚀 **New Campaign — Built from Growth System Data:**\n\n📤 Pulling from **SEO Agent** ... 28 high-intent keywords loaded\n📤 Pulling from **Reviews Agent** ... 'fast service', 'friendly team', 'great value' loaded as copy angles\n\n**Campaign structure ready:**\n— 6 ad groups (keyword-clustered by intent)\n— 3 creative variations per group (A/B test from day 1)\n— Google Search + Meta retargeting funnel\n\n**Creative hooks generated from real review language:**\n— 'Same-day service, guaranteed'\n— 'People who actually care about your home'\n— 'Quality work at honest prices'\n\nSEO feeds demand data. Reviews feeds trust language. Ads builds the campaign.\nThis is how the Growth System scales revenue.\n\nApprove and launch?",
      why: "📉 **Why Your CPA Is Dropping — Root Cause Analysis:**\n\n1. SEO Agent shared 28 negative keywords → -22% wasted spend\n2. Meta lookalike expanded (1% → 2%) → +38% CVR improvement\n3. Paused 2 ad sets below 2x ROAS threshold → budget freed to winners\n4. Reviews Agent praise language in creatives → CTR +31% vs generic copy\n5. SEO Agent top keywords in Google Search → intent match improvement\n\n**Before Growth System:** CPA $8.50\n**Now:** CPA **$4.20**\n\nSame budget. More customers. Same spend.\n\nTraffic ↑ · Trust ↑ · Conversion rate ↑ · CAC ↓ · Revenue ↑\nThat is scaling.",
      creative: "🎨 **Creative Production — Built from Real Review Language:**\n\n📤 Sourced from **Reviews Agent** — 312 real customer reviews:\n\n1. **'Same-day service, guaranteed'**\n   Source: 'Fast service' (82x mentions)\n   Hook: *\"Still waiting 3 days for a callback? We're there the same day.\"*\n\n2. **'People who care about your home'**\n   Source: 'Friendly team' (64x mentions)\n   Hook: *\"Our team treats your home like their own. Here's proof.\"*\n\n3. **'Honest prices, no surprises'**\n   Source: 'Great value' (41x mentions)\n   Hook: *\"No surprise invoices. No hidden fees. Fair pricing, always.\"*\n\n✅ All 3 creatives A/B testing now.\nReal review language outperforms any copywriter by 2.3x at current CTR.\n\nGenerate video scripts or static ad copy for any angle?",
      landing: "🔍 **Landing Page Feedback — CVR Issue Detected:**\n\nHigh CTR + Low CVR on /services detected.\n\n**Issues identified:**\n— Headline doesn't match ad message (intent mismatch → bounce rate ↑)\n— No trust signal above the fold\n— CTA: 'Contact Us' (weak urgency, low conversion intent)\n— No social proof or review widget visible\n\n**Projected impact of fixes:**\n— Headline alignment: +0.8% CVR\n— Review widget above fold: +0.6% CVR\n— CTA upgrade to 'Get a Free Quote': +0.4% CVR\n= **+1.8% total CVR** = ~5 extra customers/month at current traffic\n\n📤 **→ SEO Agent:** Headline + CTA improvements flagged\n📤 **→ Reviews Agent:** Review widget above fold requested\n\nIf high CTR but low CVR — the landing page is the bottleneck, not the ad.",
    },
    getReply(text) {
      const l = text.toLowerCase();
      if (l.includes("perform") || l.includes("diagnos") || l.includes("how are") || l.includes("metrics")) return this.replies.performance;
      if (l.includes("budget") || l.includes("allocat") || l.includes("spend")) return this.replies.budget;
      if (l.includes("roas") || l.includes("best campaign") || l.includes("leaderboard")) return this.replies.roas;
      if (l.includes("campaign") || l.includes("create") || l.includes("launch") || l.includes("keyword data") || l.includes("new ad")) return this.replies.campaign;
      if (l.includes("why") || l.includes("going down") || l.includes("dropping") || l.includes("cost") || l.includes("cpa")) return this.replies.why;
      if (l.includes("creative") || l.includes("idea") || l.includes("review language") || l.includes("ad copy") || l.includes("hook")) return this.replies.creative;
      if (l.includes("landing") || l.includes("cvr") || l.includes("page") || l.includes("conversion rate")) return this.replies.landing;
      return this.replies.default;
    },
    requiredIntegrations: [
      { name: "Google Ads", connected: true },
      { name: "Meta Ads", connected: true },
    ],
    contextNote: "Ads Agent — Demand Generation Operator. Connected to Meta Ads, Google Ads, TikTok Ads, conversion tracking, website analytics, CRM revenue data. Part of coordinated Growth System: uses SEO Agent keywords + Reviews Agent praise themes to build campaigns; reports ROAS/conversion data back to all agents; flags landing page CVR issues to SEO + Reviews agents.",
  },
};

/* ─── Agent Detail + Chat View ─── */
type ChatMessage = { role: "user" | "agent"; text: string };
type ChatThread = { id: number; title: string; messages: ChatMessage[] };

const agentDetailData: Record<string, {
  activity: { time: string; text: string; type: "done" | "working" | "alert" }[];
  tasks: { label: string; status: "done" | "working" | "pending" }[];
  stats: { label: string; value: string; sub: string; icon: React.FC<{ size?: number; className?: string }> }[];
}> = {
  seo: {
    activity: [
      { time: "2 min ago",  text: 'Published "5 Reasons to Choose a Local Plumber" — targeting "emergency plumber near me" (HIGH intent)', type: "done" },
      { time: "18 min ago", text: "Sent 28 high-intent keywords to Ads agent for campaign targeting — expected ROAS uplift +18%", type: "done" },
      { time: "34 min ago", text: "Fixed 12 broken internal links and resubmitted affected pages to Google Search Console", type: "done" },
      { time: "1 hr ago",   text: "Detected crawl error on /services/hvac — investigating. Flagging to Ads agent (may hurt landing page CVR)", type: "alert" },
      { time: "2 hr ago",   text: "Competitor gap analysis: 340 high-intent keywords found. Top 20 sent to Ads agent for immediate targeting", type: "done" },
      { time: "3 hr ago",   text: "Sent top 5 customer objections from search data to Reviews agent — for response tone calibration", type: "done" },
      { time: "Yesterday",  text: 'Published "How to Pick the Best HVAC Company Near You" — 340 organic visits so far, 12 conversions', type: "done" },
      { time: "Yesterday",  text: "Built 4 new backlinks. Domain Authority: 58 → 62. Conversion-focused pages prioritised.", type: "done" },
    ],
    tasks: [
      { label: "Writing conversion-focused blog posts (targeting buyer-intent keywords)", status: "working" },
      { label: "Mapping competitor revenue keywords — 340 found, 20 sent to Ads agent", status: "working" },
      { label: "Building 12 programmatic service + location pages (high transactional intent)", status: "working" },
      { label: "Flagging landing page issues to Ads agent (CVR improvement)", status: "pending" },
      { label: "Published 12 new conversion-focused blog posts", status: "done" },
      { label: "Fixed 48 broken internal links", status: "done" },
      { label: "Optimised meta tags on 85 pages", status: "done" },
      { label: "Built 34 high-quality backlinks — DA now 62", status: "done" },
    ],
    stats: [
      { label: "Organic Visitors", value: "1,240", sub: "+18% this month", icon: Eye },
      { label: "Keywords Ranking", value: "248", sub: "34 in top 3 positions", icon: TrendingUp },
      { label: "Domain Authority", value: "62", sub: "Up from 58", icon: BarChart3 },
    ],
  },
  reviews: {
    activity: [
      { time: "4 min ago",  text: "Replied to 5-star Google review from Sarah M. — reinforced 'fast response time' (82x mentioned — strengthening brand signal)", type: "done" },
      { time: "22 min ago", text: "Sent 28 review request SMS to recent customers. Optimised for 16.8% conversion rate.", type: "done" },
      { time: "1 hr ago",   text: "1-star review from John D. — MEDIUM risk. Response HELD for approval. Draft: calm, composed, 3/10 energy.", type: "alert" },
      { time: "2 hr ago",   text: "Star rating improved 4.7 → 4.8 on Google. Trust increasing = conversion rate increasing.", type: "done" },
      { time: "3 hr ago",   text: "Sent 'fast service' and 'friendly staff' praise themes to Ads agent — converted to 3 ad creative angles.", type: "done" },
      { time: "4 hr ago",   text: "Sent 'wait time' recurring complaint to SEO agent — flagged for landing page content improvement.", type: "done" },
      { time: "Yesterday",  text: "Responded to 6 Yelp reviews — all within 8 minutes of posting. Industry avg: 3+ days.", type: "done" },
      { time: "2 days ago", text: "Monthly sentiment report: 91% positive. 'Fast service' and 'friendly staff' are your dominant praise themes.", type: "done" },
    ],
    tasks: [
      { label: "Monitoring Google, Yelp, Facebook & Trustpilot — responding within 15 min", status: "working" },
      { label: "Sending automated review requests after every completed service", status: "working" },
      { label: "Drafting recovery response for John D. 1-star (awaiting approval)", status: "pending" },
      { label: "Sharing praise themes with Ads agent for creative production", status: "working" },
      { label: "Responded to 47 reviews this month — 8 min avg response time", status: "done" },
      { label: "Sent 280 review request campaigns — 16.8% conversion rate", status: "done" },
      { label: "Star rating improved 4.3 → 4.8 over 6 months", status: "done" },
      { label: "Escalated 2 high-risk reviews — both held for human approval", status: "done" },
    ],
    stats: [
      { label: "Star Rating", value: "4.8★", sub: "Up from 4.3 — trust is growing", icon: Star },
      { label: "Total Reviews", value: "312", sub: "+47 this month", icon: MessageSquare },
      { label: "Response Rate", value: "98%", sub: "Industry avg: 45%", icon: CheckCircle2 },
    ],
  },
  ads: {
    activity: [
      { time: "1 hr ago",   text: "Loaded 28 high-intent keywords from SEO agent into Google Search — 6 new ad groups created", type: "done" },
      { time: "2 hr ago",   text: "Built 3 new ad creatives using praise themes from Reviews agent: 'fast service', 'friendly team', 'great value'", type: "done" },
      { time: "3 hr ago",   text: "TikTok ROAS dropped to 2.1x — below threshold. Testing new hooks before scaling.", type: "alert" },
      { time: "4 hr ago",   text: "Paused underperforming Meta ad set. Reallocated $340 to Google Search (6.8x ROAS)", type: "done" },
      { time: "5 hr ago",   text: "Added 28 negative keywords from SEO data — projected -22% wasted spend", type: "done" },
      { time: "Yesterday",  text: "Flagged high CTR / low CVR on /services — sent landing page feedback to SEO agent for headline fix", type: "done" },
      { time: "Yesterday",  text: "3 new customers acquired via Google Search. CPA: $3.80 — below $4.20 monthly avg.", type: "done" },
    ],
    tasks: [
      { label: "Scaling Google Search (6.8x ROAS) — increasing budget +20%", status: "working" },
      { label: "A/B testing creatives built from Reviews agent praise language", status: "working" },
      { label: "Targeting 28 SEO keywords in new Google campaigns", status: "working" },
      { label: "Black Friday retargeting campaign — awaiting approval", status: "pending" },
      { label: "Reduced CPA from $8.50 → $4.20 using SEO + reviews data", status: "done" },
      { label: "Paused Snapchat at 1.4x ROAS — below profitability threshold", status: "done" },
      { label: "Expanded Meta lookalike audience — CPA improved 38%", status: "done" },
    ],
    stats: [
      { label: "New Customers/mo", value: "28", sub: "+12 vs last month", icon: Zap },
      { label: "Avg ROAS", value: "4.8x", sub: "Google Search: 6.8x", icon: TrendingUp },
      { label: "Cost Per Customer", value: "$4.20", sub: "Down from $8.50", icon: DollarSign },
    ],
  },
};

/* ─── SEO Agent overview ─── */
function SEOAgentOverview({
  cfg,
  detail,
  onChat,
}: {
  cfg: typeof agentConfig["seo"];
  detail: typeof agentDetailData["seo"];
  onChat: (msg: string) => void;
}) {
  const keywordData = [
    { keyword: "best plumber near me", intent: "HIGH", volume: "2,400", position: 2, change: "▲3" },
    { keyword: "emergency plumber Chicago", intent: "HIGH", volume: "1,100", position: 1, change: "▲5" },
    { keyword: "plumber cost estimate", intent: "MED", volume: "890", position: 4, change: "▲2" },
    { keyword: "local plumbing services", intent: "MED", volume: "720", position: 6, change: "▲1" },
    { keyword: "water heater repair", intent: "HIGH", volume: "540", position: 3, change: "▲4" },
  ];

  const contentPipeline = [
    { title: "Top 5 Signs You Need a Plumber", status: "publishing", intent: "HIGH", eta: "Today" },
    { title: "How to Pick the Best HVAC Company", status: "live", intent: "HIGH", visits: "340" },
    { title: "Emergency vs. Routine Plumbing: What's the Difference?", status: "drafting", intent: "HIGH", eta: "Tomorrow" },
    { title: "Water Heater Repair Cost Guide [City]", status: "queued", intent: "MED", eta: "3 days" },
  ];

  const crossAgentSignals = [
    { to: "ads", signal: "28 high-intent keywords", action: "Loaded into Google Search campaigns" },
    { to: "ads", signal: "Competitor keyword gaps", action: "Used for new ad group targeting" },
    { to: "reviews", signal: "Top 5 search objections", action: "Calibrating response tone" },
    { to: "landing", signal: "CVR issue on /services", action: "Headline + CTA improvement queued" },
  ];

  const intentColor = (i: string) => i === "HIGH" ? "#22C55E" : "#F59E0B";
  const intentBg = (i: string) => i === "HIGH" ? "#F0FDF4" : "#FFFBEB";
  const statusColor = (s: string) => s === "live" ? "#22C55E" : s === "publishing" ? "#0088FF" : s === "drafting" ? "#F59E0B" : "#9CA3AF";
  const statusBg = (s: string) => s === "live" ? "#F0FDF4" : s === "publishing" ? "#EFF6FF" : s === "drafting" ? "#FFFBEB" : "#F9FAFB";

  return (
    <div className="space-y-4">

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {detail.stats.map((s) => (
          <div key={s.label} className="bg-white rounded-3xl p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-black" style={{ opacity: 0.4 }}><s.icon size={13} /></span>
              <p className="text-[11px] font-medium text-black uppercase tracking-wide" style={{ opacity: 0.4 }}>{s.label}</p>
            </div>
            <p className="text-[36px] font-semibold tracking-[-0.04em] leading-none text-black">{s.value}</p>
            <p className="text-[12px] text-black" style={{ opacity: 0.4 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Keyword Rankings + Content Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Keyword Rankings */}
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <div>
              <h3 className="text-[15px] font-semibold text-black">High-Intent Keywords</h3>
              <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>Ranked by buyer intent — not vanity traffic</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#EFF6FF" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] font-medium" style={{ color: "#0088FF" }}>Tracking 248</span>
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {keywordData.map((kw, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3.5 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-black truncate">{kw.keyword}</p>
                  <p className="text-[11px] text-black mt-0.5" style={{ opacity: 0.4 }}>{kw.volume} searches/mo</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{ backgroundColor: intentBg(kw.intent), color: intentColor(kw.intent) }}>
                  {kw.intent}
                </span>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-semibold text-black">#{kw.position}</p>
                  <p className="text-[11px]" style={{ color: "#22C55E" }}>{kw.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Pipeline */}
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <h3 className="text-[15px] font-semibold text-black">Content Pipeline</h3>
            <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>Conversion-focused — every post targets buyer intent</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {contentPipeline.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-black leading-snug">{item.title}</p>
                  <p className="text-[11px] text-black mt-0.5" style={{ opacity: 0.4 }}>
                    {item.status === "live" ? `${item.visits} visits so far` : `ETA: ${item.eta}`}
                  </p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 capitalize"
                  style={{ backgroundColor: statusBg(item.status), color: statusColor(item.status) }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4" style={{ borderTop: "1px solid #f5f5f7" }}>
            <button
              onClick={() => onChat("Write a conversion-focused blog post")}
              className="text-[13px] font-semibold transition-colors"
              style={{ color: "#0088FF" }}
            >
              + Request a new post →
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Agent Intelligence */}
      <div className="bg-white rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[15px] font-semibold text-black">Cross-Agent Intelligence</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#EFF6FF", color: "#0088FF" }}>Growth System</span>
        </div>
          <p className="text-[12px] text-black mb-5" style={{ opacity: 0.4 }}>SEO Agent shares insights with Ads Agent and Reviews Agent — no siloed thinking</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {crossAgentSignals.map((sig, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl" style={{ backgroundColor: "#f5f5f7" }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: sig.to === "ads" ? "#111827" : sig.to === "reviews" ? "#1d1d1f" : "#0088FF" }}>
                <span className="text-[9px] font-bold text-white">{sig.to === "landing" ? "pg" : sig.to[0]}</span>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-black">{sig.signal}</p>
                <p className="text-[11px] text-black" style={{ opacity: 0.5 }}>→ {sig.to}: {sig.action}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => onChat("Share keyword insights with the Ads agent")}
          className="mt-4 text-[13px] font-medium text-black transition-colors"
          style={{ opacity: 0.45 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}
        >
          View all cross-agent signals →
        </button>
      </div>

      {/* Tasks + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <h3 className="text-[15px] font-semibold text-black">Active Tasks</h3>
            <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>All focused on demand capture and conversion</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {detail.tasks.map((task, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {task.status === "done" && <CheckCircle2 size={15} className="shrink-0" style={{ color: "#0088FF", opacity: 0.5 }} />}
                {task.status === "working" && <div className="w-3.5 h-3.5 rounded-full border-2 shrink-0 animate-spin" style={{ borderColor: "#0088FF33", borderTopColor: "#0088FF" }} />}
                {task.status === "pending" && <Circle size={15} className="shrink-0 text-black" style={{ opacity: 0.2 }} />}
                <span className="text-[13px] text-black flex-1" style={{ opacity: task.status === "done" ? 0.3 : 0.8, textDecoration: task.status === "done" ? "line-through" : "none" }}>{task.label}</span>
                {task.status === "working" && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: "#EFF6FF", color: "#0088FF" }}>In progress</span>}
                {task.status === "pending" && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: "#FFF7ED", color: "#C2410C" }}>Pending</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <h3 className="text-[15px] font-semibold text-black">Activity Log</h3>
            <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>Traffic without conversion is failure. Every action tracked.</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {detail.activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="w-2 h-2 rounded-full mt-[6px] shrink-0"
                  style={{ backgroundColor: item.type === "alert" ? "#F59E0B" : "#0088FF", opacity: item.type === "done" ? 0.7 : 1 }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-black leading-relaxed" style={{ opacity: 0.8 }}>{item.text}</p>
                  {item.type === "alert" && (
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFF7ED", color: "#C2410C" }}>Needs attention</span>
                  )}
                </div>
                <span className="text-[11px] shrink-0 mt-0.5 whitespace-nowrap text-black" style={{ opacity: 0.3 }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-6">
          <h3 className="text-[15px] font-semibold text-black mb-1">Ask SEO Agent anything</h3>
          <p className="text-[12px] text-black mb-4" style={{ opacity: 0.4 }}>I am a revenue-focused search strategist — not a blog writer</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {cfg.starters.map((s) => (
            <button key={s.label} onClick={() => onChat(s.label)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left text-[13px] font-medium text-black transition-colors"
              style={{ backgroundColor: "#f5f5f7" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFEFEF")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
            >
              <span className="shrink-0 text-black" style={{ opacity: 0.35 }}><s.icon size={14} /></span>
              <span style={{ opacity: 0.75 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Ads Agent overview ─── */
function AdsAgentOverview({
  cfg,
  detail,
  onChat,
}: {
  cfg: typeof agentConfig["ads"];
  detail: typeof agentDetailData["ads"];
  onChat: (msg: string) => void;
}) {
  const campaigns = [
    { name: "Google Search — Local Intent", platform: "Google Ads", roas: "6.8x", spend: "$1,400", cpa: "$3.80", status: "scaling" },
    { name: "Meta Retargeting — Warm Audience", platform: "Meta Ads", roas: "4.1x", spend: "$900", cpa: "$4.50", status: "stable" },
    { name: "TikTok — New Creative Test", platform: "TikTok Ads", roas: "2.9x", spend: "$540", cpa: "$6.20", status: "testing" },
  ];

  const creativeAngles = [
    { angle: "Same-day service, guaranteed", source: "Reviews agent", hook: "Fast service (82x mentions)", status: "live" },
    { angle: "People who care about your home", source: "Reviews agent", hook: "Friendly team (64x mentions)", status: "testing" },
    { angle: "Quality at honest prices", source: "Reviews agent", hook: "Great value (41x mentions)", status: "queued" },
  ];

  const statusColor = (s: string) => s === "scaling" ? "#22C55E" : s === "stable" ? "#0088FF" : s === "testing" ? "#F59E0B" : "#9CA3AF";
  const statusBg = (s: string) => s === "scaling" ? "#F0FDF4" : s === "stable" ? "#EFF6FF" : s === "testing" ? "#FFFBEB" : "#F9FAFB";

  return (
    <div className="space-y-4">

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {detail.stats.map((s) => (
          <div key={s.label} className="bg-white rounded-3xl p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-black" style={{ opacity: 0.4 }}><s.icon size={13} /></span>
              <p className="text-[11px] font-medium text-black uppercase tracking-wide" style={{ opacity: 0.4 }}>{s.label}</p>
            </div>
            <p className="text-[36px] font-semibold tracking-[-0.04em] leading-none text-black">{s.value}</p>
            <p className="text-[12px] text-black" style={{ opacity: 0.4 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Campaign Performance + Creative Production */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Campaign Leaderboard */}
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <div>
              <h3 className="text-[15px] font-semibold text-black">Campaign Performance</h3>
              <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>Profit over traffic. ROAS over vanity metrics.</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#F3F4F6" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#111827" }} />
              <span className="text-[11px] font-medium text-black" style={{ opacity: 0.6 }}>3 Active</span>
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {campaigns.map((c, i) => (
              <div key={i} className="px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="text-[13px] font-semibold text-black truncate">{c.name}</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0"
                      style={{ backgroundColor: statusBg(c.status), color: statusColor(c.status) }}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-[15px] font-bold shrink-0 ml-2" style={{ color: "#111827" }}>{c.roas}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-black" style={{ opacity: 0.4 }}>Spend: {c.spend}/mo</span>
                  <span className="text-[11px] text-black" style={{ opacity: 0.4 }}>CPA: {c.cpa}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4" style={{ borderTop: "1px solid #f5f5f7" }}>
            <button onClick={() => onChat("Diagnose my campaign performance")}
              className="text-[13px] font-semibold" style={{ color: "#111827" }}>
              Full performance diagnosis →
            </button>
          </div>
        </div>

        {/* Creative Production from Reviews */}
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <h3 className="text-[15px] font-semibold text-black">Creative Production</h3>
            <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>Built from real review language — highest conversion probability</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {creativeAngles.map((c, i) => (
              <div key={i} className="px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-black">&ldquo;{c.angle}&rdquo;</p>
                    <p className="text-[11px] text-black mt-0.5" style={{ opacity: 0.45 }}>Source: {c.hook}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0 mt-0.5"
                    style={{ backgroundColor: statusBg(c.status), color: statusColor(c.status) }}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4" style={{ borderTop: "1px solid #f5f5f7" }}>
            <button onClick={() => onChat("Generate new ad creatives using review language")}
              className="text-[13px] font-semibold" style={{ color: "#111827" }}>
              Generate more creative angles →
            </button>
          </div>
        </div>
      </div>

      {/* Budget Intelligence */}
      <div className="bg-white rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[15px] font-semibold text-black">Budget Intelligence</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F3F4F6", color: "#111827" }}>Growth System</span>
        </div>
        <p className="text-[12px] text-black mb-5" style={{ opacity: 0.4 }}>Scale only what works. Pause losing ads. Duplicate winners.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { platform: "Google Search", budget: "$1,400", pct: 49, action: "Scaling +20%", color: "#22C55E" },
            { platform: "Meta Ads", budget: "$900", pct: 32, action: "Stable — maintain", color: "#0088FF" },
            { platform: "TikTok Ads", budget: "$540", pct: 19, action: "Testing new hooks", color: "#F59E0B" },
          ].map((b) => (
            <div key={b.platform} className="p-4 rounded-2xl" style={{ backgroundColor: "#f5f5f7" }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[13px] font-semibold text-black">{b.platform}</p>
                <p className="text-[13px] font-bold text-black">{b.budget}<span className="text-[11px] font-normal text-black" style={{ opacity: 0.4 }}>/mo</span></p>
              </div>
              <div className="w-full h-1.5 rounded-full mb-2" style={{ backgroundColor: "#e5e7eb" }}>
                <div className="h-1.5 rounded-full" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
              </div>
              <p className="text-[11px] font-medium" style={{ color: b.color }}>{b.action}</p>
            </div>
          ))}
        </div>
        <button onClick={() => onChat("Optimize my budget allocation for max ROAS")}
          className="mt-4 text-[13px] font-medium text-black transition-colors" style={{ opacity: 0.45 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}
        >
          Reoptimize budget allocation →
        </button>
      </div>

      {/* Tasks + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <h3 className="text-[15px] font-semibold text-black">Active Tasks</h3>
            <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>Scale only what works. Kill what doesn&apos;t.</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {detail.tasks.map((task, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {task.status === "done" && <CheckCircle2 size={15} className="shrink-0" style={{ color: "#111827", opacity: 0.4 }} />}
                {task.status === "working" && <div className="w-3.5 h-3.5 rounded-full border-2 shrink-0 animate-spin" style={{ borderColor: "#11182733", borderTopColor: "#111827" }} />}
                {task.status === "pending" && <Circle size={15} className="shrink-0 text-black" style={{ opacity: 0.2 }} />}
                <span className="text-[13px] text-black flex-1" style={{ opacity: task.status === "done" ? 0.3 : 0.8, textDecoration: task.status === "done" ? "line-through" : "none" }}>{task.label}</span>
                {task.status === "working" && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: "#F3F4F6", color: "#111827" }}>In progress</span>}
                {task.status === "pending" && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: "#FFF7ED", color: "#C2410C" }}>Pending</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <h3 className="text-[15px] font-semibold text-black">Activity Log</h3>
            <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>Growth is the only KPI</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {detail.activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="w-2 h-2 rounded-full mt-[6px] shrink-0"
                  style={{ backgroundColor: item.type === "alert" ? "#F59E0B" : "#111827", opacity: item.type === "done" ? 0.6 : 1 }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-black leading-relaxed" style={{ opacity: 0.8 }}>{item.text}</p>
                  {item.type === "alert" && (
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFF7ED", color: "#C2410C" }}>Needs attention</span>
                  )}
                </div>
                <span className="text-[11px] shrink-0 mt-0.5 whitespace-nowrap text-black" style={{ opacity: 0.3 }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-6">
          <h3 className="text-[15px] font-semibold text-black mb-1">Ask Ads Agent anything</h3>
          <p className="text-[12px] text-black mb-4" style={{ opacity: 0.4 }}>I generate profitable customer acquisition at scale</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {cfg.starters.map((s) => (
            <button key={s.label} onClick={() => onChat(s.label)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left text-[13px] font-medium text-black transition-colors"
              style={{ backgroundColor: "#f5f5f7" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFEFEF")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
            >
              <span className="shrink-0 text-black" style={{ opacity: 0.35 }}><s.icon size={14} /></span>
              <span style={{ opacity: 0.75 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


function ReviewsAgentOverview({
  cfg,
  detail,
  onChat,
}: {
  cfg: typeof agentConfig["reviews"];
  detail: typeof agentDetailData["reviews"];
  onChat: (msg: string) => void;
}) {
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestTone, setRequestTone] = useState<"friendly" | "professional" | "luxury">("friendly");

  const recentReviews = [
    { id: 1, author: "Sarah M.", platform: "Google", stars: 5, time: "4 min ago", text: "Incredible service — they were there within the hour and fixed everything. Couldn't be happier!", risk: "LOW", tone: "Happy", responded: true, response: "Thank you so much, Sarah! We're thrilled we could help quickly. Looking forward to being your go-to team!" },
    { id: 2, author: "John D.", platform: "Google", stars: 1, time: "1 hr ago", text: "Waited 3 hours, no call ahead. This is completely unacceptable.", risk: "MEDIUM", tone: "Frustrated", responded: false, response: "" },
    { id: 3, author: "K. Smith", platform: "Yelp", stars: 2, time: "3 hr ago", text: "Service was okay but the price felt higher than expected.", risk: "LOW", tone: "Disappointed", responded: true, response: "Thank you for your feedback, K. We understand price is important — please reach out and we'd love to make this right." },
    { id: 4, author: "Tom R.", platform: "Google", stars: 4, time: "Yesterday", text: "Really good experience overall. Friendly team and clean work.", risk: "LOW", tone: "Impressed", responded: true, response: "Thanks Tom! We appreciate you taking the time to share this. See you next time!" },
    { id: 5, author: "Anonymous", platform: "Google", stars: 1, time: "3 hrs ago", text: "I'm going to report this to the BBB and consult my lawyer if I don't hear back.", risk: "HIGH", tone: "Angry", responded: false, response: "" },
  ];

  const requestMessages = {
    friendly: "Hey [Name], thank you for choosing us! If you have a moment, we'd love your honest feedback — it means the world: {{review_link}} 🙏",
    professional: "Dear [Name], thank you for your recent service with us. We would greatly appreciate your feedback: {{review_link}}",
    luxury: "Dear [Name], it was a privilege to serve you. We would be honoured to hear your thoughts: {{review_link}}",
  };

  const riskColor = (r: string) => r === "HIGH" ? "#EF4444" : r === "MEDIUM" ? "#F59E0B" : "#22C55E";
  const riskBg   = (r: string) => r === "HIGH" ? "#FEF2F2" : r === "MEDIUM" ? "#FFF7ED" : "#F0FDF4";
  const starsRow = (n: number) => Array.from({ length: 5 }).map((_, i) => (
    <span key={i} style={{ color: i < n ? "#F59E0B" : "#E5E7EB", fontSize: 13 }}>★</span>
  ));

  const sentimentData = [
    { label: "Positive", pct: 91, color: "#22C55E" },
    { label: "Neutral",  pct: 6,  color: "#F59E0B" },
    { label: "Negative", pct: 3,  color: "#EF4444" },
  ];

  const themes = [
    { label: "Fast service",    count: 82, positive: true },
    { label: "Friendly staff",  count: 64, positive: true },
    { label: "Great value",     count: 41, positive: true },
    { label: "Wait time",       count: 8,  positive: false },
    { label: "Pricing",         count: 4,  positive: false },
    { label: "Communication",   count: 3,  positive: false },
  ];

    const platforms = [
      { name: "Google",   rating: 4.8, reviews: 214 },
      { name: "Yelp",     rating: 4.6, reviews: 68  },
      { name: "Facebook", rating: 4.9, reviews: 30  },
    ];

  return (
    <div className="space-y-4">

      {/* ── Part 1: Stats Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Star Rating",    value: "4.8★", sub: "↑ from 4.3",        icon: Star },
          { label: "Total Reviews",  value: "312",  sub: "+47 this month",     icon: MessageSquare },
          { label: "Response Rate",  value: "98%",  sub: "Industry avg: 45%",  icon: CheckCheck },
          { label: "Requests Sent",  value: "280",  sub: "16.8% conversion",   icon: Repeat },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-3xl p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <s.icon size={13} className="text-black" style={{ opacity: 0.4 } as React.CSSProperties} />
              <p className="text-[11px] font-medium text-black uppercase tracking-wide" style={{ opacity: 0.4 }}>{s.label}</p>
            </div>
            <p className="text-[36px] font-semibold tracking-[-0.04em] leading-none text-black">{s.value}</p>
            <p className="text-[12px] text-black" style={{ opacity: 0.4 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Part 2 & 3: Incoming Reviews + Sentiment ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Incoming reviews — Part 2 */}
        <div className="lg:col-span-3 bg-white rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <div>
              <h3 className="text-[15px] font-semibold text-black">Incoming Reviews</h3>
              <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>Live feed — I respond automatically within 15 min</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#f5f5f7" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-medium text-black" style={{ opacity: 0.6 }}>Live</span>
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {recentReviews.map((r) => (
              <div
                key={r.id}
                className="px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-start gap-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-semibold text-black">{r.author}</span>
                        <span className="w-4 h-4 flex items-center justify-center shrink-0">
                          <BrandLogo name={r.platform} size={16} />
                        </span>
                        <div className="flex">{starsRow(r.stars)}</div>
                        <span className="text-[11px] text-black" style={{ opacity: 0.35 }}>{r.time}</span>
                    </div>
                    <p className="text-[13px] text-black leading-relaxed mt-0.5" style={{ opacity: 0.7 }}>&ldquo;{r.text}&rdquo;</p>
                    {/* Risk + Tone */}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: riskBg(r.risk), color: riskColor(r.risk) }}>
                        {r.risk} RISK
                      </span>
                      <span className="text-[10px] text-black px-2 py-0.5 rounded-full" style={{ backgroundColor: "#f5f5f7", opacity: 0.7 }}>
                        {r.tone}
                      </span>
                      {r.risk === "HIGH" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FEF2F2", color: "#EF4444" }}>
                          ⚠ ESCALATED
                        </span>
                      )}
                    </div>
                    {/* Response */}
                    {r.responded && r.response && (
                      <div className="mt-2 pl-3 text-[12px] text-black leading-relaxed" style={{ borderLeft: "2px solid #f5f5f7", opacity: 0.55 }}>
                        <span className="font-medium" style={{ opacity: 0.8 }}>My response:</span> {r.response}
                      </div>
                    )}
                    {!r.responded && r.risk !== "HIGH" && (
                      <button
                        onClick={() => setShowDraftModal(true)}
                        className="mt-2 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-colors"
                        style={{ backgroundColor: "#1d1d1f", color: "#fff" }}
                      >
                        Review draft response →
                      </button>
                    )}
                    {!r.responded && r.risk === "HIGH" && (
                      <button
                        onClick={() => onChat("Show me escalations that need my attention")}
                        className="mt-2 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-colors"
                        style={{ backgroundColor: "#EF4444", color: "#fff" }}
                      >
                        Handle escalation →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Sentiment + Platforms */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Part 3: Sentiment Analysis */}
          <div className="bg-white rounded-3xl p-6">
            <h3 className="text-[15px] font-semibold text-black mb-1">Sentiment Analysis</h3>
            <p className="text-[12px] text-black mb-4" style={{ opacity: 0.4 }}>Based on 312 reviews</p>
            {sentimentData.map((s) => (
              <div key={s.label} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-black" style={{ opacity: 0.7 }}>{s.label}</span>
                  <span className="text-[12px] font-semibold text-black">{s.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: "#f5f5f7" }}>
                  <div className="h-2 rounded-full transition-all" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #f5f5f7" }}>
              <p className="text-[11px] font-medium text-black mb-2" style={{ opacity: 0.4 }}>TOP THEMES</p>
              <div className="flex flex-wrap gap-1.5">
                {themes.map((t) => (
                  <span
                    key={t.label}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: t.positive ? "#F0FDF4" : "#FEF2F2",
                      color: t.positive ? "#15803D" : "#DC2626",
                    }}
                  >
                    {t.label} ({t.count}x)
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Platform coverage */}
          <div className="bg-white rounded-3xl p-6">
            <h3 className="text-[15px] font-semibold text-black mb-4">Platform Coverage</h3>
              <div className="space-y-3">
                {platforms.map((p) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <BrandLogo name={p.name} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-black">{p.name}</span>
                        <span className="text-[13px] font-semibold text-black">{p.rating}★</span>
                      </div>
                      <span className="text-[11px] text-black" style={{ opacity: 0.4 }}>{p.reviews} reviews</span>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>

      {/* ── Part 1: Review Request Mode ── */}
      <div className="bg-white rounded-3xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-[15px] font-semibold text-black">Review Request Mode</h3>
            <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>I generate human, brand-aligned messages — never automated-sounding</p>
          </div>
          {requestSent ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#F0FDF4" }}>
              <CheckCircle2 size={12} className="text-green-600" />
              <span className="text-[11px] font-semibold text-green-700">Sent to 8 customers</span>
            </div>
          ) : null}
        </div>
        {/* Tone selector */}
        <div className="flex items-center gap-2 mb-4">
          {(["friendly", "professional", "luxury"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setRequestTone(t)}
              className="px-3 py-1.5 rounded-full text-[12px] font-medium capitalize transition-all"
              style={requestTone === t
                ? { backgroundColor: "#1d1d1f", color: "#fff" }
                : { backgroundColor: "#f5f5f7", color: "#1d1d1f", opacity: 0.55 }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="p-4 rounded-2xl mb-4" style={{ backgroundColor: "#f5f5f7" }}>
          <p className="text-[13px] text-black leading-relaxed" style={{ opacity: 0.8 }}>
            {requestMessages[requestTone]}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F0FDF4", color: "#15803D" }}>
              ✓ Under 280 chars
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize" style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8" }}>
              {requestTone} tone
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setRequestSent(true); setTimeout(() => setRequestSent(false), 4000); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[13px] font-semibold text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#1d1d1f" }}
          >
            <Repeat size={13} /> Send to 8 recent customers
          </button>
          <button
            onClick={() => onChat("Send review requests to recent customers")}
            className="text-[13px] font-medium text-black transition-colors"
            style={{ opacity: 0.45 }}
          >
            Customise in chat →
          </button>
        </div>
      </div>

      {/* ── Part 8: Reputation Optimization + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Tasks */}
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <h3 className="text-[15px] font-semibold text-black">Active Tasks</h3>
            <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>What I&apos;m working on right now</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {detail.tasks.map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {task.status === "done" && <CheckCircle2 size={15} className="shrink-0" style={{ color: "#1d1d1f", opacity: 0.3 }} />}
                {task.status === "working" && <div className="w-3.5 h-3.5 rounded-full border-2 shrink-0 animate-spin" style={{ borderColor: "#1d1d1f33", borderTopColor: "#1d1d1f" }} />}
                {task.status === "pending" && <Circle size={15} className="shrink-0 text-black" style={{ opacity: 0.2 }} />}
                <span className="text-[13px] text-black flex-1" style={{ opacity: task.status === "done" ? 0.3 : 0.8, textDecoration: task.status === "done" ? "line-through" : "none" }}>{task.label}</span>
                {task.status === "working" && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: "#f5f5f7", color: "#1d1d1f" }}>In progress</span>}
                {task.status === "pending" && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: "#FFF7ED", color: "#C2410C" }}>Pending</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <h3 className="text-[15px] font-semibold text-black">Activity Log</h3>
            <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>Everything I&apos;ve done for your reputation</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {detail.activity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-6 py-4 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div
                  className="w-2 h-2 rounded-full mt-[6px] shrink-0"
                  style={{ backgroundColor: item.type === "alert" ? "#F59E0B" : "#1d1d1f", opacity: item.type === "done" ? 0.6 : 1 }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-black leading-relaxed" style={{ opacity: 0.75 }}>{item.text}</p>
                  {item.type === "alert" && (
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFF7ED", color: "#C2410C" }}>
                      Needs attention
                    </span>
                  )}
                </div>
                <span className="text-[11px] shrink-0 mt-0.5 whitespace-nowrap text-black" style={{ opacity: 0.3 }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions (Part 7 performance objective) ── */}
      <div className="bg-white rounded-3xl p-6">
          <h3 className="text-[15px] font-semibold text-black mb-1">Ask Reviews Agent anything</h3>
          <p className="text-[12px] text-black mb-4" style={{ opacity: 0.4 }}>I operate with emotional intelligence and brand awareness</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {cfg.starters.map((s) => (
            <button
              key={s.label}
              onClick={() => onChat(s.label)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left text-[13px] font-medium text-black transition-colors"
              style={{ backgroundColor: "#f5f5f7" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFEFEF")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
            >
              <span className="shrink-0 text-black" style={{ opacity: 0.35 }}><s.icon size={14} /></span>
              <span style={{ opacity: 0.75 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Draft modal */}
      {showDraftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} onClick={() => setShowDraftModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-[480px] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-semibold text-black">Draft Response — 1-star review</h3>
              <button onClick={() => setShowDraftModal(false)} className="text-black" style={{ opacity: 0.35 }}><XIcon size={18} /></button>
            </div>
            <div className="mb-3 p-3 rounded-2xl" style={{ backgroundColor: "#FFF7ED" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold" style={{ color: "#C2410C" }}>MEDIUM RISK</span>
                <span className="text-[11px] text-black" style={{ opacity: 0.5 }}>John D. — ⭐ 1-star</span>
              </div>
              <p className="text-[13px] text-black italic" style={{ opacity: 0.7 }}>&ldquo;Waited 3 hours, no call ahead. This is completely unacceptable.&rdquo;</p>
            </div>
            <p className="text-[11px] font-medium text-black mb-2 uppercase tracking-wide" style={{ opacity: 0.4 }}>My draft response (energy: 3/10 — calm, composed)</p>
            <div className="p-4 rounded-2xl mb-5" style={{ backgroundColor: "#f5f5f7" }}>
              <p className="text-[14px] text-black leading-relaxed" style={{ opacity: 0.8 }}>
                Thank you for letting us know, John. We sincerely apologise that your experience didn&apos;t meet our standards — especially the wait and lack of communication beforehand. This is not the service we strive to provide. Please reach out to us directly so we can make this right for you.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDraftModal(false)}
                className="flex-1 py-3 rounded-2xl text-[14px] font-semibold text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#1d1d1f" }}
              >
                Post this response
              </button>
              <button
                onClick={() => { setShowDraftModal(false); onChat("Draft a response to a negative review"); }}
                className="flex-1 py-3 rounded-2xl text-[14px] font-semibold transition-colors"
                style={{ backgroundColor: "#f5f5f7", color: "#1d1d1f" }}
              >
                Edit in chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AgentDetailView({ agentName, onBack, onGoIntegrations }: {
  agentName: string;
  onBack: () => void;
  onGoIntegrations: (agent: string) => void;
}) {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as "overview" | "chat") || "overview";
  const [tab, setTab] = useState<"overview" | "chat">(initialTab);
  const [chats, setChats] = useState<ChatThread[]>([{ id: 0, title: "New conversation", messages: [] }]);
  const [activeChatId, setActiveChatId] = useState(0);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const cfg = agentConfig[agentName];
  const detail = agentDetailData[agentName];

  useEffect(() => {
    if (chats.length > 0 && activeChatId !== undefined) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, activeChatId, typing]);

  if (!cfg || !detail) return null;

  const isLocked = cfg.requiredIntegrations.some((i) => !i.connected);

  const activeChat = chats.find((c) => c.id === activeChatId)!;
  const messages = activeChat?.messages ?? [];

  function newChat() {
    const id = Date.now();
    setChats((prev) => [{ id, title: "New conversation", messages: [] }, ...prev]);
    setActiveChatId(id);
    setTab("chat");
  }

  function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t || typing) return;
    const userMsg: ChatMessage = { role: "user", text: t };
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, title: c.messages.length === 0 ? t.slice(0, 40) : c.title, messages: [...c.messages, userMsg] }
          : c
      )
    );
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const agentMsg: ChatMessage = { role: "agent", text: cfg.getReply(t) };
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId ? { ...c, messages: [...c.messages, userMsg, agentMsg] } : c
        )
      );
      setTyping(false);
    }, 1200);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  /* ── Locked gate ── */
    if (isLocked) {
      return (
        <div className="flex-1 overflow-auto p-5 md:p-8" style={{ backgroundColor: "#f5f5f7" }}>
          {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-medium mb-6 transition-colors"
          style={{ color: "rgba(0,0,0,0.4)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1d1d1f")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.4)")}
        >
          <ChevronLeft size={15} /> Dashboard
        </button>
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-3xl p-10 max-w-[440px] w-full text-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-5">
                <AgentAvatar agentKey={agentName} size={64} rounded="rounded-2xl" />
              </div>
              <h2 className="text-[20px] font-semibold text-black tracking-tight mb-2">Connect integrations to activate {agentDisplayNames[agentName] ?? agentName}</h2>
            <p className="text-[14px] leading-relaxed mb-6" style={{ color: "rgba(0,0,0,0.45)" }}>
              {agentDisplayNames[agentName] ?? agentName} needs {cfg.requiredIntegrations.map((i) => i.name).join(" & ")} before it can start working for you.
            </p>
            <button
              onClick={() => onGoIntegrations(agentName)}
              className="w-full py-3 rounded-2xl text-white text-[14px] font-semibold transition-opacity hover:opacity-85"
              style={{ backgroundColor: cfg.color }}
            >
              Connect Integrations →
            </button>
            <button onClick={onBack} className="block mx-auto mt-4 text-[13px] transition-colors" style={{ color: "rgba(0,0,0,0.35)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.35)")}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

    return (
      <div className={`flex-1 ${tab === 'chat' ? 'overflow-hidden flex flex-col p-0' : 'overflow-auto p-5 md:p-8 space-y-6'}`} style={{ backgroundColor: "#f5f5f7" }}>
        {/* ── Page header ── */}
      <div className={`flex items-start justify-between gap-4 ${tab === 'chat' ? 'hidden' : 'flex'}`}>
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[13px] font-medium mb-3 transition-colors"
            style={{ color: "rgba(0,0,0,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1d1d1f")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.4)")}
          >
            <ChevronLeft size={15} /> Dashboard
          </button>
            <div className="flex items-center gap-3">
              {agentAvatars[agentName] ? (
                <div className="w-11 h-11 rounded-2xl overflow-hidden shrink-0">
                  <img src={agentAvatars[agentName]} alt={agentDisplayNames[agentName] ?? agentName} width={44} height={44} style={{ width: 44, height: 44, objectFit: "cover", display: "block" }} />
                </div>
              ) : (
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-[18px] font-semibold shrink-0"
                  style={{ backgroundColor: cfg.color }}
                >
                  {cfg.initial}
                </div>
              )}
              <div>
                <h1 className="text-[20px] font-semibold text-black leading-tight">{agentDisplayNames[agentName] ?? agentName}</h1>
                <p className="text-[12px] text-black leading-tight mt-0.5" style={{ opacity: 0.4 }}>{cfg.role}</p>
              </div>
            </div>
        </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full ml-2" style={{ backgroundColor: cfg.light }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
            <span className="text-[12px] font-medium" style={{ color: cfg.color }}>Active</span>
          </div>
        </div>

      {/* ── Tabs ── */}
      <div className={`flex items-center gap-1 ${tab === 'chat' ? 'hidden' : 'flex'}`}>
        {(["overview", "chat"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors capitalize"
            style={tab === t
              ? { backgroundColor: "#1d1d1f", color: "#ffffff" }
              : { backgroundColor: "#ffffff", color: "#1d1d1f", opacity: 0.5 }}
          >
            {t === "overview" ? "Overview" : "Chat"}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {tab === "overview" && agentName === "seo" ? (
        <SEOAgentOverview cfg={cfg} detail={detail} onChat={(msg) => { setTab("chat"); setTimeout(() => send(msg), 50); }} />
      ) : tab === "overview" && agentName === "ads" ? (
        <AdsAgentOverview cfg={cfg as typeof agentConfig["ads"]} detail={detail} onChat={(msg) => { setTab("chat"); setTimeout(() => send(msg), 50); }} />
      ) : tab === "overview" && agentName === "reviews" ? (
        <ReviewsAgentOverview cfg={cfg} detail={detail} onChat={(msg) => { setTab("chat"); setTimeout(() => send(msg), 50); }} />
      ) : tab === "overview" && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {detail.stats.map((s) => (
              <div key={s.label} className="bg-white rounded-3xl p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-black" style={{ opacity: 0.4 }}><s.icon size={14} /></span>
                    <p className="text-[12px] font-medium text-black" style={{ opacity: 0.5 }}>{s.label}</p>
                  </div>
                <p className="text-[38px] font-semibold tracking-[-0.04em] leading-none text-black">{s.value}</p>
                <p className="text-[12px] text-black" style={{ opacity: 0.4 }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Tasks + Activity two-col */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Tasks */}
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
                <h3 className="text-[15px] font-semibold text-black">Tasks</h3>
                <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>What {agentName} is working on</p>
              </div>
              <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
                {detail.tasks.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-6 py-4 transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {task.status === "done" && (
                      <CheckCircle2 size={16} className="shrink-0" style={{ color: cfg.color, opacity: 0.7 }} />
                    )}
                    {task.status === "working" && (
                      <div className="w-4 h-4 rounded-full border-2 shrink-0 animate-spin" style={{ borderColor: `${cfg.color}40`, borderTopColor: cfg.color }} />
                    )}
                    {task.status === "pending" && (
                      <Circle size={16} className="shrink-0 text-black" style={{ opacity: 0.25 }} />
                    )}
                    <span
                      className="text-[13px] text-black flex-1"
                      style={{ opacity: task.status === "done" ? 0.35 : 0.8, textDecoration: task.status === "done" ? "line-through" : "none" }}
                    >
                      {task.label}
                    </span>
                    {task.status === "working" && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: cfg.light, color: cfg.color }}>
                        In progress
                      </span>
                    )}
                    {task.status === "pending" && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: "#FFF7ED", color: "#C2410C" }}>
                        Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
                <h3 className="text-[15px] font-semibold text-black">Activity</h3>
                <p className="text-[12px] text-black mt-0.5" style={{ opacity: 0.4 }}>What {agentName} has been doing</p>
              </div>
              <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
                {detail.activity.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-6 py-4 transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-[6px] shrink-0"
                      style={{
                        backgroundColor: item.type === "alert" ? "#F59E0B" : item.type === "working" ? cfg.color : cfg.color,
                        opacity: item.type === "working" ? 0.5 : 1,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-black leading-relaxed" style={{ opacity: 0.8 }}>{item.text}</p>
                      {item.type === "alert" && (
                        <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFF7ED", color: "#C2410C" }}>
                          Needs attention
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] shrink-0 mt-0.5 whitespace-nowrap text-black" style={{ opacity: 0.35 }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-3xl p-6">
            <h3 className="text-[15px] font-semibold text-black mb-4">Ask {agentName} something</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {cfg.starters.map((s) => (
                <button
                  key={s.label}
                  onClick={() => { setTab("chat"); setTimeout(() => send(s.label), 50); }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left text-[13px] font-medium text-black transition-colors"
                  style={{ backgroundColor: "#f5f5f7" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFEFEF")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
                >
                    <span className="shrink-0 text-black" style={{ opacity: 0.35 }}><s.icon size={14} /></span>
                  <span style={{ opacity: 0.75 }}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── CHAT TAB ── */}
      {tab === "chat" && (
        <div className="fixed inset-0 z-50 md:static md:z-0 bg-white overflow-hidden flex flex-col h-full flex-1">
            {/* New Mobile-First Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: "1px solid #f5f5f7" }}>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setTab("overview")} 
                  className="p-1 -ml-1 text-black/60 hover:text-black transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>
                  <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                     <AgentAvatar agentKey={agentName} size={32} />
                  </div>
                  <span className="text-[16px] font-semibold text-black tracking-tight">
                    {agentName === 'seo' ? 'SEO' : agentName === 'ads' ? 'Ads' : 'Reviews'}
                  </span>
                </div>
              <div className="flex items-center gap-4">
                <button className="text-black/60 hover:text-black transition-colors">
                  <RefreshCw size={22} />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto bg-white">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full px-6 pt-12">
                    {/* Centered agent avatar (stacked look) */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white transform -rotate-6 absolute -left-2 top-0 opacity-40">
                        <AgentAvatar agentKey={agentName} size={64} />
                      </div>
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl border-2 border-white relative z-10">
                        <AgentAvatar agentKey={agentName} size={64} />
                      </div>
                    </div>

                    <div className="text-center max-w-[280px]">
                      <h3 className="text-[17px] font-semibold text-black tracking-tight mb-2">
                        {cfg.emptyState.headline}
                      </h3>
                      <p className="text-[13px] text-black/40 leading-relaxed px-4">
                        {cfg.emptyState.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 py-6 space-y-8">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                          <div className={`max-w-[85%] rounded-[20px] px-4 py-3 text-[15px] ${m.role === "user" ? "bg-[#f5f5f7] text-black" : "text-black"}`}>
                             {m.text.split('\n').map((line, idx) => (
                               <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>
                             ))}
                          </div>
                      </div>
                    ))}
                    {typing && (
                        <div className="flex flex-col items-start">
                          <div className="max-w-[85%] rounded-[20px] px-4 py-3 bg-transparent text-black">
                            <div className="flex items-center gap-1">
                              {[0, 150, 300].map((d) => (
                                <span key={d} className="w-1.5 h-1.5 rounded-full bg-black/20 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                              ))}
                            </div>
                          </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Bottom Input Area */}
              <div className="px-4 pb-8 pt-4 bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <button 
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-black/40 hover:text-black transition-colors bg-[#f5f5f7]"
                  >
                    <Plus size={22} strokeWidth={2.5} />
                  </button>
                  <div className="flex-1 flex items-center bg-[#f5f5f7] rounded-full pl-5 pr-1.5 py-1.5 min-h-[46px]">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Ask anything"
                      rows={1}
                      className="flex-1 text-[16px] text-black bg-transparent outline-none resize-none leading-tight py-1.5 placeholder:text-black/40"
                      style={{ caretColor: "#000" }}
                    />
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-black/40 hover:text-black transition-colors">
                      <Mic size={20} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => send()}
                      disabled={typing}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      {input.trim() && !typing ? (
                        <ArrowUp size={18} strokeWidth={3} />
                      ) : (
                        <AudioLines size={18} strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

/* ─── Settings View ─── */
const INDUSTRIES = [
  "Plumbing", "HVAC", "Electrical", "Landscaping", "Roofing",
  "General Contracting", "Cleaning Services", "Auto Repair",
  "Dental / Medical", "Legal Services", "Real Estate", "Restaurant / Food",
  "Retail", "Fitness / Gym", "Beauty / Salon", "Other",
];

const TONES = [
  { value: "professional", label: "Professional", desc: "Formal and authoritative" },
  { value: "friendly",     label: "Friendly",     desc: "Warm and approachable" },
  { value: "casual",       label: "Casual",       desc: "Relaxed and conversational" },
  { value: "bold",         label: "Bold",         desc: "Direct and confident" },
  { value: "empathetic",   label: "Empathetic",   desc: "Caring and understanding" },
];

function SettingsView({
  profile,
  subscription,
  onProfileSaved,
}: {
  profile: Profile | null;
  subscription: Subscription | null;
  onProfileSaved: (updated: Profile) => void;
}) {
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Business profile form state
  const [form, setForm] = useState({
    full_name:        profile?.full_name        ?? "",
    business_name:    profile?.business_name    ?? "",
    business_address: profile?.business_address ?? "",
    industry:         profile?.industry         ?? "",
    tone_of_voice:    profile?.tone_of_voice    ?? "professional",
    phone:            profile?.phone            ?? "",
    description:      profile?.description      ?? "",
    website_url:      profile?.website_url      ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Keep form in sync when profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        full_name:        profile.full_name        ?? "",
        business_name:    profile.business_name    ?? "",
        business_address: profile.business_address ?? "",
        industry:         profile.industry         ?? "",
        tone_of_voice:    profile.tone_of_voice    ?? "professional",
        phone:            profile.phone            ?? "",
        description:      profile.description      ?? "",
        website_url:      profile.website_url      ?? "",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      onProfileSaved({ ...profile!, ...form });
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaveError("Could not save. Please try again.");
    }
    setSaving(false);
  };

  const handleUpgrade = async (plan: string) => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Failed to start checkout");
    }
    setCheckoutLoading(false);
  };

  const field = (label: string, key: keyof typeof form, placeholder: string, type = "text") => (
    <div>
      <label className="block text-[12px] font-medium text-black mb-1.5" style={{ opacity: 0.5 }}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-2xl text-[14px] text-black bg-white outline-none transition-all"
        style={{ border: "1.5px solid #EFEFEF" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#1d1d1f")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#EFEFEF")}
      />
    </div>
  );

  return (
    <div className="flex-1 p-5 md:p-8 space-y-6" style={{ backgroundColor: "#f5f5f7" }}>
      {/* Header */}
      <div>
        <h2 className="text-[22px] font-semibold text-black tracking-[-0.02em]">Settings</h2>
        <p className="text-[14px] text-black mt-0.5" style={{ opacity: 0.4 }}>Manage your business profile and subscription.</p>
      </div>

      {/* ── Business Profile Card ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#f5f5f7" }}>
            <Building2 size={18} className="text-black" style={{ opacity: 0.6 } as React.CSSProperties} />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-black">Business Profile</h3>
            <p className="text-[12px] text-black" style={{ opacity: 0.4 }}>Your agents use this to personalize everything they do</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field("Your Name", "full_name", "Jane Smith")}
            {field("Business Name", "business_name", "Smith Plumbing & Heating")}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field("Website", "website_url", "https://smithplumbing.com", "url")}
            {field("Phone", "phone", "+1 (555) 000-0000", "tel")}
          </div>

          {/* Row 3 */}
          {field("Business Address", "business_address", "123 Main St, Chicago, IL 60601")}

          {/* Industry */}
          <div>
            <label className="block text-[12px] font-medium text-black mb-1.5" style={{ opacity: 0.5 }}>Industry</label>
            <div className="relative">
              <select
                value={form.industry}
                onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl text-[14px] text-black bg-white outline-none appearance-none cursor-pointer transition-all"
                style={{ border: "1.5px solid #EFEFEF" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1d1d1f")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#EFEFEF")}
              >
                <option value="">Select your industry…</option>
                {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black" style={{ opacity: 0.4 }} />
            </div>
          </div>

          {/* Business Description */}
          <div>
            <label className="block text-[12px] font-medium text-black mb-1.5" style={{ opacity: 0.5 }}>Business Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Briefly describe what your business does and who your ideal customers are…"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl text-[14px] text-black bg-white outline-none resize-none transition-all"
              style={{ border: "1.5px solid #EFEFEF" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#1d1d1f")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#EFEFEF")}
            />
          </div>

          {/* Tone of Voice */}
          <div>
            <label className="block text-[12px] font-medium text-black mb-2" style={{ opacity: 0.5 }}>Tone of Voice</label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setForm((f) => ({ ...f, tone_of_voice: t.value }))}
                  className="flex flex-col items-start px-4 py-2.5 rounded-2xl text-left transition-all"
                  style={form.tone_of_voice === t.value
                    ? { backgroundColor: "#1d1d1f", color: "#ffffff", border: "1.5px solid #1d1d1f" }
                    : { backgroundColor: "#ffffff", color: "#1d1d1f", border: "1.5px solid #EFEFEF", opacity: 0.65 }}
                >
                  <span className="text-[13px] font-semibold">{t.label}</span>
                  <span className="text-[11px] mt-0.5" style={{ opacity: form.tone_of_voice === t.value ? 0.6 : 0.5 }}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save button + feedback */}
        <div className="flex items-center gap-3 mt-6 pt-6" style={{ borderTop: "1px solid #f5f5f7" }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[14px] font-semibold text-white transition-opacity disabled:opacity-60"
            style={{ backgroundColor: "#1d1d1f" }}
            onMouseEnter={(e) => !saving && (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {saving ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {saved && (
            <div className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: "#0088FF" }}>
              <CheckCircle2 size={15} />
              Saved
            </div>
          )}
          {saveError && (
            <div className="flex items-center gap-1.5 text-[13px]" style={{ color: "#DC2626" }}>
              <AlertTriangle size={15} />
              {saveError}
            </div>
          )}
        </div>
      </div>

      {/* ── Account Card ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#f5f5f7" }}>
            <User size={18} className="text-black" style={{ opacity: 0.6 } as React.CSSProperties} />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-black">Account</h3>
            <p className="text-[12px] text-black" style={{ opacity: 0.4 }}>Your login and profile details</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-[11px] text-black uppercase tracking-wider font-medium mb-1" style={{ opacity: 0.4 }}>Email</p>
            <p className="text-[14px] font-medium text-black truncate">{profile?.email ?? "—"}</p>
          </div>
          <div>
            <p className="text-[11px] text-black uppercase tracking-wider font-medium mb-1" style={{ opacity: 0.4 }}>Member Since</p>
            <p className="text-[14px] font-medium text-black">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-black uppercase tracking-wider font-medium mb-1" style={{ opacity: 0.4 }}>Status</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <p className="text-[14px] font-medium text-black">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Approval Workflow ─── */
interface ApprovalTask {
  id: string;
  title: string;
  agent: string;
  agentColor: string;
  agentLight: string;
  previewTitle: string;
  preview: React.ReactNode;
}

const approvalTasks: ApprovalTask[] = [
  {
    id: "landing-page",
    title: "Review new landing page design",
      agent: "seo",
    agentColor: "#0088FF",
    agentLight: "#f5f5f7",
    previewTitle: "New Landing Page — /services/emergency-plumber",
    preview: (
      <div className="space-y-4 text-[14px] text-black">
        <div className="p-4 rounded-2xl space-y-2" style={{ backgroundColor: "#f5f5f7" }}>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-black" style={{ opacity: 0.4 }}>Hero</p>
          <p className="text-[18px] font-semibold">Emergency Plumber in Chicago — Available 24/7</p>
          <p style={{ opacity: 0.6 }}>Fast, reliable emergency plumbing with same-day service. Licensed & insured. Call now for a free quote.</p>
          <div className="inline-block px-4 py-2 rounded-xl text-white text-[13px] font-semibold" style={{ backgroundColor: "#0088FF" }}>Get a Free Quote →</div>
        </div>
        <div className="p-4 rounded-2xl" style={{ backgroundColor: "#f5f5f7" }}>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-black mb-2" style={{ opacity: 0.4 }}>SEO Details</p>
          <div className="space-y-1 text-[13px]">
            <p><span style={{ opacity: 0.5 }}>Target keyword:</span> <span className="font-medium">emergency plumber Chicago</span></p>
            <p><span style={{ opacity: 0.5 }}>Monthly searches:</span> <span className="font-medium">3,600</span></p>
            <p><span style={{ opacity: 0.5 }}>Estimated ranking:</span> <span className="font-medium">Top 5 within 60 days</span></p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "blog-batch",
    title: "Approve blog content batch #4",
      agent: "seo",
    agentColor: "#0088FF",
    agentLight: "#f5f5f7",
    previewTitle: "Blog Batch #4 — 3 Posts Ready to Publish",
    preview: (
      <div className="space-y-3 text-[14px]">
        {[
          { title: "How to Tell If You Have a Slab Leak (And What to Do)", keyword: "slab leak symptoms", reads: "2,400/mo" },
          { title: "5 Reasons Your Water Heater Is Making Noise", keyword: "water heater noise", reads: "1,900/mo" },
          { title: "What Causes Low Water Pressure and How to Fix It", keyword: "low water pressure fix", reads: "4,100/mo" },
        ].map((post, i) => (
          <div key={i} className="p-4 rounded-2xl" style={{ backgroundColor: "#f5f5f7" }}>
            <p className="font-semibold text-black">{post.title}</p>
            <div className="flex items-center gap-4 mt-1.5 text-[12px]" style={{ color: "rgba(0,0,0,0.45)" }}>
              <span>Keyword: {post.keyword}</span>
              <span>·</span>
              <span>{post.reads} searches</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "black-friday",
    title: "Review Black Friday campaign",
      agent: "ads",
    agentColor: "#0088FF",
    agentLight: "#f5f5f7",
    previewTitle: "Black Friday Retargeting Campaign — Google + Meta",
    preview: (
      <div className="space-y-4 text-[14px]">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Budget", value: "$1,200" },
            { label: "Duration", value: "Nov 25–Dec 2" },
            { label: "Audience", value: "Past site visitors" },
            { label: "Target ROAS", value: "5x+" },
          ].map((s) => (
            <div key={s.label} className="p-3 rounded-2xl" style={{ backgroundColor: "#f5f5f7" }}>
              <p className="text-[11px] font-medium text-black mb-1" style={{ opacity: 0.4 }}>{s.label}</p>
              <p className="text-[16px] font-semibold text-black">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-2xl" style={{ backgroundColor: "#f5f5f7" }}>
          <p className="text-[11px] font-semibold uppercase tracking-wider mb-2 text-black" style={{ opacity: 0.4 }}>Ad Copy</p>
          <p className="font-semibold">&quot;Black Friday Special — 20% Off All Services This Weekend Only&quot;</p>
          <p className="mt-1 text-[13px]" style={{ opacity: 0.6 }}>Book before Sunday and save $80–$200 on your next service call. Limited spots available.</p>
        </div>
      </div>
    ),
  },
  {
    id: "search-terms",
    title: "Approve Google Search terms",
      agent: "seo",
    agentColor: "#0088FF",
    agentLight: "#f5f5f7",
    previewTitle: "New Google Search Terms — 12 Keywords to Add",
    preview: (
      <div className="space-y-2 text-[13px]">
        {[
          { kw: "plumber near me open now",          vol: "9,900", intent: "High" },
          { kw: "emergency pipe burst repair",        vol: "2,400", intent: "High" },
          { kw: "drain cleaning service chicago",     vol: "1,600", intent: "High" },
          { kw: "water heater installation cost",     vol: "3,200", intent: "Medium" },
          { kw: "sewer line replacement chicago",     vol: "880",   intent: "High" },
          { kw: "licensed plumber chicago reviews",   vol: "590",   intent: "High" },
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ backgroundColor: "#f5f5f7" }}>
            <span className="font-medium text-black">{row.kw}</span>
            <div className="flex items-center gap-3 shrink-0">
              <span style={{ opacity: 0.45 }}>{row.vol}/mo</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: row.intent === "High" ? "#DCFCE7" : "#FEF3C7", color: row.intent === "High" ? "#15803D" : "#92400E" }}>
                {row.intent}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "homepage-hero",
    title: "Check new homepage hero",
      agent: "seo",
    agentColor: "#0088FF",
    agentLight: "#f5f5f7",
    previewTitle: "Homepage Hero — 3 Variants to Choose From",
    preview: (
      <div className="space-y-3 text-[14px]">
        {[
          { label: "Variant A", headline: "Chicago's Most Trusted Plumber — Since 2008", sub: "500+ five-star reviews. Same-day service guaranteed.", cta: "Book a Free Call" },
          { label: "Variant B (Recommended)", headline: "Stop the Leak. Call Chicago's #1 Rated Plumber.", sub: "We fix it right the first time — or it's free.", cta: "Get a Free Quote" },
          { label: "Variant C", headline: "Fast, Honest Plumbing. No Surprise Fees.", sub: "Licensed & insured. Available 24/7 for emergencies.", cta: "Call Now" },
        ].map((v, i) => (
          <div key={i} className="p-4 rounded-2xl" style={{ backgroundColor: i === 1 ? "#f5f5f7" : "#f5f5f7" }}>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: i === 1 ? "#0088FF" : "rgba(0,0,0,0.4)" }}>{v.label}</p>
            <p className="font-semibold text-black">{v.headline}</p>
            <p className="text-[13px] mt-1" style={{ opacity: 0.6 }}>{v.sub}</p>
            <p className="text-[12px] mt-1.5 font-medium" style={{ color: "#0088FF" }}>CTA: {v.cta}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "pricing-page",
    title: "Review pricing page redesign",
      agent: "seo",
    agentColor: "#0088FF",
    agentLight: "#f5f5f7",
    previewTitle: "Pricing Page Redesign — Updated Layout",
    preview: (
      <div className="space-y-4 text-[14px]">
        <div className="p-4 rounded-2xl" style={{ backgroundColor: "#f5f5f7" }}>
          <p className="text-[11px] font-semibold uppercase tracking-wider mb-2 text-black" style={{ opacity: 0.4 }}>Key Changes</p>
          <ul className="space-y-2 text-[13px]" style={{ opacity: 0.8 }}>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600 shrink-0" /> Added 3-tier pricing table with feature comparison</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600 shrink-0" /> FAQ section targeting &quot;how much does a plumber cost&quot;</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600 shrink-0" /> Trust badges: licensed, insured, 500+ reviews</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600 shrink-0" /> Schema markup for service pricing</li>
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { tier: "Basic", price: "$79", label: "Standard visit" },
            { tier: "Standard", price: "$149", label: "Complex repairs" },
            { tier: "Emergency", price: "$249", label: "24/7 urgent" },
          ].map((t) => (
            <div key={t.tier} className="p-3 rounded-2xl text-center" style={{ backgroundColor: "#f5f5f7" }}>
              <p className="text-[11px] font-medium text-black mb-1" style={{ opacity: 0.45 }}>{t.tier}</p>
              <p className="text-[18px] font-semibold text-black">{t.price}</p>
              <p className="text-[11px] mt-0.5" style={{ opacity: 0.4 }}>{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function ApprovalModal({
  task,
  onApprove,
  onReject,
  onClose,
}: {
  task: ApprovalTask;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onClose: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState("");
  const [action, setAction] = useState<"approved" | "rejected" | null>(null);

  if (action) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
        <div className="bg-white rounded-3xl p-8 max-w-[400px] w-full text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: action === "approved" ? "#f5f5f7" : "#FFF5F5" }}
          >
            {action === "approved"
              ? <CheckCircle2 size={24} style={{ color: "#0088FF" }} />
              : <XIcon size={24} style={{ color: "#DC2626" }} />}
          </div>
          <h3 className="text-[18px] font-semibold text-black mb-1">
            {action === "approved" ? "Approved!" : "Rejected"}
          </h3>
          <p className="text-[14px] mb-5" style={{ color: "rgba(0,0,0,0.45)" }}>
            {action === "approved"
              ? `${task.agent} will proceed immediately.`
              : `${task.agent} has been notified and will revise.`}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl text-[14px] font-semibold text-black transition-colors"
            style={{ backgroundColor: "#f5f5f7" }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
      <div className="bg-white rounded-3xl w-full max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 shrink-0" style={{ borderBottom: "1px solid #f5f5f7" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[12px] font-semibold shrink-0" style={{ backgroundColor: task.agentColor }}>
              {task.agent[0]}
            </div>
            <div>
              <p className="text-[15px] font-semibold text-black">{task.previewTitle}</p>
              <p className="text-[12px] text-black" style={{ opacity: 0.4 }}>Submitted by {task.agent} · Awaiting your review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
            style={{ backgroundColor: "#f5f5f7" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EBEBEB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
          >
            <XIcon size={14} className="text-black" style={{ opacity: 0.5 } as React.CSSProperties} />
          </button>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {task.preview}

          {/* Edit note */}
          {editing && (
            <div className="mt-4">
              <label className="block text-[12px] font-medium text-black mb-1.5" style={{ opacity: 0.5 }}>Add a note for {task.agent}</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Change the headline to mention our 24/7 service…"
                rows={3}
                className="w-full px-4 py-3 rounded-2xl text-[14px] text-black outline-none resize-none transition-all"
                style={{ border: "1.5px solid #EFEFEF", backgroundColor: "#FAFAFA" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1d1d1f")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#EFEFEF")}
              />
            </div>
          )}
        </div>

        {/* Action bar */}
        <div className="px-6 py-5 flex items-center gap-3 shrink-0" style={{ borderTop: "1px solid #f5f5f7" }}>
          <button
            onClick={() => { onApprove(task.id); setAction("approved"); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[14px] font-semibold text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: task.agentColor }}
          >
            <CheckCircle2 size={15} /> Approve
          </button>
          <button
            onClick={() => setEditing((v) => !v)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[14px] font-semibold text-black transition-colors"
            style={{ backgroundColor: "#f5f5f7" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EBEBEB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
          >
            Edit &amp; Approve
          </button>
          <button
            onClick={() => { onReject(task.id); setAction("rejected"); }}
            className="ml-auto flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-[14px] font-medium transition-colors"
            style={{ color: "#DC2626", backgroundColor: "#FFF5F5" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFF5F5")}
          >
            <XIcon size={13} /> Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Tasks View (with approval workflow) ─── */
function TasksView() {
  const [filter, setFilter] = useState<"all" | "pending" | "progress" | "completed">("all");
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());
  const [openTask, setOpenTask] = useState<ApprovalTask | null>(null);

  const handleApprove = (id: string) => setApprovedIds((prev) => new Set([...prev, id]));
  const handleReject  = (id: string) => setRejectedIds((prev) => new Set([...prev, id]));

  const pendingTasks = allTasks.pending.filter((t) => {
    const at = approvalTasks.find((a) => a.title === t);
    return at ? !approvedIds.has(at.id) && !rejectedIds.has(at.id) : true;
  });
  const pendingCount = pendingTasks.length;

  const sections = [
    {
      id: "pending" as const,
      label: "Pending Review",
      count: pendingCount,
      tasks: pendingTasks,
      icon: (
        <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-black" />
        </div>
      ),
      trailing: <ArrowRight size={16} className="text-black shrink-0 ml-3" style={{ opacity: 0.3 } as React.CSSProperties} />,
      textClass: "text-[13px] md:text-[14px] text-black",
      clickable: true,
    },
    {
      id: "progress" as const,
      label: "In Progress",
      count: allTasks.inProgress.length,
      tasks: allTasks.inProgress,
        icon: <div className="w-[18px] h-[18px] rounded-full border-2 shrink-0 animate-spin" style={{ borderColor: "rgba(0,0,0,0.15)", borderTopColor: "rgba(0,0,0,0.6)" }} />,
      trailing: <MoreHorizontal size={16} className="text-black shrink-0 ml-3" style={{ opacity: 0.3 } as React.CSSProperties} />,
      textClass: "text-[13px] md:text-[14px] text-black",
      clickable: false,
    },
    {
      id: "completed" as const,
      label: "Completed",
      count: allTasks.completed.length + approvedIds.size,
      tasks: [...allTasks.completed, ...allTasks.pending.filter((t) => {
        const at = approvalTasks.find((a) => a.title === t);
        return at && approvedIds.has(at.id);
      })],
      icon: <CheckCircle2 size={18} className="text-black shrink-0" style={{ opacity: 0.4 } as React.CSSProperties} />,
      trailing: <MoreHorizontal size={16} className="text-black shrink-0 ml-3" style={{ opacity: 0.3 } as React.CSSProperties} />,
      textClass: "text-[13px] md:text-[14px] text-black line-through",
      textStyle: { opacity: 0.35 } as React.CSSProperties,
      clickable: false,
    },
  ];

  const visible = sections.filter((s) => filter === "all" || filter === s.id);

  return (
    <div className="flex-1 p-5 md:p-8 space-y-6" style={{ backgroundColor: "#f5f5f7" }}>
      {/* Modal */}
      {openTask && (
        <ApprovalModal
          task={openTask}
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={() => setOpenTask(null)}
        />
      )}

      {/* Header */}
      <div>
        <h2 className="text-[22px] font-semibold text-black tracking-[-0.02em]">Tasks</h2>
        <p className="text-[14px] text-black mt-0.5" style={{ opacity: 0.4 }}>Everything your agents are working on — and what needs your approval.</p>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "pending", "progress", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="text-[13px] font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
            style={filter === f ? { backgroundColor: "#1d1d1f", color: "#ffffff" } : { backgroundColor: "#ffffff", color: "#1d1d1f", opacity: 0.55 }}
          >
            {f === "all" ? "All Tasks" : f === "progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "pending" && pendingCount > 0 && (
                <span
                  className="text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: filter === "pending" ? "#ffffff" : "#EF4444", color: filter === "pending" ? "#EF4444" : "#ffffff", opacity: 1 }}
                >
                  {pendingCount}
                </span>
              )}

          </button>
        ))}
      </div>

      {/* Sections */}
      {visible.map((section) => (
        <div key={section.id} className="bg-white rounded-3xl overflow-hidden">
          {/* Section header */}
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <h3 className="text-[15px] font-semibold text-black">{section.label}</h3>
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#f5f5f7", color: "#1d1d1f", opacity: 0.55 }}
            >
              {section.count}
            </span>
          </div>
          {/* Task rows */}
          <div className="divide-y" style={{ borderColor: "#f5f5f7" }}>
            {section.tasks.map((task, i) => {
              const approvalTask = section.clickable ? approvalTasks.find((a) => a.title === task) : null;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between px-6 py-4 transition-colors ${section.clickable && approvalTask ? "cursor-pointer" : ""}`}
                  onClick={() => section.clickable && approvalTask && setOpenTask(approvalTask)}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {section.icon}
                    <span className={section.textClass} style={"textStyle" in section ? section.textStyle : undefined}>{task}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {section.clickable && approvalTask && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FFF7ED", color: "#C2410C" }}>
                        Review
                      </span>
                    )}
                    {section.trailing}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [focusAgent, setFocusAgent] = useState<string | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [readNotifs, setReadNotifs] = useState<Set<string>>(new Set());
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pending approval notifications (used for Tasks nav badge)
  const notifications = approvalTasks.map((t) => ({
    id: t.id,
    title: t.title,
    agent: t.agent,
    agentColor: t.agentColor,
    agentLight: t.agentLight,
  }));
  const unreadCount = notifications.filter((n) => !readNotifs.has(n.id)).length;

  useEffect(() => {
    async function loadData() {
      try {
        // Load subscription + base profile
        const subRes = await fetch("/api/subscribe");
        if (subRes.ok) {
          const data = await subRes.json();
          setSubscription(data.subscription);
        }
        // Load full business profile
        const profRes = await fetch("/api/profile");
        if (profRes.ok) {
          const data = await profRes.json();
          setProfile(data.profile);
        }
      } catch {
        // silently fail
      }
      setLoading(false);
    }
    loadData();

    const checkoutSuccess = searchParams.get("checkout");
    const agents = searchParams.get("agents");
    if (checkoutSuccess === "success" && agents) {
      fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agents }),
      }).then(() => {
        window.history.replaceState({}, "", "/app");
        loadData();
      });
    }
  }, [searchParams]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  useEffect(() => {
    const agent = searchParams.get("agent");
    if (agent && ["seo", "ads", "reviews"].includes(agent)) {
      setActiveAgent(agent);
    } else {
      setActiveAgent(null);
    }
  }, [searchParams]);

  const handleOpenChat = (agent: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("agent", agent);
    router.push(`/app?${params.toString()}`);
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("agent");
    router.push(`/app?${params.toString()}`);
  };

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("agent");
    router.push(`/app?${params.toString()}`);
    setSidebarOpen(false);
  };

  const handleProfileSaved = (updated: Profile) => {
    setProfile(updated);
  };

  const handleConnect = (agent: string) => {
    setFocusAgent(agent);
    setActiveAgent(null);
    setActiveNav("integrations");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("agent");
    router.push(`/app?${params.toString()}`);
  };

    if (loading) {
      return (
        <div className="flex h-screen items-center justify-center bg-white">
          <div className="text-black" style={{ opacity: 0.4 }}>Loading...</div>
        </div>
      );
    }

    return (
      <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f5f5f7" }}>
        {/* Mobile overlay - Hidden as menu is removed */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Hidden on mobile */}
          <aside
            className={`fixed md:relative z-40 md:z-auto inset-y-0 left-0 bg-white hidden md:flex flex-col shrink-0 transition-transform duration-200 md:translate-x-0 w-[260px] ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            style={{ borderRight: "1px solid #f5f5f7" }}
          >

            <div className="pt-7 pb-8 flex items-center px-6">
              <Logo height={23.1} />
            </div>

          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const isPending = item.id === "tasks" && notifications.filter((n) => !readNotifs.has(n.id)).length > 0;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full flex items-center gap-3 text-[15px] px-3 py-3 rounded-full transition-colors font-medium group"
                  style={
                    isActive
                      ? { backgroundColor: "#1d1d1f", color: "#ffffff", fontWeight: 600 }
                      : { backgroundColor: "transparent", color: "#1d1d1f" }
                  }
                  onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundColor = "#f5f5f7")}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div className="flex items-center gap-3 transition-opacity" style={isActive ? {} : { opacity: 0.5 }}>
                    <item.icon size={18} strokeWidth={isActive ? 2 : 1.6} />
                    {item.label}
                  </div>
                  {isPending && (
                    <span className="ml-auto text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: isActive ? "#ffffff" : "#EF4444", color: isActive ? "#EF4444" : "#ffffff", opacity: 1 }}>
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="px-2 pb-6 space-y-1">
            <button
              onClick={() => handleNavClick("settings")}
              className="w-full flex items-center gap-3 text-[15px] font-medium px-3 py-3 rounded-full transition-colors"
              style={
                activeNav === "settings"
                  ? { backgroundColor: "#1d1d1f", color: "#ffffff", fontWeight: 600 }
                  : { backgroundColor: "transparent", color: "#1d1d1f" }
              }
              onMouseEnter={(e) => activeNav !== "settings" && (e.currentTarget.style.backgroundColor = "#f5f5f7")}
              onMouseLeave={(e) => activeNav !== "settings" && (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div className="flex items-center gap-3 transition-opacity" style={activeNav === "settings" ? {} : { opacity: 0.5 }}>
                <Settings size={18} strokeWidth={activeNav === "settings" ? 2 : 1.6} />
                Settings
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 text-[15px] font-medium px-3 py-3 rounded-full transition-colors text-black"
              onMouseEnter={(e) => { 
                e.currentTarget.style.backgroundColor = "#f5f5f7";
                (e.currentTarget.querySelector(".logout-content") as HTMLElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.backgroundColor = "transparent";
                (e.currentTarget.querySelector(".logout-content") as HTMLElement).style.opacity = "0.5";
              }}
            >
              <div className="flex items-center gap-3 transition-opacity logout-content" style={{ opacity: 0.5 }}>
                <LogOut size={18} strokeWidth={1.6} />
                Logout
              </div>
            </button>

        </div>
      </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header section - Hidden on mobile dashboard per request */}
          <div className="hidden items-center justify-between px-4 md:px-8 py-4 bg-white shrink-0" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <button
              className="p-1.5 -ml-1 text-black rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Menu size={20} />
            </button>
              <Logo height={18.5} />
              <div className="w-8" /> {/* spacer for centering logo */}
          </div>



        <div className="flex-1 flex min-h-0 overflow-hidden">
            {activeAgent ? (
              <AgentDetailView
                agentName={activeAgent}
                onBack={handleBack}
                onGoIntegrations={handleConnect}
              />

              ) : (
                <div className="flex-1 overflow-auto min-h-0 pb-28">
                      {/* Mobile Logo - Only on main dashboard */}
                      {activeNav === "dashboard" && (
                        <div className="md:hidden flex justify-center pt-5 pb-0 bg-[#f5f5f7]">
                          <Logo height={18} />
                        </div>
                      )}
                  {activeNav === "dashboard" && <DashboardView profile={profile} onConnect={handleConnect} onOpenChat={handleOpenChat} />}
                {activeNav === "tasks" && <TasksView />}
              {activeNav === "files" && <FilesView />}
              {activeNav === "integrations" && <IntegrationsView focusAgent={focusAgent} />}
              {activeNav === "settings" && <SettingsView profile={profile} subscription={subscription} onProfileSaved={handleProfileSaved} />}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

/* ─── Main Page ─── */
export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-white">
          <div className="text-black" style={{ opacity: 0.4 }}>Loading...</div>
        </div>
      }
    >
      <AppContent />
    </Suspense>
  );
}
