import React from "react";

interface TimelineGridProps {
    duration: number; // Total duration in seconds
    zoom: number;
}

export const TimelineGrid = ({ duration, zoom }: TimelineGridProps) => {
    const pixelsPerSecond = 50 * zoom;
    const totalWidth = duration * pixelsPerSecond;
    const ticks = Math.ceil(duration);

    return (
        <div className="absolute inset-0 pointer-events-none" style={{ width: totalWidth }}>
            {Array.from({ length: ticks + 1 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute top-0 bottom-0 border-l border-white/5"
                    style={{ left: i * pixelsPerSecond }}
                >
                    <span className="absolute top-0 left-1 text-[10px] text-white/20">
                        {new Date(i * 1000).toISOString().substr(14, 5)}
                    </span>
                </div>
            ))}
        </div>
    );
};
