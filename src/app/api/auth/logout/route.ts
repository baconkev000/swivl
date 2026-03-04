import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Log out from Supabase (app session)
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Log out from Django/Google SSO session on the backend
  const backendBase =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    await fetch(`${backendBase}/api/logout/`, {
      method: "POST",
      headers: {
        cookie: cookieHeader,
        accept: "application/json",
      },
      credentials: "include",
    });
  } catch {
    // If backend is unreachable, still consider frontend logout successful.
  }

  return NextResponse.json({ success: true });
}
