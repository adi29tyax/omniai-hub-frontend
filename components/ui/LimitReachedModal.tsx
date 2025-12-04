"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Zap } from "lucide-react";
import { GlassCard } from "./GlassCard";
import Link from "next/link";

interface LimitReachedModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

export default function LimitReachedModal({ isOpen, onClose, message }: LimitReachedModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-md"
                    >
                        <GlassCard className="p-8 text-center border-amber-500/30">
                            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock size={32} className="text-amber-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Limit Reached</h2>
                            <p className="text-white/60 mb-8">{message || "You have reached the limits of your current plan. Upgrade to continue creating."}</p>

                            <div className="space-y-3">
                                <Link href="/pricing" className="block w-full py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 transition-colors text-white font-bold flex items-center justify-center gap-2">
                                    <Zap size={18} fill="currentColor" /> Upgrade to Pro
                                </Link>
                                <button onClick={onClose} className="block w-full py-3 rounded-lg text-white/40 hover:text-white transition-colors text-sm">
                                    Maybe Later
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
