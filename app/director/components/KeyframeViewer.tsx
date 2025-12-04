import React, { useState } from "react";
import { Maximize, Download } from "lucide-react";

interface KeyframeViewerProps {
    imageUrl?: string;
    metadata?: { width: number; height: number };
}

export const KeyframeViewer = ({ imageUrl, metadata }: KeyframeViewerProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    if (!imageUrl) {
        return (
            <div className="w-full aspect-video bg-black/20 rounded-lg border border-white/10 flex items-center justify-center text-white/20 text-sm">
                No Keyframe Generated
            </div>
        );
    }

    return (
        <>
            <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-black">
                <img src={imageUrl} alt="Keyframe" className="w-full h-auto object-contain" />

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                        onClick={() => setIsFullscreen(true)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors tooltip"
                        title="Fullscreen"
                    >
                        <Maximize size={20} />
                    </button>
                    <a
                        href={imageUrl}
                        download="keyframe.png"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Download"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Download size={20} />
                    </a>
                </div>

                {/* Metadata Badge */}
                {metadata && (
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white/60 border border-white/5">
                        {metadata.width}x{metadata.height}
                    </div>
                )}
            </div>

            {/* Simple Fullscreen Modal Placeholder */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setIsFullscreen(false)}
                >
                    <img src={imageUrl} alt="Fullscreen" className="max-w-full max-h-full object-contain" />
                </div>
            )}
        </>
    );
};
