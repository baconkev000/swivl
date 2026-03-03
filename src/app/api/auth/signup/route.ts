import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { email_verified: true },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Auto-confirm email using admin client
  if (data.user) {
    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await admin.auth.admin.updateUserById(data.user.id, {
      email_confirm: true,
    });

    // Create profile
    await admin.from("profiles").upsert({
      id: data.user.id,
      email: data.user.email!,
      plan: "free",
    });
  }

  return NextResponse.json({ user: data.user });
}
