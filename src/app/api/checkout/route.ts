import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const PLAN_PRICES: Record<string, { amount: number; name: string }> = {
  starter: { amount: 100, name: "Starter" },
  professional: { amount: 250, name: "Professional" },
  enterprise: { amount: 400, name: "Enterprise" },
};

export async function POST(request: Request) {
  try {
    const { agentCount } = await request.json();
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const count = parseInt(agentCount) || 1;
    const amount = 250 + (count > 1 ? (count - 1) * 50 : 0);
    const planName = `${count} Agent${count > 1 ? "s" : ""}`;

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Create Stripe Checkout session
    const origin = request.headers.get("origin") || "http://localhost:3000";

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: "usd",
                  product_data: {
                    name: `swivo ${planName} Plan`,
                  },
              unit_amount: amount * 100,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/app?checkout=success&agents=${count}`,
        cancel_url: `${origin}/onboarding?checkout=cancelled`,
        metadata: {
          supabase_user_id: user.id,
          agent_count: count.toString(),
          plan: planName,
        },
      });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
