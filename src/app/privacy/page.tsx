import React from "react";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide when creating an account, including your name, email address, and business details. We also collect usage data to improve our service, such as pages visited, features used, and performance metrics from your connected accounts (Google Search Console, ad platforms, etc.).",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use your information to operate and improve the platform, personalize your experience, send service-related communications, process payments, and provide customer support. We do not sell your personal information to third parties.",
  },
  {
    title: "Data Sharing",
    content:
      "We share data with trusted service providers (Supabase for database, Stripe for payments, third-party AI providers for agent functionality) solely to operate the platform. All providers are contractually obligated to protect your data.",
  },
  {
    title: "Connected Accounts",
    content:
      "When you connect third-party accounts (Google, Meta, etc.), we access only the data necessary to operate your agents. You can revoke access at any time from your Settings page or directly from the third-party platform.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your data as long as your account is active. You may delete your account at any time, which will remove your personal data within 30 days, except where we are required to retain it for legal or business purposes.",
  },
  {
    title: "Security",
    content:
      "We use industry-standard encryption and security practices to protect your data, including TLS in transit and AES-256 at rest. Access to production data is restricted to authorized personnel only.",
  },
  {
    title: "Cookies",
    content:
      "We use essential cookies to keep you logged in and functional cookies to remember your preferences. We do not use advertising cookies or third-party tracking pixels on our platform.",
  },
    {
      title: "Your Rights",
          content:
            "You have the right to access, correct, or delete your personal data. To exercise these rights, email us at privacy@swivo.ai. We will respond within 30 days.",
        },
        {
          title: "Changes to This Policy",
          content:
            "We may update this Privacy Policy periodically. We will notify you by email of material changes and will always post the latest version on this page.",
        },
        {
          title: "Contact Us",
          content:
            "Questions about this policy? Email us at privacy@swivo.ai or write to us at swivo Inc., 123 Market St, San Francisco, CA 94103.",
        },

];

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen text-[#121212] font-sans selection:bg-[#121212] selection:text-white">
      <Navigation />

      <section className="w-full bg-white">
        <div className="max-w-[800px] mx-auto px-6 pt-[160px] pb-[80px] text-center">
          <h1 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.03em] leading-[1.1] text-[#121212] mb-6">Privacy Policy</h1>
          <p className="text-[16px] font-medium text-[#666666]">Last updated: March 1, 2026</p>
        </div>
        <div className="w-full h-px bg-[#f5f5f7]" />
      </section>

      <section className="bg-white py-[120px]">
        <div className="max-w-[800px] mx-auto px-6 space-y-24">
          <p className="text-[20px] leading-[1.6] font-normal text-[#666666]">
            swivo (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
          </p>
          <div className="space-y-16">
            {sections.map((s, i) => (
              <div key={i} className="pt-16 border-t border-[#f5f5f7]">
                <h2 className="text-[28px] font-semibold text-[#121212] mb-6 tracking-[-0.02em]">{s.title}</h2>
                <p className="text-[18px] leading-[1.8] text-[#666666]">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
