import React from "react";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing or using swivo, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform."
  },
    {
      title: "Description of Service",
      content: "swivo provides AI-powered agents (SEO, Reviews, Ads) to help businesses automate SEO, Reputation Management, and Ad campaigns. We reserve the right to modify or discontinue any part of the service at any time."
    },
  {
    title: "User Accounts",
    content: "You are responsible for maintaining the security of your account and password. swivo cannot and will not be liable for any loss or damage from your failure to comply with this security obligation."
  },
  {
    title: "Payment and Subscriptions",
    content: "We offer several subscription plans. By selecting a plan, you agree to pay the fees associated with that plan. Subscriptions are billed in advance and are non-refundable except where required by law."
  },
  {
    title: "Acceptable Use",
    content: "You may not use swivo for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction (including but not limited to copyright laws)."
  },
  {
    title: "Intellectual Property",
    content: "All content provided on swivo is the property of swivo or its content suppliers and is protected by international copyright laws."
  },
  {
    title: "Limitation of Liability",
    content: "In no event shall swivo be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services."
  },
  {
    title: "Governing Law",
    content: "These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of the State of California."
  }
];

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen text-[#121212] font-sans selection:bg-[#121212] selection:text-white">
      <Navigation />

      <section className="w-full bg-white">
        <div className="max-w-[800px] mx-auto px-6 pt-[160px] pb-[80px] text-center">
          <h1 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.03em] leading-[1.1] text-[#121212] mb-6">Terms of Service</h1>
          <p className="text-[16px] font-medium text-[#666666]">Last updated: March 1, 2026</p>
        </div>
        <div className="w-full h-px bg-[#f5f5f7]" />
      </section>

      <section className="bg-white py-[120px]">
        <div className="max-w-[800px] mx-auto px-6 space-y-24">
          <p className="text-[20px] leading-[1.6] font-normal text-[#666666]">
            Please read these terms carefully before using the swivo platform. By using swivo, you signify your agreement to these Terms of Service.
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
