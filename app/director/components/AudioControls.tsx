import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

interface AudioControlsProps {
    src: string;
    title?: string;
}

export const AudioControls = ({ src, title }: AudioControlsProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = pos * audioRef.current.duration;
        }
    };

    return (
        <div className="bg-[#111] rounded-lg border border-white/10 p-3 flex items-center gap-3">
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0"
            >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
            </button>

            <div className="flex-1 min-w-0">
                {title && <div className="text-xs text-white/60 mb-1 truncate">{title}</div>}

                {/* Waveform / Progress Bar */}
                <div
                    className="h-6 bg-black/40 rounded flex items-center px-1 gap-0.5 cursor-pointer relative overflow-hidden"
                    onClick={handleSeek}
                >
                    {/* Fake Waveform Bars */}
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-white/20 rounded-full"
                            style={{ height: `${Math.random() * 80 + 20}%` }}
                        />
                    ))}

                    {/* Progress Overlay */}
                    <div
                        className="absolute top-0 left-0 bottom-0 bg-purple-500/30 pointer-events-none transition-all duration-100"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="text-[10px] text-white/40 font-mono w-16 text-right">
                {new Date((audioRef.current?.currentTime || 0) * 1000).toISOString().substr(14, 5)}
            </div>
        </div>
    );
};
