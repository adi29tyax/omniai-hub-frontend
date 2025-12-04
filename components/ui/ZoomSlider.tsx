import React from "react";

interface ZoomSliderProps {
    zoom: number;
    setZoom: (zoom: number) => void;
    min?: number;
    max?: number;
}

export const ZoomSlider = ({ zoom, setZoom, min = 0.5, max = 3 }: ZoomSliderProps) => {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111] rounded-lg border border-white/5">
            <span className="text-xs text-white/40">Zoom</span>
            <input
                type="range"
                min={min}
                max={max}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <span className="text-xs text-white/60">{Math.round(zoom * 100)}%</span>
        </div>
    );
};
