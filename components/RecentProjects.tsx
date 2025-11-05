"use client";

import Link from "next/link";
import { Folder, Clock } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Neural Vision",
    desc: "AI model for object detection and classification.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "AetherVoice Studio",
    desc: "Offline TTS and voice cloning suite.",
    date: "5 days ago",
  },
  {
    id: 3,
    name: "OmniHub Analytics",
    desc: "Multi-tenant AI SaaS dashboard for performance insights.",
    date: "1 week ago",
  },
];

export default function RecentProjects() {
  return (
    <section className="fade-up mt-10">
      <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
        <Folder size={20} /> Recent Projects
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass p-5 rounded-xl transition-transform hover:scale-[1.03] duration-300"
          >
            <h4 className="text-lg font-bold text-cyan-300 mb-1">{project.name}</h4>
            <p className="text-gray-300 text-sm mb-3">{project.desc}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock size={14} /> {project.date}
              </span>
              <Link
                href={`/projects/${project.id}`}
                className="text-purple-400 hover:text-purple-300 transition"
              >
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
