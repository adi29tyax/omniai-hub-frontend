"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Activity, Database, Film, Zap } from "lucide-react";
import api from "@/services/api";

export default function UsagePage() {
    const [usage, setUsage] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetching usage data
        // In real app: api.get('/billing/usage')
        setTimeout(() => {
            setUsage({
                role: "free",
                episodes_generated: 1,
                episodes_limit: 1,
                ai_calls: 15,
                ai_calls_limit: 20,
                storage_used: 45,
                storage_limit: 150
            });
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <div className="p-8 text-white">Loading usage stats...</div>;

    const getProgressColor = (current: number, max: number) => {
        const percentage = (current / max) * 100;
        if (percentage >= 90) return "bg-red-500";
        if (percentage >= 70) return "bg-amber-500";
        return "bg-green-500";
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <SectionHeader title="Usage & Limits" subtitle={`Current Plan: ${usage.role.toUpperCase()}`} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {/* Episodes */}
                <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center gap-2"><Film size={18} className="text-purple-400" /> Episodes</h3>
                        <span className="text-sm text-white/60">{usage.episodes_generated} / {usage.episodes_limit}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${getProgressColor(usage.episodes_generated, usage.episodes_limit)}`}
                            style={{ width: `${Math.min(100, (usage.episodes_generated / usage.episodes_limit) * 100)}%` }}
                        />
                    </div>
                </GlassCard>

                {/* AI Calls */}
                <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center gap-2"><Zap size={18} className="text-amber-400" /> AI Assistant Calls</h3>
                        <span className="text-sm text-white/60">{usage.ai_calls} / {usage.ai_calls_limit}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${getProgressColor(usage.ai_calls, usage.ai_calls_limit)}`}
                            style={{ width: `${Math.min(100, (usage.ai_calls / usage.ai_calls_limit) * 100)}%` }}
                        />
                    </div>
                </GlassCard>

                {/* Storage */}
                <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center gap-2"><Database size={18} className="text-blue-400" /> Storage (MB)</h3>
                        <span className="text-sm text-white/60">{usage.storage_used} / {usage.storage_limit}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${getProgressColor(usage.storage_used, usage.storage_limit)}`}
                            style={{ width: `${Math.min(100, (usage.storage_used / usage.storage_limit) * 100)}%` }}
                        />
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
