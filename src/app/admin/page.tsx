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
    <div className="min-h-screen bg-ice-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white border border-deep-teal/10 backdrop-blur-xl rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-deep-teal text-center mb-1">
          Admin Panel
        </h1>
        <p className="text-deep-teal/70 text-sm text-center mb-8">
          Sign in to manage your portfolio
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <label className="block mb-1 text-deep-teal/75 text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white border border-deep-teal/10 text-deep-teal placeholder-deep-teal/60 focus:border-soft-peach focus:outline-none transition"
          placeholder="admin@example.com"
          required
        />

        <label className="block mb-1 text-deep-teal/75 text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-white border border-deep-teal/10 text-deep-teal placeholder-deep-teal/60 focus:border-soft-peach focus:outline-none transition"
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r bg-deep-teal text-ice-white hover:bg-soft-peach hover:text-deep-teal font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
