"use client";

import React from "react";
import { XCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

export default function FailurePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <GlassCard className="max-w-md w-full text-center p-8 border-red-500/30">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle size={40} className="text-red-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Payment Failed</h1>
                <p className="text-white/60 mb-8">Something went wrong with your transaction. Please try again or contact support.</p>
                <div className="space-y-3">
                    <Link href="/pricing" className="block w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-medium">
                        Try Again
                    </Link>
                    <Link href="/dashboard" className="block w-full py-3 rounded-lg text-white/40 hover:text-white transition-colors text-sm">
                        Return to Dashboard
                    </Link>
                </div>
            </GlassCard>
        </div>
    );
}
