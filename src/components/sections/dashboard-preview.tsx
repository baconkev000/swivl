import React from "react";
import Logo from "@/components/logo";
import {
  LayoutDashboard,
  ListChecks,
  BarChart3,
  FileText,
  RotateCcw,
  Settings,
  LogOut,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

function RevenueBarChart() {
  const data = [45, 55, 48, 62, 50, 58, 65, 72, 60, 78, 68, 80, 55, 70, 85, 75, 90, 82, 68, 88, 72, 95, 78, 85];
  const xLabels = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];
  return (
    <div className="mt-3 flex gap-1">
      <div className="flex-1">
        <div className="flex items-end gap-[2px] h-[80px]">
          {data.map((v, i) => (
            <div key={i} className="flex-1 rounded-t-[1px]" style={{ height: `${v}%`, backgroundColor: "#000000" }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {xLabels.map((l) => (
            <span key={l} className="text-[6px]" style={{ color: "rgba(0,0,0,0.4)" }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrafficLineChart() {
  return (
    <div className="mt-3 h-[80px]">
      <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
        <path
          d="M0,80 C20,76 40,82 60,72 C80,66 100,70 120,60 C140,54 160,58 180,48 C200,42 220,46 240,38 C260,32 280,36 300,26 C320,20 340,24 360,18 C380,14 400,10 400,8"
          fill="none" stroke="#000000" strokeWidth="2"
        />
      </svg>
    </div>
  );
}

function DualBarChart() {
  const data = [
    { b: 30, c: 22 }, { b: 45, c: 35 }, { b: 38, c: 28 }, { b: 55, c: 40 },
    { b: 48, c: 55 }, { b: 60, c: 45 }, { b: 52, c: 62 }, { b: 70, c: 50 },
    { b: 65, c: 72 }, { b: 80, c: 58 }, { b: 72, c: 80 }, { b: 85, c: 65 },
    { b: 78, c: 88 }, { b: 92, c: 70 }, { b: 85, c: 78 }, { b: 70, c: 90 },
    { b: 88, c: 75 }, { b: 95, c: 82 },
  ];
  const xLabels = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];
  return (
    <div className="mt-3 flex gap-1">
      <div className="flex-1">
        <div className="flex items-end gap-[1px] h-[80px]">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex items-end gap-[0.5px] h-full">
              <div className="flex-1 rounded-t-[1px]" style={{ height: `${d.b}%`, backgroundColor: "#000000" }} />
              <div className="flex-1 rounded-t-[1px]" style={{ height: `${d.c}%`, backgroundColor: "rgba(0,0,0,0.35)" }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {xLabels.map((l) => (
            <span key={l} className="text-[6px]" style={{ color: "rgba(0,0,0,0.4)" }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskRow({ text, variant }: { text: string; variant: "lead" | "progress" | "completed" | "cta" }) {
  if (variant === "cta") {
    return (
      <div className="flex items-center justify-between px-3 py-2 rounded-full cursor-pointer" style={{ backgroundColor: "#f5f5f7" }}>
        <span className="text-[9px] text-black font-medium">{text}</span>
        <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
          <ArrowRight size={8} className="text-black" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-full" style={{ backgroundColor: "#f5f5f7" }}>
      <span className={`text-[9px] truncate ${variant === "completed" ? "line-through" : ""}`}
        style={{ color: variant === "completed" ? "rgba(0,0,0,0.35)" : "#000000" }}>
        {text}
      </span>
      <div className="shrink-0 ml-2">
        {variant === "lead" && (
          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
            <ArrowRight size={8} style={{ color: "rgba(0,0,0,0.5)" }} />
          </div>
        )}
        {variant === "progress" && <Circle size={14} style={{ color: "rgba(0,0,0,0.2)" }} />}
        {variant === "completed" && <CheckCircle2 size={14} style={{ color: "rgba(0,0,0,0.25)" }} />}
      </div>
    </div>
  );
}

const sidebarNav = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ListChecks, label: "Tasks", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: FileText, label: "Files", active: false },
  { icon: RotateCcw, label: "Recaps", active: false },
];

interface DashboardPreviewProps {
  title?: string;
  metrics?: { label: string; value: string; change: string; chart: "bar" | "line" | "dual" }[];
  leads?: { title: string; count: string; items: string[] };
  progress?: { count: string; items: string[] };
  completed?: { count: string; items: string[] };
}

const defaultMetrics: DashboardPreviewProps["metrics"] = [
  { label: "Daily Revenue", value: "$46,312", change: "+$12.4k", chart: "bar" },
  { label: "Organic Traffic", value: "424,288", change: "+2.42%", chart: "line" },
  { label: "ROAS", value: "3.2x", change: "+1.2", chart: "dual" },
];

export default function DashboardPreview({
  title = "Dashboard",
  metrics = defaultMetrics,
  leads = { title: "New Leads to Review", count: "24", items: ["View lead 1", "View lead 2"] },
  progress = { count: "8", items: ["Reviewing previous ad performance", "Fixing 34 of your existing blog posts"] },
  completed = { count: "4", items: ["Adding programmatic landing pages", "Analyzed SEO strategy"] },
}: DashboardPreviewProps) {
  return (
    <section className="bg-white py-[80px] md:py-[100px]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="overflow-hidden rounded-3xl bg-white" style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.08)" }}>
          <div className="flex min-h-[460px]">
            {/* Sidebar */}
            <div className="w-[180px] p-4 flex-col hidden sm:flex shrink-0" style={{ borderRight: "1px solid #f5f5f7" }}>
            <div className="flex items-center gap-1.5 mb-7 px-2">
              <Logo height={22} />
            </div>
              <nav className="space-y-0.5">
                {sidebarNav.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 text-[11px] font-medium px-3 py-2.5 rounded-full"
                    style={item.active ? { backgroundColor: "#000000", color: "#FFFFFF" } : { color: "rgba(0,0,0,0.4)" }}
                  >
                    <item.icon size={14} strokeWidth={item.active ? 2 : 1.6} />
                    {item.label}
                  </div>
                ))}
              </nav>
              <div className="mt-auto pt-4 space-y-0.5" style={{ borderTop: "1px solid #f5f5f7" }}>
                <div className="flex items-center gap-2.5 text-[11px] font-medium px-3 py-2.5" style={{ color: "rgba(0,0,0,0.4)" }}>
                  <Settings size={14} strokeWidth={1.6} /> Settings
                </div>
                <div className="flex items-center gap-2.5 text-[11px] font-medium px-3 py-2.5" style={{ color: "rgba(0,0,0,0.4)" }}>
                  <LogOut size={14} strokeWidth={1.6} /> Logout
                </div>
              </div>
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: "#f5f5f7" }}>
              <div className="px-5 pt-5 pb-3 bg-white" style={{ borderBottom: "1px solid #f5f5f7" }}>
                <span className="text-[15px] font-semibold text-black tracking-[-0.02em]">{title}</span>
              </div>

              <div className="flex-1 p-4 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {metrics?.map((m, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4">
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-medium" style={{ color: "rgba(0,0,0,0.4)" }}>{m.label}</span>
                        <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#000000" }}>{m.change}</span>
                      </div>
                      <div className="text-[24px] font-semibold text-black tracking-[-0.03em] leading-tight mt-0.5">{m.value}</div>
                      {m.chart === "bar" && <RevenueBarChart />}
                      {m.chart === "line" && <TrafficLineChart />}
                      {m.chart === "dual" && <DualBarChart />}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-2xl p-4">
                    <span className="text-[10px] font-medium" style={{ color: "rgba(0,0,0,0.4)" }}>{leads?.title}</span>
                    <div className="text-[24px] font-semibold text-black tracking-[-0.03em] leading-tight mt-0.5 mb-3">{leads?.count}</div>
                    <div className="space-y-1.5">
                      {leads?.items.map((item, i) => <TaskRow key={i} text={item} variant="lead" />)}
                      <TaskRow text="Auto approve all" variant="cta" />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4">
                    <span className="text-[10px] font-medium" style={{ color: "rgba(0,0,0,0.4)" }}>Tasks in progress</span>
                    <div className="text-[24px] font-semibold text-black tracking-[-0.03em] leading-tight mt-0.5 mb-3">{progress?.count}</div>
                    <div className="space-y-1.5">
                      {progress?.items.map((item, i) => <TaskRow key={i} text={item} variant="progress" />)}
                      <TaskRow text="View all tasks in progress" variant="cta" />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-medium" style={{ color: "rgba(0,0,0,0.4)" }}>Tasks completed</span>
                      <div className="flex gap-0.5">
                        <span className="text-[7px] font-semibold text-white px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#000000" }}>7d</span>
                        <span className="text-[7px] font-medium px-1.5 py-0.5 rounded-full" style={{ color: "rgba(0,0,0,0.4)", backgroundColor: "#f5f5f7" }}>1m</span>
                      </div>
                    </div>
                    <div className="text-[24px] font-semibold text-black tracking-[-0.03em] leading-tight mt-0.5 mb-3">{completed?.count}</div>
                    <div className="space-y-1.5">
                      {completed?.items.map((item, i) => <TaskRow key={i} text={item} variant="completed" />)}
                      <TaskRow text="View all completed tasks" variant="cta" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
