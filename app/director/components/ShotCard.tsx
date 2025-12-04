import React, { useState } from "react";
import { motion } from "framer-motion";
import { Video, Image as ImageIcon, Eye } from "lucide-react";
import ShotPreviewModal from "./ShotPreviewModal";

interface ShotCardProps {
    shot: any;
    onClick?: () => void;
}

export default function ShotCard({ shot, onClick }: ShotCardProps) {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative bg-[#111] border border-white/10 rounded-lg overflow-hidden cursor-pointer"
                onClick={onClick}
            >
                {/* Thumbnail Area */}
                <div className="aspect-video bg-black/40 relative">
                    {shot.thumbnail_url ? (
                        <img src={shot.thumbnail_url} alt="Shot Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10">
                            <ImageIcon size={24} />
                        </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white/80 uppercase tracking-wider border border-white/5">
                        {shot.type || "Shot"}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPreview(true);
                            }}
                            className="p-2 rounded-full bg-white/10 hover:bg-purple-600 text-white transition-colors"
                        >
                            <Eye size={16} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-3">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium text-white truncate w-3/4">{shot.prompt || "Untitled Shot"}</span>
                        <span className="text-xs text-white/40 font-mono">{shot.duration}s</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-white/40">
                        <span className="bg-white/5 px-1.5 py-0.5 rounded">{shot.camera || "Static"}</span>
                    </div>
                </div>
            </motion.div>

            <ShotPreviewModal
                shot={shot}
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
            />
        </>
    );
}
