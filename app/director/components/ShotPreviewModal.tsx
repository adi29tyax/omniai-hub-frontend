import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Video, Camera, Type } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface ShotPreviewModalProps {
    shot: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function ShotPreviewModal({ shot, isOpen, onClose }: ShotPreviewModalProps) {
    if (!shot) return null;

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
                        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GlassCard className="relative grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors border border-white/10"
                            >
                                <X size={20} />
                            </button>

                            {/* Left: Visual Preview */}
                            <div className="space-y-4">
                                <div className="aspect-video bg-black rounded-lg overflow-hidden border border-white/10 relative">
                                    {shot.video_url ? (
                                        <video
                                            src={shot.video_url}
                                            controls
                                            autoPlay
                                            loop
                                            className="w-full h-full object-cover"
                                        />
                                    ) : shot.image_url ? (
                                        <img
                                            src={shot.image_url}
                                            alt="Keyframe"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/20 flex-col gap-2">
                                            <Video size={48} />
                                            <span>No Visual Asset</span>
                                        </div>
                                    )}

                                    {/* Camera Overlay */}
                                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs text-white border border-white/10">
                                        {shot.camera || "Static Camera"}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Details */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Shot Details</h2>
                                    <p className="text-white/40 text-sm font-mono">{shot.id}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-2 text-purple-400 mb-2">
                                            <Type size={16} />
                                            <span className="text-sm font-semibold uppercase tracking-wider">Prompt</span>
                                        </div>
                                        <p className="text-white/80 text-sm leading-relaxed">
                                            {shot.prompt || "No prompt specified."}
                                        </p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                                            <Camera size={16} />
                                            <span className="text-sm font-semibold uppercase tracking-wider">Camera & Action</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-xs text-white/40 block mb-1">Movement</span>
                                                <span className="text-white text-sm">{shot.camera || "None"}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-white/40 block mb-1">Action</span>
                                                <span className="text-white text-sm">{shot.action || "None"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
