"use client";

import React, { useState } from "react";
import { Save, Download, Play, Pause } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components
const TimelineGrid = dynamic(() => import("../../../components/timeline/TimelineGrid").then(mod => mod.TimelineGrid), { ssr: false });
const TimelineClip = dynamic(() => import("../../../components/timeline/TimelineClip").then(mod => mod.TimelineClip), { ssr: false });
const SectionHeader = dynamic(() => import("../../../components/ui/SectionHeader").then(mod => mod.SectionHeader), { ssr: false });
const ZoomSlider = dynamic(() => import("../../../components/ui/ZoomSlider").then(mod => mod.ZoomSlider), { ssr: false });

export default function TimelinePage() {
    const [zoom, setZoom] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    // Mock data for demo
    const [clips, setClips] = useState([
        { id: "1", title: "Scene 1 - Shot 1", start: 0, duration: 5, color: "bg-blue-600" },
        { id: "2", title: "Scene 1 - Shot 2", start: 5, duration: 3, color: "bg-purple-600" },
        { id: "3", title: "Scene 2 - Shot 1", start: 8, duration: 4, color: "bg-emerald-600" },
    ]);

    const handleDragEnd = (id: string, newStart: number) => {
        setClips(clips.map(c => c.id === id ? { ...c, start: newStart } : c));
    };

    return (
        <div className="h-full flex flex-col">
            <SectionHeader
                title="Timeline Editor"
                subtitle="Assemble your episode"
                action={
                    <div className="flex items-center gap-3">
                        <ZoomSlider zoom={zoom} setZoom={setZoom} />
                        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                            <Save size={18} />
                        </button>
                        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors flex items-center gap-2 font-medium text-sm">
                            <Download size={16} /> Export
                        </button>
                    </div>
                }
            />

            {/* Timeline Controls */}
            <div className="bg-[#111] border-b border-white/10 p-2 flex items-center justify-center gap-4">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                <div className="text-white/60 font-mono text-sm">
                    {new Date(currentTime * 1000).toISOString().substr(14, 5)} / 00:05:00
                </div>
            </div>

            {/* Timeline Area */}
            <div className="flex-1 bg-[#0a0a0a] relative overflow-hidden flex flex-col">
                {/* Time Ruler */}
                <div className="h-8 bg-[#111] border-b border-white/5 relative overflow-hidden">
                    <TimelineGrid duration={300} zoom={zoom} />
                </div>

                {/* Tracks Area */}
                <div className="flex-1 overflow-auto relative p-4 space-y-2">
                    <TimelineGrid duration={300} zoom={zoom} />

                    {/* Track 1 */}
                    <div className="relative h-12 bg-white/5 rounded-lg border border-white/5 w-full">
                        {clips.map(clip => (
                            <TimelineClip
                                key={clip.id}
                                {...clip}
                                zoom={zoom}
                                onDragEnd={handleDragEnd}
                            />
                        ))}
                    </div>

                    {/* Track 2 (Audio) */}
                    <div className="relative h-12 bg-white/5 rounded-lg border border-white/5 w-full mt-2">
                        {/* Audio clips would go here */}
                    </div>

                    {/* Scrubber */}
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-50 pointer-events-none"
                        style={{ left: currentTime * 50 * zoom + 16 }} // +16 for padding
                    />
                </div>
            </div>
        </div>
    );
}
