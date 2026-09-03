"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setError(null);
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.replace("/dashboard");
      router.refresh();
      return;
    }

    const data = await res.json().catch(() => null);
    setError(data?.error ?? "Login failed");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-deep text-white font-['Lato',sans-serif] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-yellow-500/15 rounded-sm p-8 bg-white/2"
      >
        <p className="text-yellow-500/50 text-[0.6rem] tracking-[0.4em] uppercase mb-1 text-center">
          Wedding Dashboard
        </p>
        <h1 className="font-['Cormorant_Garamond',serif] text-2xl text-yellow-400/90 text-center mb-8">
          Admin Login
        </h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/30 mb-4"
        />

        {error && <p className="text-red-400/70 text-xs mb-4">{error}</p>}

        <button
          type="submit"
          disabled={!password || loading}
          className="w-full bg-yellow-500/90 hover:bg-yellow-400 disabled:opacity-30 text-black text-[0.65rem] tracking-widest uppercase font-bold px-6 py-3 transition-colors rounded-sm"
        >
          {loading ? "Checking..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
