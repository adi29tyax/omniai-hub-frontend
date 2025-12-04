"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic imports
const SectionHeader = dynamic(() => import("@/components/ui/SectionHeader").then(mod => mod.SectionHeader), { ssr: false });
const GlassCard = dynamic(() => import("@/components/ui/GlassCard").then(mod => mod.GlassCard), { ssr: false });
const SceneAssistant = dynamic(() => import("@/app/assistant/panels/SceneAssistant"), { ssr: false });
const LoadingSkeleton = dynamic(() => import("@/components/ui/LoadingSkeleton").then(mod => mod.LoadingSkeleton), { ssr: false });

export default function ScenePage({ params }: { params: { id: string } }) {
    const [scene, setScene] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/scenes/${params.id}`)
            .then((res) => res.json())
            .then(setScene)
            .catch(err => console.error("Failed to load scene", err));
    }, [params.id]);

    if (!scene) {
        return (
            <div className="space-y-6">
                <SectionHeader title="Loading Scene..." />
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
                title={`Scene: ${scene.title || 'Untitled'}`}
                subtitle={scene.id}
                action={
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-medium text-sm">
                        Generate Shots
                    </button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content / Preview */}
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard>
                        <h3 className="text-lg font-semibold text-white mb-4">Scene Context</h3>
                        <p className="text-white/70 leading-relaxed">{scene.description || "No description available."}</p>
                    </GlassCard>

                    <SceneAssistant scene={scene} />
                </div>

                {/* Sidebar / Assets */}
                <div className="space-y-6">
                    <GlassCard>
                        <h3 className="text-lg font-semibold text-white mb-4">Shots</h3>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                            {/* Placeholder for shots list */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-3 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors flex gap-3 items-center group">
                                    <div className="w-12 h-8 bg-black/40 rounded flex items-center justify-center text-xs text-white/20 group-hover:text-white/60">IMG</div>
                                    <div>
                                        <div className="text-sm font-medium text-white">Shot {i}</div>
                                        <div className="text-xs text-white/40">00:0{i * 2}:00</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
