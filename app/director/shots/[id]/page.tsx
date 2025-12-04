"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic imports
const SectionHeader = dynamic(() => import("@/components/ui/SectionHeader").then(mod => mod.SectionHeader), { ssr: false });
const GlassCard = dynamic(() => import("@/components/ui/GlassCard").then(mod => mod.GlassCard), { ssr: false });
const ShotAssistant = dynamic(() => import("@/app/assistant/panels/ShotAssistant"), { ssr: false });
const LoadingSkeleton = dynamic(() => import("@/components/ui/LoadingSkeleton").then(mod => mod.LoadingSkeleton), { ssr: false });

export default function ShotPage({ params }: { params: { id: string } }) {
    const [shot, setShot] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/shots/${params.id}`)
            .then((res) => res.json())
            .then(setShot)
            .catch(err => console.error("Failed to load shot", err));
    }, [params.id]);

    if (!shot) {
        return (
            <div className="space-y-6">
                <SectionHeader title="Loading Shot..." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <LoadingSkeleton className="h-96 col-span-2" />
                    <LoadingSkeleton className="h-96" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SectionHeader
                title={`Shot: ${shot.shot_id || 'Untitled'}`}
                subtitle={shot.id}
                action={
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-medium text-sm">
                        Regenerate
                    </button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                    <h3 className="text-lg font-semibold text-white mb-4">Prompt</h3>
                    <p className="text-white/70 font-mono text-sm bg-black/20 p-4 rounded-lg border border-white/5">
                        {shot.prompt || "No prompt available."}
                    </p>
                </GlassCard>

                <GlassCard>
                    <h3 className="text-lg font-semibold text-white mb-4">Camera & Action</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-white/40 uppercase tracking-wider">Camera</label>
                            <div className="text-white">{shot.camera || "Static"}</div>
                        </div>
                        <div>
                            <label className="text-xs text-white/40 uppercase tracking-wider">Action</label>
                            <div className="text-white">{shot.action || "None"}</div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <div className="mt-6">
                <ShotAssistant shot={shot} />
            </div>
        </div>
    );
}
