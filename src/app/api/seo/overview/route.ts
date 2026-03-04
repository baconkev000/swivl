import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const backendBase =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

  const cookieHeader = cookies().toString();

  const res = await fetch(`${backendBase}/api/seo/overview/`, {
    method: "GET",
    headers: {
      cookie: cookieHeader,
      accept: "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { error: text || "Failed to load SEO overview" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

