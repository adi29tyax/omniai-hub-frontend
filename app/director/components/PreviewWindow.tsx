import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface PreviewWindowProps {
    videoUrl?: string;
    audioUrl?: string;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    onPlayPause: () => void;
    onSeek: (time: number) => void;
}

export default function PreviewWindow({
    videoUrl,
    audioUrl,
    isPlaying,
    currentTime,
    duration,
    onPlayPause,
    onSeek
}: PreviewWindowProps) {
    return (
        <div className="w-full aspect-video bg-black rounded-lg border border-white/10 relative overflow-hidden group">
            {videoUrl ? (
                <video
                    src={videoUrl}
                    className="w-full h-full object-contain"
                // Note: In a real implementation, we'd control this video element via refs based on isPlaying/currentTime props
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                    <div className="text-center">
                        <div className="text-4xl mb-2">📺</div>
                        <div>No Video Preview</div>
                    </div>
                </div>
            )}

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                    <button onClick={onPlayPause} className="text-white hover:text-purple-400 transition-colors">
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    </button>

                    <div className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer relative group/seek">
                        <div
                            className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/seek:opacity-100 transition-opacity"
                            style={{ left: `${(currentTime / duration) * 100}%` }}
                        />
                    </div>

                    <div className="text-white/60 font-mono text-xs">
                        {new Date(currentTime * 1000).toISOString().substr(14, 5)} / {new Date(duration * 1000).toISOString().substr(14, 5)}
                    </div>
                </div>
            </div>
        </div>
    );
}
