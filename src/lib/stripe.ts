import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export const PLANS = {
  starter: {
    name: "Starter",
    price: 100,
    priceId: "price_1T2eEUPywmbYsUYeqjejaJlg",
  },
  professional: {
    name: "Professional",
    price: 250,
    priceId: "price_1T2eEVPywmbYsUYeq9EqGowd",
  },
  enterprise: {
    name: "Enterprise",
    price: 400,
    priceId: "price_1T2eEVPywmbYsUYemhsvXXxW",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
