"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/logo";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

    useEffect(() => {
      async function checkSession() {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.replace("/app");
        } else {
          setCheckingSession(false);
        }
      }
      checkSession();
      // Ensure background color fills everything
      document.body.style.backgroundColor = "#f5f5f7";
      document.documentElement.style.backgroundColor = "#f5f5f7";
      return () => {
        document.body.style.backgroundColor = "";
        document.documentElement.style.backgroundColor = "";
      };
    }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (mode === "signup") {
        setMessage("Account created! Check your email to confirm, then sign in.");
        setMode("login");
        return;
      }

      // Successful login - go straight to app
      window.location.href = "/app";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/api/auth/callback?next=/app`;
    await supabase.auth.signInWithOAuth({ 
      provider: "google", 
      options: { redirectTo } 
    });
  };

  const handleForgotPassword = async () => {
    if (!email) { setError("Please enter your email first"); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/reset-password`,
    });
    if (resetError) setError(resetError.message);
    else setMessage("Password reset email sent! Check your inbox.");
    setLoading(false);
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f5f5f7" }}>
        <div className="text-black" style={{ opacity: 0.4 }}>Loading...</div>
      </div>
    );
  }

  const inputBase = "w-full px-4 py-3 rounded-2xl text-[14px] text-black outline-none transition-all";
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0,0,0,0.12)"; };
  const onBlur  = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.backgroundColor = "#f5f5f7"; e.currentTarget.style.boxShadow = "none"; };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f7" }}>
        <div className="px-8 py-6">
            <Logo height={22.8} />
        </div>

      <div className="flex items-start justify-center pt-12 px-4 pb-16">
        <div className="w-full max-w-[420px] bg-white rounded-3xl p-8">
          <div className="mb-7">
            <h1 className="text-[24px] font-semibold text-black tracking-[-0.02em] leading-tight">
              {mode === "login" ? "Sign in" : "Create account"}
            </h1>
              <p className="text-[14px] text-black mt-1.5" style={{ opacity: 0.5 }}>
                {mode === "login" ? "Welcome back to swivo." : "Start growing with AI agents today."}
              </p>

          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-2xl text-[13px] text-black" style={{ backgroundColor: "#f5f5f7" }}>
              {error}
            </div>
          )}
          {message && (
            <div className="mb-5 px-4 py-3 rounded-2xl text-[13px] text-black font-medium" style={{ backgroundColor: "#f5f5f7" }}>
              {message}
            </div>
          )}

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl text-[14px] font-medium text-black transition-colors mb-5"
            style={{ backgroundColor: "#f5f5f7" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e5e5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
          >
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path d="M44 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.52 2.74-2.08 5.06-4.42 6.62v5.54h7.16c4.16-3.84 6.56-9.48 6.56-16.17z" fill="#0088FF"/>
                <path d="M24 45c5.94 0 10.92-1.96 14.56-5.32l-7.16-5.54c-1.96 1.32-4.46 2.1-7.42 2.1-5.72 0-10.56-3.86-12.28-9.06H4.3v5.72C7.92 40.52 15.4 45 24 45z" fill="#34A853"/>
                <path d="M11.72 27.18A12.24 12.24 0 0111 24c0-1.1.18-2.18.5-3.18V15.1H4.3A20.04 20.04 0 004 24c0 3.24.78 6.3 2.14 9l5.58-4.32.18-1.5z" fill="#FBBC05"/>
                <path d="M24 11.76c3.22 0 6.12 1.1 8.4 3.28l6.3-6.3C34.9 5.18 29.92 3 24 3 15.4 3 7.92 7.48 4.3 15l7.42 5.72C13.44 15.62 18.28 11.76 24 11.76z" fill="#EA4335"/>
              </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ backgroundColor: "#f5f5f7" }} />
            <span className="text-[12px] text-black font-medium" style={{ opacity: 0.4 }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#f5f5f7" }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-black mb-1.5">Email</label>
              <input
                type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required
                className={`${inputBase} placeholder:text-black`}
                style={{ backgroundColor: "#f5f5f7", "--tw-placeholder-opacity": "0.3" } as React.CSSProperties}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-black mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} placeholder="Password" value={password}
                  onChange={(e) => setPassword(e.target.value)} required minLength={6}
                  className={`${inputBase} pr-11 placeholder:text-black`}
                  style={{ backgroundColor: "#f5f5f7", "--tw-placeholder-opacity": "0.3" } as React.CSSProperties}
                  onFocus={onFocus} onBlur={onBlur}
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black transition-opacity hover:opacity-100"
                  style={{ opacity: 0.4 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-black text-white font-semibold py-3 rounded-2xl text-[14px] transition-opacity disabled:opacity-50"
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              {loading ? "Loading..." : mode === "login" ? "Sign in" : "Create account"}
            </button>

            {mode === "login" && (
              <button
                type="button" onClick={handleForgotPassword} disabled={loading}
                className="w-full py-3 rounded-2xl text-[14px] font-medium text-black transition-colors disabled:opacity-50"
                style={{ backgroundColor: "#f5f5f7" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e5e5")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f7")}
              >
                Forgot password?
              </button>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}
              className="text-[13px] text-black transition-opacity hover:opacity-100"
              style={{ opacity: 0.4 }}
            >
              {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f5f5f7" }}><div className="text-black" style={{ opacity: 0.4 }}>Loading...</div></div>}>
      <AuthPage />
    </Suspense>
  );
}
