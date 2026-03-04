import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") ?? "";

  const response = await fetch(`${BACKEND_BASE}/api/users/me/`, {
    method: "GET",
    headers: {
      cookie: cookieHeader,
      Accept: "application/json",
    },
    credentials: "include",
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return NextResponse.json(data, { status: response.status });
}

