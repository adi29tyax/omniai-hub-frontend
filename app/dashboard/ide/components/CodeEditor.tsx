import React, { useEffect } from 'react';

interface CodeEditorProps {
    code: string;
    onChange: (code: string) => void;
    onSave?: () => void;
    filename?: string;
    isDirty?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onSave }) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (onSave) {
                    onSave();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onSave]);

    return (
        <div className="flex flex-col h-full bg-[#1E1E1E] overflow-hidden">
            <textarea
                value={code}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 w-full h-full bg-[#1E1E1E] text-[#E4E4E4] p-4 font-mono text-sm resize-none focus:outline-none"
                placeholder="// Select a file to edit..."
                spellCheck={false}
            />
        </div>
    );
};

export default CodeEditor;
