import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Film } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface ScenePreviewModalProps {
    scene: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function ScenePreviewModal({ scene, isOpen, onClose }: ScenePreviewModalProps) {
    if (!scene) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GlassCard className="relative flex flex-col gap-6">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">{scene.title || "Untitled Scene"}</h2>
                                <div className="flex items-center gap-4 text-white/60 text-sm">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        <span>{scene.location || "Unknown Location"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{scene.time_of_day || "Anytime"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Film size={14} />
                                        <span>{scene.shots?.length || 0} Shots</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
                                <p className="text-white/80 leading-relaxed">{scene.description || "No description available."}</p>
                            </div>

                            {scene.shots && scene.shots.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Shots Preview</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {scene.shots.map((shot: any, idx: number) => (
                                            <div key={idx} className="aspect-video bg-black/40 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group">
                                                {shot.thumbnail_url ? (
                                                    <img src={shot.thumbnail_url} alt={`Shot ${idx + 1}`} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-white/20 text-xs">No Preview</div>
                                                )}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-sm font-medium">Shot {idx + 1}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </GlassCard>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
