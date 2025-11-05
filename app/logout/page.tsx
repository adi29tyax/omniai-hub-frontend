"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("access_token");
    router.push("/login");
  }, [router]);

  return <p className="text-center p-8 text-white">Logging out...</p>;
}
