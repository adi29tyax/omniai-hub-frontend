"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  Boxes,
  Rocket,
  MessageSquare,
  Settings,
  LayoutDashboard,
  Bell,
} from "lucide-react";
import StatsGrid from "@/components/StatsGrid";
import RecentProjects from "@/components/RecentProjects";
import ActivityFeed from "@/components/ActivityFeed";

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const [mounted, setMounted] = useState(false);
  const [feedOpen, setFeedOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent hydration mismatch

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { id: "projects", label: "Projects", href: "/projects", icon: <Boxes size={18} /> },
    { id: "models", label: "AI Models", href: "/models", icon: <Bot size={18} /> },
    { id: "chat", label: "AI Chat", href: "/chat", icon: <MessageSquare size={18} /> },
    { id: "settings", label: "Settings", href: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <ProtectedRoute>
      <div className="dark min-h-screen flex text-white">
        {/* Sidebar */}
        <aside className="w-64 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col p-6">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl font-extrabold text-cyan-400">OmniAI</span>
            <span>⚡</span>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
                  ${
                    active === item.id
                      ? "bg-white/20 text-cyan-300"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <button
            className="mt-auto bg-red-600 p-2 rounded hover:bg-red-500"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10 relative">
          {/* Stars background */}
          <div className="stars"></div>
          <div className="stars"></div>
          <div className="stars"></div>

          {/* Header */}
          <header className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-300 flex items-center gap-2">
              Welcome Commander <Rocket size={22} />
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFeedOpen(!feedOpen)}
                className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition 
                  ${feedOpen ? "ring-2 ring-cyan-400" : ""}`}
                title="Toggle Activity Feed"
              >
                <Bell
                  size={20}
                  className={`transition ${feedOpen ? "text-cyan-300" : "text-gray-300"}`}
                />
              </button>
              <div className="glass px-4 py-2 rounded-xl text-sm text-gray-200">
                Universe status:{" "}
                <span className="text-cyan-300 font-semibold">Stable</span>
              </div>
            </div>
          </header>

          {/* Stats Section */}
          <StatsGrid />

          {/* Main cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            <div className="glass-card hover-card">
              <h3 className="card-title text-cyan-400 flex items-center gap-2">
                <Bot size={18} /> AI Tools
              </h3>
              <p className="card-text">Explore intelligence modules.</p>
              <Link
                href="/models"
                className="inline-block mt-4 text-sm text-cyan-300 hover:underline"
              >
                Open tools →
              </Link>
            </div>

            <div className="glass-card hover-card">
              <h3 className="card-title text-purple-400 flex items-center gap-2">
                <Boxes size={18} /> Projects
              </h3>
              <p className="card-text">Manage intelligence creations.</p>
              <Link
                href="/projects"
                className="inline-block mt-4 text-sm text-purple-300 hover:underline"
              >
                View projects →
              </Link>
            </div>

            <div className="glass-card hover-card">
              <h3 className="card-title text-cyan-300">Quick Actions</h3>
              <p className="card-text">Launch experiments instantly.</p>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/projects/new"
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-sm"
                >
                  New Project
                </Link>
                <Link
                  href="/chat"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm"
                >
                  Open Chat
                </Link>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <RecentProjects />
        </main>

        {/* Activity Feed */}
        <ActivityFeed open={feedOpen} setOpen={setFeedOpen} />
      </div>
    </ProtectedRoute>
  );
}
