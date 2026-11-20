"use client";

import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "@/lib/supabase-auth";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (error) {
      setError(
        error instanceof Error && error.message.startsWith("Supabase is not configured")
          ? "Supabase is not configured. Add the required environment variables."
          : "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login relative flex min-h-screen items-center justify-center overflow-hidden bg-ice-white px-4 py-12">
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-deep-teal/10 bg-white p-7 shadow-[0_24px_70px_rgba(15,61,71,0.12)] sm:p-9"
      >
        <div className="mb-8">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-deep-teal text-sm font-bold tracking-tight text-ice-white shadow-sm">
            AB<span className="text-soft-peach">.</span>
          </div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep-teal/50">
            Portfolio workspace
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-deep-teal">
            Welcome back.
          </h1>
          <p className="mt-2 text-sm leading-6 text-deep-teal/60">
            Sign in to manage your portfolio content.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-deep-teal/80"
            >
              Email address
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-deep-teal/15 bg-ice-white/50 px-4 py-3 text-sm text-deep-teal placeholder:text-deep-teal/35 transition focus:border-soft-peach focus:bg-white focus:outline-none focus:ring-4 focus:ring-soft-peach/15"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-deep-teal/80"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-deep-teal/15 bg-ice-white/50 px-4 py-3 text-sm text-deep-teal placeholder:text-deep-teal/35 transition focus:border-soft-peach focus:bg-white focus:outline-none focus:ring-4 focus:ring-soft-peach/15"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-7 flex w-full items-center justify-center rounded-xl bg-deep-teal px-5 py-3.5 text-sm font-semibold text-ice-white shadow-[0_10px_24px_rgba(15,61,71,0.16)] transition hover:-translate-y-0.5 hover:bg-soft-peach hover:text-deep-teal disabled:translate-y-0 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
