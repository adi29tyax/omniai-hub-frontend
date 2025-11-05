"use client";

import { Bot, Rocket, MessageSquare, Settings } from "lucide-react";

const stats = [
  { id: 1, label: "Active Models", value: 12, icon: <Bot size={22} />, color: "text-cyan-400" },
  { id: 2, label: "Projects Running", value: 5, icon: <Rocket size={22} />, color: "text-purple-400" },
  { id: 3, label: "Daily Chats", value: 87, icon: <MessageSquare size={22} />, color: "text-emerald-400" },
  { id: 4, label: "Modules Installed", value: 19, icon: <Settings size={22} />, color: "text-pink-400" },
];

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 fade-up">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="glass hover:scale-[1.03] transition-transform duration-300 p-5 rounded-xl text-center"
        >
          <div className={`flex justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
          <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
          <p className="text-sm text-gray-400">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
