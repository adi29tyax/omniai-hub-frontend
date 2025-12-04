import React, { useState } from "react";
import { ZoomIn, ZoomOut, Settings, Layers } from "lucide-react";
import PreviewWindow from "./PreviewWindow";
import { TimelineGrid } from "@/components/timeline/TimelineGrid";
import { TimelineClip } from "@/components/timeline/TimelineClip";

interface TimelineEditorProps {
    initialClips?: any[];
}

export default function TimelineEditor({ initialClips = [] }: TimelineEditorProps) {
    const [zoom, setZoom] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [clips, setClips] = useState(initialClips);

    // Mock duration
    const totalDuration = 300; // 5 minutes

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (time: number) => {
        setCurrentTime(Math.max(0, Math.min(time, totalDuration)));
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a]">
            {/* Top Section: Preview & Tools */}
            <div className="h-1/2 min-h-[300px] border-b border-white/10 flex">
                {/* Preview Window */}
                <div className="flex-1 p-4 flex items-center justify-center bg-black">
                    <div className="w-full max-w-3xl">
                        <PreviewWindow
                            isPlaying={isPlaying}
                            currentTime={currentTime}
                            duration={totalDuration}
                            onPlayPause={handlePlayPause}
                            onSeek={handleSeek}
                        />
                    </div>
                </div>

                {/* Right Panel (Properties/Settings) - Placeholder */}
                <div className="w-80 border-l border-white/10 bg-[#111] p-4">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Settings size={16} /> Properties
                    </h3>
                    <div className="text-white/40 text-sm">Select a clip to view properties.</div>
                </div>
            </div>

            {/* Bottom Section: Timeline */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Toolbar */}
                <div className="h-10 border-b border-white/10 bg-[#111] flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white">
                            <Layers size={16} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-1.5 rounded hover:bg-white/10 text-white/60">
                            <ZoomOut size={16} />
                        </button>
                        <span className="text-xs text-white/40 w-12 text-center">{Math.round(zoom * 100)}%</span>
                        <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="p-1.5 rounded hover:bg-white/10 text-white/60">
                            <ZoomIn size={16} />
                        </button>
                    </div>
                </div>

                {/* Tracks Area */}
                <div className="flex-1 overflow-auto relative bg-[#0a0a0a]">
                    <div className="min-w-full h-full relative" style={{ width: `${totalDuration * 50 * zoom}px` }}>
                        {/* Grid & Ruler */}
                        <div className="h-8 border-b border-white/10 sticky top-0 bg-[#0a0a0a] z-10">
                            <TimelineGrid duration={totalDuration} zoom={zoom} />
                        </div>

                        {/* Playhead */}
                        <div
                            className="absolute top-0 bottom-0 w-px bg-red-500 z-50 pointer-events-none"
                            style={{ left: currentTime * 50 * zoom }}
                        >
                            <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 transform rotate-45" />
                        </div>

                        {/* Tracks */}
                        <div className="p-2 space-y-2">
                            {/* Video Track */}
                            <div className="relative h-16 bg-white/5 rounded-lg border border-white/5">
                                {clips.map((clip, idx) => (
                                    <TimelineClip
                                        key={clip.id || idx}
                                        {...clip}
                                        zoom={zoom}
                                    />
                                ))}
                            </div>

                            {/* Audio Track */}
                            <div className="relative h-16 bg-white/5 rounded-lg border border-white/5">
                                {/* Audio clips placeholder */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
