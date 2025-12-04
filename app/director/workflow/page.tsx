"use client";

import { useState } from "react";
import Link from "next/link";

export default function DirectorWorkflowPage() {
    const [step, setStep] = useState(1);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            ← Back
                        </Link>
                        <h1 className="text-xl font-bold">Director Workflow</h1>
                    </div>
                </div>
            </header>
            <main className="flex flex-1">
                <aside className="w-64 border-r bg-muted/10 p-4">
                    <nav className="space-y-2">
                        {["Story", "Scenes", "Shots", "Keyframes", "Animation", "Timeline", "Render"].map((item, index) => (
                            <button
                                key={item}
                                onClick={() => setStep(index + 1)}
                                className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${step === index + 1
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {index + 1}. {item}
                            </button>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1 p-6">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold">
                            {step === 1 && "Story Generation"}
                            {step === 2 && "Scene Breakdown"}
                            {step === 3 && "Shot Management"}
                            {step === 4 && "Keyframe Generation"}
                            {step === 5 && "Animation"}
                            {step === 6 && "Timeline Assembly"}
                            {step === 7 && "Rendering"}
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Workflow step {step} content goes here.
                        </p>
                        {/* Placeholder for actual workflow components */}
                        <div className="mt-8 flex h-64 items-center justify-center rounded-md border border-dashed">
                            <span className="text-muted-foreground">Component Placeholder</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
