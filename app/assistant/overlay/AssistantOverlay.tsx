"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Sparkles, Search, X, Zap } from "lucide-react";

const AssistantPanel = dynamic(() => import("../components/AssistantPanel"), {
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center text-white/40">Loading Assistant...</div>
});

const GLOBAL_COMMANDS = [
    { id: '1', text: "Improve Scene Summary", icon: Sparkles },
    { id: '2', text: "Generate Next Shot", icon: Zap },
    { id: '3', text: "Improve Prompt Tone", icon: Sparkles },
    { id: '4', text: "Suggest Camera Movement", icon: Zap },
    { id: '5', text: "Suggest Animation Fixes", icon: Sparkles },
    { id: '6', text: "Suggest BGM", icon: Zap },
    { id: '7', text: "Suggest SFX", icon: Zap },
    { id: '8', text: "Fix Timeline Flow", icon: Sparkles },
];

export default function AssistantOverlay() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    // HOTKEY LISTENER (SSR SAFE)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handler = (e: KeyboardEvent) => {
            const mod = e.metaKey || e.ctrlKey;
            if (mod && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const filteredCommands = GLOBAL_COMMANDS.filter(c =>
        c.text.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-start justify-center pt-[15vh]"
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-[700px] max-w-[90vw] rounded-xl bg-[#111] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header / Search Bar */}
                        <div className="flex items-center px-4 py-3 border-b border-white/10 gap-3">
                            <Sparkles className="text-purple-400" size={20} />
                            <input
                                type="text"
                                placeholder="Ask OmniAI to generate scenes, edit clips, or find assets..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-lg"
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 rounded bg-white/10 text-xs text-white/40 font-mono">ESC</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="max-h-[60vh] overflow-y-auto p-0">
                            {query ? (
                                <div className="p-2">
                                    {filteredCommands.map(cmd => (
                                        <button
                                            key={cmd.id}
                                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                                        >
                                            <cmd.icon size={16} className="text-purple-400" />
                                            {cmd.text}
                                        </button>
                                    ))}
                                    {filteredCommands.length === 0 && (
                                        <div className="p-4 text-center text-white/40">No commands found.</div>
                                    )}
                                </div>
                            ) : (
                                <AssistantPanel isOpen={true} title="OmniAI Assistant" onClose={() => setOpen(false)}>
                                    <div className="p-4 text-white/60 text-center">
                                        How can I help you today?
                                    </div>
                                </AssistantPanel>
                            )}
                        </div>

                        {/* Footer Suggestions */}
                        <div className="bg-white/5 px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto">
                            {["Generate a sci-fi scene", "Add explosion SFX", "Export timeline"].map((s) => (
                                <button key={s} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-colors whitespace-nowrap">
                                    {s}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
