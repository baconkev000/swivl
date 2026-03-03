import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { agents } = await request.json();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const count = parseInt(agents) || 1;
  const price = 250 + (count > 1 ? (count - 1) * 50 : 0);
  const planName = `${count} Agent${count > 1 ? "s" : ""}`;

  // Update profile plan
  await supabase
    .from("profiles")
    .update({ plan: planName, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  // Create subscription record
  const { data, error } = await supabase
    .from("subscriptions")
    .upsert({
      user_id: user.id,
      plan: planName,
      price,
      status: "active",
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    }, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ subscription: data });
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return NextResponse.json({ profile, subscription });
}
