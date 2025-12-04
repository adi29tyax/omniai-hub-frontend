import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, MoreHorizontal, Eye } from "lucide-react";
import ScenePreviewModal from "./ScenePreviewModal";

interface SceneCardProps {
    scene: any;
    onClick?: () => void;
}

export default function SceneCard({ scene, onClick }: SceneCardProps) {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <>
            <motion.div
                whileHover={{ y: -2 }}
                className="group relative bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors"
            >
                <div className="p-5" onClick={onClick}>
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors">
                            {scene.title || "Untitled Scene"}
                        </h3>
                        <button className="text-white/20 hover:text-white transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                    <p className="text-white/60 text-sm line-clamp-2 mb-4 h-10">
                        {scene.description || "No description provided."}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-white/40">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            <span>{scene.location || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span>{scene.time_of_day || "Anytime"}</span>
                        </div>
                    </div>
                </div>

                {/* Right-side Preview Panel (Visible on Hover) */}
                <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPreview(true);
                        }}
                        className="p-2 rounded-full bg-white/10 hover:bg-purple-600 text-white transition-all transform translate-x-4 group-hover:translate-x-0"
                    >
                        <Eye size={18} />
                    </button>
                </div>
            </motion.div>

            <ScenePreviewModal
                scene={scene}
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
            />
        </>
    );
}
