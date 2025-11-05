// 🔹 FILE: app/register/page.tsx

"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8000/auth/register", {
        email,
        password,
      });
      router.push("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="light h-screen flex justify-center items-center">
      <div className="card w-[350px] shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Create Account ✨</h2>

        <input
          placeholder="Email"
          className="mb-3"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          className="mb-4"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Sign Up</button>

        <p className="text-sm text-center mt-4">
          Already have an account? <Link href="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
