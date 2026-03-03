"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
    {
      question: "What is swivo?",
      answer: "swivo is a platform for automated AI agents (SEO, Reviews, and Ads) that help you scale your business by managing your SEO, brand reputation, and ad campaigns."
    },
  {
    question: "How do the agents work?",
    answer: "Our agents connect to your existing platforms (Google Search Console, Meta Ads, etc.) and perform thousands of automated tasks each month to optimize your digital presence."
  },
  {
    question: "Do you have discounts for students and educators?",
    answer: "Yes, we offer a 50% discount for students and educators. Please contact our support team with proof of your status to apply."
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept all major credit cards, including Visa, Mastercard, and American Express, as well as digital payments like Apple Pay and Google Pay through Stripe."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time. Your access will remain active until the end of your current billing period."
  },
  {
    question: "How do I switch from a Pro plan to a Team plan?",
    answer: "You can easily upgrade to a Team plan from your account settings. The transition is seamless and your billing will be adjusted accordingly."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-32 border-t border-[#f5f5f7]">
      <div className="container max-w-[800px] mx-auto px-6">
        <h2 className="mb-16 text-center text-[40px] md:text-[48px] font-semibold text-[#121212] tracking-tight">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-[#f5f5f7]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="py-6 transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between text-left focus:outline-none group"
                aria-expanded={openIndex === index}
              >
                <span className="text-[18px] font-semibold text-[#121212] group-hover:text-[#121212]/70 transition-colors">
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full bg-[#f5f5f7] transition-all duration-300 ${openIndex === index ? 'bg-[#121212] text-white' : 'text-[#121212]'}`}>
                  <Plus 
                    size={20} 
                    className={`transition-transform duration-300 ${
                      openIndex === index ? 'rotate-45' : ''
                    }`} 
                  />
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? 'max-h-[500px] opacity-100 mt-6'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-[16px] leading-relaxed text-[#666666] max-w-[700px]">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
