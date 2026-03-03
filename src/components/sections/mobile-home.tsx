"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, Plus, X } from "lucide-react";
import Logo from "@/components/logo";

const quickActions = [
  { icon: "📍", label: "Get me found on Google" },
  { icon: "⭐", label: "Get more 5-star reviews" },
  { icon: "💰", label: "Get more customers from ads" },
  { icon: "📝", label: "Write me a blog post" },
  { icon: "📊", label: "Show my business growth" },
];

interface Message {
  role: "user" | "agent";
  text: string;
}

export default function MobileHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function send(text?: string) {
    const toSend = text ?? message;
    if (!toSend.trim()) return;
    setMessages((m) => [...m, { role: "user", text: toSend }]);
    setMessage("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessages((m) => [
        ...m,
        { role: "agent", text: "Your agents are on it. SEO, Reviews, and Ads are analyzing your data now." },
      ]);
    }, 1400);
  }

  return (
    <div className="md:hidden flex flex-col h-screen overflow-hidden" style={{ backgroundColor: "#f5f5f7" }}>
        {/* Top navbar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0" style={{ backgroundColor: "#f5f5f7" }}>
          <Logo height={21} />
          <a href="/login">
          <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
            <span className="text-white text-[13px] font-semibold">M</span>
          </div>
        </a>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid #f5f5f7" }}>
            <Logo height={27} />
            <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center">
              <X size={20} className="text-black" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
            {[
              { label: "Products", href: "#" },
              { label: "Pricing", href: "/pricing" },
              { label: "Industries", href: "/industries" },
              { label: "Blog", href: "/blog" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3.5 text-[17px] font-medium text-black"
                style={{ borderBottom: "1px solid #f5f5f7" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="px-5 pb-8 space-y-3">
            <a href="/login" className="block text-center py-3.5 text-[16px] font-medium text-black rounded-full" style={{ backgroundColor: "#f5f5f7" }}>
              Log in
            </a>
            <a href="/pricing" className="block text-center py-3.5 text-[16px] font-semibold text-white bg-black rounded-full">
              Get Started
            </a>
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-[148px]">
        {messages.length === 0 ? (
          <div className="pt-8">
            <p className="text-[15px] font-medium mb-1" style={{ color: "rgba(0,0,0,0.45)" }}>Hi there</p>
            <h1 className="text-[30px] font-semibold text-black leading-[1.2] tracking-[-0.03em] mb-3">
              What do you need help with?
            </h1>
            <p className="text-[14px] mb-8" style={{ color: "rgba(0,0,0,0.45)" }}>
              SEO · Reviews · Ads
            </p>
            <div className="flex flex-col items-start gap-2.5">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => send(action.label)}
                  className="flex items-center gap-2.5 px-5 py-3.5 rounded-full text-[15px] font-medium text-black transition-all active:scale-[0.98] bg-white"
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "agent" && (
                  <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center mr-2 mt-1 shrink-0">
                    <span className="text-white text-[11px] font-semibold">M</span>
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-4 py-3 text-[15px] leading-[1.6] rounded-[20px] text-black ${
                    m.role === "user" ? "rounded-br-[6px]" : "rounded-bl-[6px]"
                  }`}
                  style={{
                    backgroundColor: m.role === "user" ? "#FFFFFF" : "#f5f5f7",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center mr-2 shrink-0">
                  <span className="text-white text-[11px] font-semibold">M</span>
                </div>
                <div className="px-4 py-3 rounded-[20px] rounded-bl-[6px] flex gap-1 items-center" style={{ backgroundColor: "#f5f5f7" }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" style={{ animationDelay: `${i * 0.15}s`, opacity: 0.4 }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Floating chat input */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-4" style={{ background: "linear-gradient(to top, #f5f5f7 60%, transparent)" }}>
        <div className="bg-white rounded-[24px] px-5 pt-4 pb-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask SEO, Reviews or Ads..."
              className="w-full text-[16px] text-black bg-transparent outline-none leading-relaxed pb-3"
              style={{ color: "#000000" }}
            />
          <div className="w-full h-px mb-3" style={{ backgroundColor: "#f5f5f7" }} />
          <div className="flex items-center justify-between">
            <button className="w-8 h-8 flex items-center justify-center rounded-full transition-colors" style={{ color: "rgba(0,0,0,0.4)" }}>
              <Plus size={17} />
            </button>
            <button
              onClick={() => send()}
              className="w-9 h-9 bg-black rounded-full flex items-center justify-center transition-opacity hover:opacity-85"
            >
              <ArrowUp size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
