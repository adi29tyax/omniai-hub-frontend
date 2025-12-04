"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "sonner";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", { email, password });
      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (error: any) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none stars"></div>

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl z-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Create Account 🚀
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 focus:outline-none"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:underline">
            Login here →
          </Link>
        </p>
      </form>
    </div>
  );
}
