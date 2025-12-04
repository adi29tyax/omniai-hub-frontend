"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FileCode, Terminal, Settings, Play, Save, X } from "lucide-react";
import { LoadingSkeleton } from "../../../components/ui/LoadingSkeleton";

const FileExplorer = dynamic(() => import("./components/FileExplorer"), {
    ssr: false,
    loading: () => <div className="p-4"><LoadingSkeleton count={5} /></div>
});
const CodeEditor = dynamic(() => import("./components/CodeEditor"), {
    ssr: false,
    loading: () => <div className="h-full flex items-center justify-center text-white/20">Loading Editor...</div>
});
const OutputConsole = dynamic(() => import("./components/OutputConsole"), {
    ssr: false,
    loading: () => <div className="h-32 bg-black/50" />
});
const SettingsPanel = dynamic(() => import("./components/SettingsPanel"), {
    ssr: false
});

export default function IDEPage() {
    const [activeFile, setActiveFile] = useState<any>(null);
    const [tabs, setTabs] = useState<any[]>([]);

    // Console State
    const [output, setOutput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [executionError, setExecutionError] = useState<string | null>(null);

    // Settings State
    const [mode, setMode] = useState<'generate' | 'debug' | 'explain' | 'run'>('generate');
    const [language, setLanguage] = useState('python');

    const handleFileSelect = (file: any) => {
        setActiveFile(file);
        if (!tabs.find(t => t.id === file.id)) {
            setTabs([...tabs, file]);
        }
    };

    const handleCodeChange = (newCode: string) => {
        if (activeFile) {
            setActiveFile({ ...activeFile, content: newCode });
            // Update tabs if needed
        }
    };

    const handleSave = () => {
        // console.log("Saving file...", activeFile);
        // Implement save logic
    };

    const handleExecute = () => {
        setIsExecuting(true);
        setExecutionError(null);
        setOutput("Executing...");

        // Mock execution
        setTimeout(() => {
            setIsExecuting(false);
            setOutput("Execution complete.\nResult: Success");
        }, 2000);
    };

    const closeTab = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);
        if (activeFile?.id === id) {
            setActiveFile(newTabs[newTabs.length - 1] || null);
        }
    };

    return (
        <div className="h-screen grid grid-cols-[260px_1fr_300px] bg-[#0a0a0a] text-white overflow-hidden">
            {/* Sidebar */}
            <div className="border-r border-white/10 flex flex-col bg-[#111]">
                <div className="p-3 border-b border-white/10 flex items-center justify-between">
                    <span className="font-semibold text-sm text-white/80">Explorer</span>
                </div>
                <div className="flex-1 overflow-auto">
                    <FileExplorer
                        projectId="default-project"
                        onFileSelect={handleFileSelect}
                        activeFileId={activeFile?.id}
                    />
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex flex-col min-w-0 bg-[#0a0a0a]">
                {/* Tabs */}
                <div className="flex items-center bg-[#111] border-b border-white/10 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveFile(tab)}
                            className={`
                group flex items-center gap-2 px-3 py-2.5 text-sm border-r border-white/5 cursor-pointer min-w-[120px] max-w-[200px]
                ${activeFile?.id === tab.id ? "bg-[#0a0a0a] text-purple-400 border-t-2 border-t-purple-500" : "text-white/40 hover:bg-white/5 hover:text-white"}
              `}
                        >
                            <FileCode size={14} className={activeFile?.id === tab.id ? "text-purple-400" : "text-blue-400"} />
                            <span className="truncate flex-1">{tab.name}</span>
                            <button
                                onClick={(e) => closeTab(e, tab.id)}
                                className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="h-10 border-b border-white/10 flex items-center justify-end px-4 gap-2 bg-[#0a0a0a]">
                    <button onClick={handleSave} className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                        <Save size={16} />
                    </button>
                    <button onClick={handleExecute} className="p-1.5 rounded hover:bg-white/10 text-green-400 hover:text-green-300 transition-colors">
                        <Play size={16} />
                    </button>
                </div>

                {/* Editor */}
                <div className="flex-1 relative">
                    {activeFile ? (
                        <CodeEditor
                            code={activeFile.content || ""}
                            onChange={handleCodeChange}
                            onSave={handleSave}
                            filename={activeFile.name}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/20">
                            <div className="text-center">
                                <div className="mb-4 text-6xl opacity-20">⌘</div>
                                <p>Select a file to start editing</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Console */}
                <div className="h-48 border-t border-white/10 bg-[#111] flex flex-col">
                    <div className="px-4 py-1 border-b border-white/5 flex items-center gap-2">
                        <Terminal size={12} className="text-white/40" />
                        <span className="text-xs font-mono text-white/40">TERMINAL</span>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <OutputConsole
                            output={output}
                            loading={isExecuting}
                            error={executionError}
                        />
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="border-l border-white/10 bg-[#111] flex flex-col">
                <div className="p-3 border-b border-white/10">
                    <span className="font-semibold text-sm text-white/80">Settings</span>
                </div>
                <div className="flex-1 p-4">
                    <SettingsPanel
                        mode={mode}
                        setMode={setMode}
                        language={language}
                        setLanguage={setLanguage}
                        onExecute={handleExecute}
                        loading={isExecuting}
                    />
                </div>
            </div>
        </div>
    );
}
