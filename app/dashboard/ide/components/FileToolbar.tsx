import React from 'react';
import { FilePlus, FolderPlus, RefreshCw } from 'lucide-react';

interface FileToolbarProps {
    onNewFile: () => void;
    onNewFolder: () => void;
    onRefresh: () => void;
}

const FileToolbar: React.FC<FileToolbarProps> = ({ onNewFile, onNewFolder, onRefresh }) => {
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] border-b border-[#2A2A2A]">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Explorer</span>
            <div className="flex items-center gap-1">
                <button onClick={onNewFile} className="p-1 text-gray-400 hover:text-white rounded hover:bg-[#2A2A2A]" title="New File">
                    <FilePlus size={14} />
                </button>
                <button onClick={onNewFolder} className="p-1 text-gray-400 hover:text-white rounded hover:bg-[#2A2A2A]" title="New Folder">
                    <FolderPlus size={14} />
                </button>
                <button onClick={onRefresh} className="p-1 text-gray-400 hover:text-white rounded hover:bg-[#2A2A2A]" title="Refresh">
                    <RefreshCw size={14} />
                </button>
            </div>
        </div>
    );
};

export default FileToolbar;
