"use client";

import React, { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2, Loader2, ArrowLeft, Shield } from "lucide-react";
import Logo from "@/components/logo";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PLAN_DETAILS: Record<string, { name: string; price: number; features: string[] }> = {
  starter: {
    name: "Starter",
    price: 100,
    features: [
      "AI-powered SEO management",
      "Content generation & updates",
      "Up to 5 projects",
      "Email support",
    ],
  },
  professional: {
    name: "Professional",
    price: 250,
    features: [
      "Everything in Starter",
      "Paid Ads management",
      "Up to 20 projects",
      "Priority support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 400,
    features: [
      "Everything in Professional",
      "Unlimited projects",
      "Dedicated account manager",
      "24/7 phone support",
    ],
  },
};

function PaymentForm({ plan, onSuccess }: { plan: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !isReady) return;
    setIsProcessing(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed. Please try again.");
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  const details = PLAN_DETAILS[plan];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-2xl p-5" style={{ backgroundColor: "#f5f5f7" }}>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[14px] font-semibold text-black">{details?.name} Plan</span>
          <span className="text-[13px]" style={{ color: "rgba(0,0,0,0.45)" }}>Monthly</span>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-[32px] font-semibold text-black tracking-[-0.03em] leading-none">${details?.price}</span>
          <span className="text-[14px]" style={{ color: "rgba(0,0,0,0.45)" }}>/mo</span>
        </div>
      </div>

      <div className="rounded-2xl p-5 overflow-y-auto bg-white" style={{ minHeight: 200, maxHeight: 400 }}>
        <PaymentElement onReady={() => setIsReady(true)} options={{ layout: "tabs" }} />
      </div>

      {error && (
        <div className="rounded-2xl px-4 py-3 text-[13px] text-black" style={{ backgroundColor: "#f5f5f7" }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !isReady || isProcessing}
        className="w-full h-[48px] rounded-full bg-black text-white text-[14px] font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        onMouseEnter={(e) => { if (!isProcessing) e.currentTarget.style.opacity = "0.85"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        {isProcessing ? (
          <><Loader2 size={16} className="animate-spin" />Processing...</>
        ) : (
          `Subscribe — $${details?.price}/mo`
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[12px]" style={{ color: "rgba(0,0,0,0.4)" }}>
        <Shield size={12} />
        Secured by Stripe · Cancel anytime
      </div>
    </form>
  );
}

function SuccessState({ plan }: { plan: string }) {
  const details = PLAN_DETAILS[plan];
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#f5f5f7" }}>
        <CheckCircle2 size={32} style={{ color: "#000000" }} />
      </div>
      <h2 className="text-[22px] font-semibold text-black mb-2 tracking-[-0.02em]">
        Welcome to {details?.name}!
      </h2>
      <p className="text-[15px] mb-8 max-w-[360px] mx-auto" style={{ color: "rgba(0,0,0,0.5)" }}>
        Your subscription is active. You now have access to all {details?.name} features.
      </p>
      <a
        href="/app"
        className="inline-flex h-[44px] px-8 items-center justify-center rounded-full bg-black text-white text-[14px] font-semibold transition-opacity"
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        Go to Dashboard
      </a>
    </div>
  );
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");

    if (!planParam || !PLAN_DETAILS[planParam]) {
      setError("Invalid plan selected.");
      setLoading(false);
      return;
    }

    setPlan(planParam);

    fetch("/api/stripe/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: planParam }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to start checkout");
        setClientSecret(data.clientSecret);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#f5f5f7" }}>
      <div className="w-full max-w-[480px]">
        <div className="flex items-center justify-between mb-8">
          <Link href="/"><Logo height={25} /></Link>
          <a href="/pricing" className="inline-flex items-center gap-1.5 text-[13px] transition-colors" style={{ color: "rgba(0,0,0,0.45)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#000000"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(0,0,0,0.45)"; }}>
            <ArrowLeft size={14} />
            Back to pricing
          </a>
        </div>

        <div className="bg-white rounded-3xl p-7">
          {!success && !loading && !error && (
            <div className="mb-6">
              <h1 className="text-[22px] font-semibold text-black tracking-[-0.02em]">Complete your subscription</h1>
              <p className="text-[14px] mt-1.5" style={{ color: "rgba(0,0,0,0.45)" }}>Enter your payment details below</p>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={24} className="animate-spin text-black" />
            </div>
          )}

          {error && !loading && (
            <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: "#f5f5f7" }}>
              <p className="text-[14px] text-black mb-4">{error}</p>
              <a href="/pricing" className="text-[13px] text-black font-medium hover:underline">
                Return to pricing
              </a>
            </div>
          )}

          {success && plan && <SuccessState plan={plan} />}

          {clientSecret && plan && !success && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#000000",
                    borderRadius: "12px",
                    fontFamily: "inherit",
                  },
                },
              }}
            >
              <PaymentForm plan={plan} onSuccess={() => setSuccess(true)} />
            </Elements>
          )}
        </div>
      </div>
    </main>
  );
}
