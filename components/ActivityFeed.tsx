"use client";

import { useEffect, useState } from "react";
import { Bell, Activity, Brain, MessageSquare, Rocket } from "lucide-react";

interface ActivityItem {
  id: number;
  type: "model" | "chat" | "project" | "system";
  title: string;
  time: string;
  description: string;
}

const initialFeed: ActivityItem[] = [
  {
    id: 1,
    type: "model",
    title: "Model AetherNet fine-tuned",
    time: "2 mins ago",
    description: "New weights uploaded and validated successfully.",
  },
  {
    id: 2,
    type: "chat",
    title: "User chat session ended",
    time: "10 mins ago",
    description: "Conversation summary stored in OmniAI memory module.",
  },
  {
    id: 3,
    type: "project",
    title: "OmniHub deployment completed",
    time: "30 mins ago",
    description: "Frontend build synced with Render production server.",
  },
  {
    id: 4,
    type: "system",
    title: "Core metrics stabilized",
    time: "1 hr ago",
    description: "All nodes in cluster are now running at optimal latency.",
  },
];

export default function ActivityFeed({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const [feed, setFeed] = useState<ActivityItem[]>(initialFeed);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Mock future event updates every 15s
    const interval = setInterval(() => {
      const newItem: ActivityItem = {
        id: Date.now(),
        type: "system",
        title: "Heartbeat check",
        time: "just now",
        description: "System ping returned stable response.",
      };

      setFeed((prev) => [newItem, ...prev.slice(0, 4)]);
      setPulse(true);
      setTimeout(() => setPulse(false), 1500); // make bell pulse briefly
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "model":
        return <Brain size={18} className="text-cyan-400" />;
      case "chat":
        return <MessageSquare size={18} className="text-purple-400" />;
      case "project":
        return <Rocket size={18} className="text-pink-400" />;
      default:
        return <Activity size={18} className="text-green-400" />;
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white/5 backdrop-blur-lg border-l border-white/10 
      transition-transform duration-500 ease-smooth shadow-[0_0_20px_rgba(0,255,255,0.1)] 
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Bell
            className={`${
              pulse ? "animate-ping text-cyan-300" : "text-cyan-300"
            }`}
            size={18}
          />
          <h3 className="text-sm font-semibold text-gray-200">
            AI Activity Feed
          </h3>
        </div>
        <button
          className="text-gray-400 hover:text-gray-200"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* Feed list */}
      <div className="overflow-y-auto h-[calc(100%-3rem)] p-4 space-y-3">
        {feed.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10"
          >
            <div className="flex items-center gap-2 mb-1">
              {getIcon(item.type)}
              <h4 className="text-sm font-semibold text-cyan-200">
                {item.title}
              </h4>
            </div>
            <p className="text-xs text-gray-400 mb-1">{item.description}</p>
            <p className="text-[10px] text-gray-500">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
