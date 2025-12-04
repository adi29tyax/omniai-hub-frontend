import React from 'react';

interface OutputConsoleProps {
    output: string;
    loading: boolean;
    error?: string | null;
}

const OutputConsole: React.FC<OutputConsoleProps> = ({ output, loading, error }) => {
    return (
        <div className="flex flex-col h-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg overflow-hidden">
            <div className="bg-[#2A2A2A] px-4 py-2 text-xs text-[#E4E4E4] font-mono border-b border-[#2A2A2A]">
                CONSOLE
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                {loading ? (
                    <div className="text-blue-400 animate-pulse">Processing...</div>
                ) : error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : (
                    <pre className="text-[#E4E4E4] whitespace-pre-wrap">{output || 'No output yet.'}</pre>
                )}
            </div>
        </div>
    );
};

export default OutputConsole;
