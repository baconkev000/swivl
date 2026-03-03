import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { website_url, business_description, automations, role, plan, completed } = body;

  const { error } = await supabase
    .from("onboarding")
    .upsert({
      user_id: user.id,
      website_url,
      business_description,
      automations,
      role,
      plan,
      completed: completed ?? false,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data } = await supabase
    .from("onboarding")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return NextResponse.json({ onboarding: data });
}
