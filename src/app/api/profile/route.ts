import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const backendBase =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

  const cookieHeader = cookies().toString();

  const res = await fetch(`${backendBase}/api/business-profile/`, {
    method: "GET",
    // Forward cookies so the Django session (Google login) is honored.
    headers: {
      cookie: cookieHeader,
      accept: "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ profile: data });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const backendBase =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

  const cookieHeader = cookies().toString();

  const res = await fetch(`${backendBase}/api/business-profile/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader,
      accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ profile: data });
}
