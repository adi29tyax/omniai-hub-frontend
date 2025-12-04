import React from "react";
import { motion } from "framer-motion";

interface TimelineClipProps {
    id: string;
    title: string;
    duration: number;
    start: number;
    color?: string;
    onDragEnd?: (id: string, newStart: number) => void;
    zoom: number;
}

export const TimelineClip = ({ id, title, duration, start, color = "bg-purple-600", onDragEnd, zoom }: TimelineClipProps) => {
    const width = duration * 50 * zoom; // 50px per second base
    const left = start * 50 * zoom;

    return (
        <motion.div
            drag="x"
            dragMomentum={false}
            onDragEnd={(e, info) => {
                if (onDragEnd) {
                    const delta = info.offset.x / (50 * zoom);
                    onDragEnd(id, Math.max(0, start + delta));
                }
            }}
            className={`absolute top-1 h-10 rounded-md ${color} border border-white/20 shadow-sm flex items-center px-2 overflow-hidden cursor-grab active:cursor-grabbing`}
            style={{ width, left }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
        >
            <span className="text-xs font-medium text-white truncate">{title}</span>
        </motion.div>
    );
};
