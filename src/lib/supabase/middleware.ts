import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Also treat a valid session on the Django backend as authenticated.
  // This lets Google SSO (handled by the backend) protect /app alongside Supabase.
  let hasBackendSession = false;
  if (!user) {
    try {
      const backendBase =
        process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
      const backendRes = await fetch(`${backendBase}/api/users/me/`, {
        method: "GET",
        headers: {
          cookie: request.headers.get("cookie") ?? "",
          accept: "application/json",
        },
      });
      if (backendRes.ok) {
        hasBackendSession = true;
      }
    } catch {
      // If the backend is unreachable, fall back to Supabase-only logic.
    }
  }

  const isAuthed = !!user || hasBackendSession;

  // Protect /app routes (allow either Supabase or backend-authenticated users)
  if (!isAuthed && request.nextUrl.pathname.startsWith("/app")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from /login
  if (isAuthed && request.nextUrl.pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
