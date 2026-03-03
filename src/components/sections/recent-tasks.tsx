import React from "react";
import { CheckCircle2 } from "lucide-react";

interface RecentTasksProps {
  heading: string;
  subtitle: string;
  tasks: string[];
}

export default function RecentTasks({ heading, subtitle, tasks }: RecentTasksProps) {
  return (
    <section className="py-[100px]" style={{ backgroundColor: "#f5f5f7" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-black mb-4">{heading}</h2>
          <p className="text-[17px] text-black opacity-50 max-w-[500px]">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-4 bg-white rounded-2xl"
            >
              <CheckCircle2 size={16} style={{ color: "#000000", flexShrink: 0 }} />
              <span className="text-[13px] text-black">{task}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
