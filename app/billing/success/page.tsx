"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <GlassCard className="max-w-md w-full text-center p-8 border-green-500/30">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
                <p className="text-white/60 mb-8">Thank you for upgrading. Your account has been updated with new limits.</p>
                <Link href="/dashboard" className="block w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-medium">
                    Return to Dashboard
                </Link>
            </GlassCard>
        </div>
    );
}
