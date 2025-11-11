"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧩 Use environment variable (works on Vercel + local)
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.detail || "Invalid login credentials!");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("✅ Login Response:", data);

      // Save token securely
      localStorage.setItem("access_token", data.access_token);

      // Redirect to dashboard
      router.replace("/dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="light min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none stars"></div>

      <form
        onSubmit={handleLogin}
        className="card w-full max-w-md shadow-2xl border border-gray-200 p-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Welcome Back 👋
        </h2>

        <input
          className="mb-3 input input-bordered w-full"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="mb-5 input input-bordered w-full"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm">
          New here?{" "}
          <a
            href="/register"
            className="text-primary font-semibold hover:underline"
          >
            Create Account →
          </a>
        </p>
      </form>
    </div>
  );
}
