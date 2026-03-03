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

  let event;
  try {
    if (process.env.STRIPE_WEBHOOK_SECRET && sig) {
      event = await stripe.webhooks.constructEventAsync(
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
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const userId = subscription.metadata?.supabase_user_id;
      const plan = subscription.metadata?.plan;

      if (userId && plan) {
        const status =
          subscription.status === "active"
            ? "active"
            : subscription.status === "past_due"
              ? "past_due"
              : subscription.status === "canceled"
                ? "cancelled"
                : subscription.status;

        await supabaseAdmin
          .from("subscriptions")
          .upsert(
            {
              user_id: userId,
              plan,
              price:
                plan === "starter"
                  ? 100
                  : plan === "professional"
                    ? 250
                    : 400,
              stripe_subscription_id: subscription.id,
              status,
              current_period_start: new Date(
                subscription.current_period_start * 1000
              ).toISOString(),
              current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: "stripe_subscription_id" }
          );

        await supabaseAdmin
          .from("profiles")
          .update({
            plan,
            stripe_customer_id: subscription.customer,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;

      await supabaseAdmin
        .from("subscriptions")
        .update({ status: "cancelled", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", subscription.id);

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

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;

      if (subscriptionId) {
        await supabaseAdmin
          .from("subscriptions")
          .update({ status: "past_due", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subscriptionId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
