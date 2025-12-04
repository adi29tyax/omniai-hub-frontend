import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Repeat } from "lucide-react";

interface VideoPlayerProps {
    src: string;
    poster?: string;
}

export const VideoPlayer = ({ src, poster }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isLooping, setIsLooping] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.play();
            else videoRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
        }
    };

    return (
        <div className="relative group bg-black rounded-lg overflow-hidden border border-white/10">
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                loop={isLooping}
                muted={isMuted}
                className="w-full h-auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={() => setIsPlaying(!isPlaying)}
            />

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Progress Bar */}
                <div
                    className="h-1 bg-white/20 rounded-full mb-3 cursor-pointer relative group/seek"
                    onClick={handleSeek}
                >
                    <div className="absolute top-0 left-0 h-full bg-purple-500 rounded-full" style={{ width: `${progress}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow opacity-0 group-hover/seek:opacity-100 transition-opacity" style={{ left: `${progress}%` }} />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-purple-400">
                            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                        </button>

                        <div className="flex items-center gap-1 group/vol">
                            <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-white/80">
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                        </div>

                        <span className="text-xs text-white/60 font-mono">
                            {new Date((videoRef.current?.currentTime || 0) * 1000).toISOString().substr(14, 5)} /
                            {new Date(duration * 1000).toISOString().substr(14, 5)}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPlaybackRate(playbackRate === 1 ? 2 : playbackRate === 2 ? 0.5 : 1)}
                            className="text-xs font-bold text-white/60 hover:text-white w-8"
                        >
                            {playbackRate}x
                        </button>
                        <button
                            onClick={() => setIsLooping(!isLooping)}
                            className={`transition-colors ${isLooping ? "text-purple-400" : "text-white/60 hover:text-white"}`}
                        >
                            <Repeat size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
