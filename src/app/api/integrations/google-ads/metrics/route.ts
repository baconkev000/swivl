import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const backendBase =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const search = new URL(request.url).searchParams.toString();
  const suffix = search ? `?${search}` : "";

  const res = await fetch(
    `${backendBase}/api/integrations/google-ads/metrics/${suffix}`,
    {
      method: "GET",
      headers: {
        cookie: cookieHeader,
        accept: "application/json",
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let error = "Failed to load Google Ads metrics";
    let reason: string | undefined;
    try {
      const parsed = JSON.parse(text) as { error?: string; reason?: string };
      if (typeof parsed.error === "string") error = parsed.error;
      if (typeof parsed.reason === "string") reason = parsed.reason;
    } catch {
      if (text) error = text;
    }
    return NextResponse.json(
      reason ? { error, reason } : { error },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
