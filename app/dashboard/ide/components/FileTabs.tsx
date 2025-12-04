import React from 'react';
import { X, File, FileCode, FileJson, FileType } from 'lucide-react';

interface OpenFile {
    id: string;
    name: string;
    path: string;
    content: string;
    isDirty: boolean;
}

interface FileTabsProps {
    openFiles: OpenFile[];
    activeFileId: string | null;
    onSwitchTab: (fileId: string) => void;
    onCloseTab: (fileId: string, e: React.MouseEvent) => void;
}

const getFileIcon = (filename: string) => {
    if (filename.endsWith('.tsx') || filename.endsWith('.ts')) return <FileCode size={14} className="text-blue-400" />;
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) return <FileCode size={14} className="text-yellow-400" />;
    if (filename.endsWith('.json')) return <FileJson size={14} className="text-yellow-200" />;
    if (filename.endsWith('.py')) return <FileType size={14} className="text-blue-300" />;
    return <File size={14} className="text-gray-400" />;
};

const FileTabs: React.FC<FileTabsProps> = ({ openFiles, activeFileId, onSwitchTab, onCloseTab }) => {
    if (openFiles.length === 0) return null;

    return (
        <div className="flex bg-[#1E1E1E] border-b border-[#2A2A2A] overflow-x-auto scrollbar-hide">
            {openFiles.map((file) => {
                const isActive = file.id === activeFileId;
                return (
                    <div
                        key={file.id}
                        onClick={() => onSwitchTab(file.id)}
                        className={`
              group flex items-center gap-2 px-3 py-2 min-w-[120px] max-w-[200px] cursor-pointer border-r border-[#2A2A2A] select-none
              ${isActive ? 'bg-[#1E1E1E] text-white border-t-2 border-t-blue-500' : 'bg-[#141414] text-gray-400 hover:bg-[#1A1A1A] border-t-2 border-t-transparent'}
            `}
                    >
                        {getFileIcon(file.name)}
                        <span className="text-sm truncate flex-1">{file.name}</span>
                        <div className="flex items-center justify-center w-5 h-5">
                            {file.isDirty ? (
                                <div className="w-2 h-2 rounded-full bg-white group-hover:hidden" />
                            ) : null}
                            <button
                                onClick={(e) => onCloseTab(file.id, e)}
                                className={`p-0.5 rounded-md hover:bg-[#3A3A3A] text-gray-400 hover:text-white ${file.isDirty ? 'hidden group-hover:block' : ''}`}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FileTabs;
