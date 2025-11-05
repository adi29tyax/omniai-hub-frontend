"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Invalid login credentials!");
        return;
      }

      const data = await res.json();
      console.log("Login Response:", data);

      localStorage.setItem("access_token", data.access_token);

      router.replace("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="light min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none stars"></div>

      <form
        onSubmit={handleLogin}
        className="card w-full max-w-md shadow-2xl border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Welcome Back 👋
        </h2>

        <input
          className="mb-3"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-5"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="mt-2">
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          New here?{" "}
          <a href="/register" className="text-primary font-semibold hover:underline">
            Create Account →
          </a>
        </p>
      </form>
    </div>
  );
}
