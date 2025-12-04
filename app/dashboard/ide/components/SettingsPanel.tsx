import React from 'react';

interface SettingsPanelProps {
    mode: 'generate' | 'debug' | 'explain' | 'run';
    setMode: (mode: 'generate' | 'debug' | 'explain' | 'run') => void;
    language: string;
    setLanguage: (lang: string) => void;
    onExecute: () => void;
    loading: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
    mode,
    setMode,
    language,
    setLanguage,
    onExecute,
    loading,
}) => {
    return (
        <div className="flex items-center justify-between bg-[#111111] border border-[#2A2A2A] rounded-lg p-4 mb-4">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#E4E4E4]">Mode:</span>
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value as any)}
                        className="bg-[#1A1A1A] text-[#E4E4E4] border border-[#2A2A2A] rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="generate">Generate</option>
                        <option value="debug">Debug</option>
                        <option value="explain">Explain</option>
                        <option value="run">Run</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#E4E4E4]">Language:</span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-[#1A1A1A] text-[#E4E4E4] border border-[#2A2A2A] rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="go">Go</option>
                    </select>
                </div>
            </div>

            <button
                onClick={onExecute}
                disabled={loading}
                className={`px-6 py-2 rounded text-sm font-medium transition-colors ${loading
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
            >
                {loading ? 'Processing...' : mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
        </div>
    );
};

export default SettingsPanel;
