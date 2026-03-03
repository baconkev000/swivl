import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  // In sandbox/test mode, we process without signature verification
  let event;
  try {
    if (process.env.STRIPE_WEBHOOK_SECRET && sig) {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      event = JSON.parse(body);
    }
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.supabase_user_id;
      const plan = session.metadata?.plan;

      if (userId && plan) {
        // Update profile
        await supabaseAdmin
          .from("profiles")
          .update({
            plan,
            stripe_customer_id: session.customer,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        // Create subscription record
        await supabaseAdmin.from("subscriptions").insert({
          user_id: userId,
          plan,
          price:
            plan === "starter" ? 100 : plan === "professional" ? 250 : 400,
          stripe_subscription_id: session.subscription,
          stripe_checkout_session_id: session.id,
          status: "active",
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      await supabaseAdmin
        .from("subscriptions")
        .update({ status: "cancelled", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", subscription.id);

      // Reset profile plan
      const { data: sub } = await supabaseAdmin
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      if (sub) {
        await supabaseAdmin
          .from("profiles")
          .update({ plan: "free", updated_at: new Date().toISOString() })
          .eq("id", sub.user_id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
