"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("omni_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">OmniAI Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("omni_token");
              router.push("/login");
            }}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/director/workflow"
            className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h3 className="text-lg font-semibold group-hover:text-primary">Director Workflow</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create and manage your AI video generation workflows.
            </p>
          </Link>
          {/* Add more dashboard items here */}
        </div>
      </main>
    </div>
  );
}
