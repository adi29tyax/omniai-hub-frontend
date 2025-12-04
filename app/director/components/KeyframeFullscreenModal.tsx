import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Maximize, Info } from "lucide-react";

interface KeyframeFullscreenModalProps {
    imageUrl: string;
    metadata?: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function KeyframeFullscreenModal({ imageUrl, metadata, isOpen, onClose }: KeyframeFullscreenModalProps) {
    const [scale, setScale] = useState(1);
    const [showInfo, setShowInfo] = useState(true);

    if (!imageUrl) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black flex flex-col"
                >
                    {/* Toolbar */}
                    <div className="h-16 bg-black/50 backdrop-blur absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 border-b border-white/10">
                        <div className="text-white font-medium">Keyframe Viewer</div>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setScale(Math.max(0.5, scale - 0.2))} className="p-2 text-white/60 hover:text-white transition-colors">
                                <ZoomOut size={20} />
                            </button>
                            <span className="text-white/40 text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
                            <button onClick={() => setScale(Math.min(3, scale + 0.2))} className="p-2 text-white/60 hover:text-white transition-colors">
                                <ZoomIn size={20} />
                            </button>
                            <div className="w-px h-6 bg-white/10 mx-2" />
                            <button onClick={() => setShowInfo(!showInfo)} className={`p-2 transition-colors ${showInfo ? "text-purple-400" : "text-white/60 hover:text-white"}`}>
                                <Info size={20} />
                            </button>
                            <button onClick={onClose} className="p-2 text-white/60 hover:text-red-400 transition-colors ml-2">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Main View */}
                    <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                        <motion.div
                            drag
                            dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                            style={{ scale }}
                            className="cursor-grab active:cursor-grabbing"
                        >
                            <img src={imageUrl} alt="Full Keyframe" className="max-w-none shadow-2xl" style={{ maxHeight: '80vh' }} />
                        </motion.div>

                        {/* Metadata Overlay */}
                        <AnimatePresence>
                            {showInfo && metadata && (
                                <motion.div
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 300, opacity: 0 }}
                                    className="absolute top-20 right-6 w-80 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl"
                                >
                                    <h3 className="text-white font-semibold mb-4 border-b border-white/10 pb-2">Image Details</h3>
                                    <div className="space-y-4">
                                        {Object.entries(metadata).map(([key, value]: [string, any]) => (
                                            <div key={key}>
                                                <label className="text-xs text-white/40 uppercase tracking-wider block mb-1">{key.replace(/_/g, " ")}</label>
                                                <div className="text-white text-sm break-words">{String(value)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
