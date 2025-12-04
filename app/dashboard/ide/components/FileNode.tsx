import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';

interface FileNodeProps {
    node: any;
    level: number;
    onSelect: (node: any) => void;
    onContextMenu: (e: React.MouseEvent, node: any) => void;
    selectedId?: string;
}

const FileNode: React.FC<FileNodeProps> = ({ node, level, onSelect, onContextMenu, selectedId }) => {
    const [expanded, setExpanded] = useState(false);
    const isSelected = selectedId === node.id;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (node.is_folder) {
            setExpanded(!expanded);
        } else {
            onSelect(node);
        }
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        onContextMenu(e, node);
    };

    return (
        <div>
            <div
                className={`flex items-center py-1 px-2 cursor-pointer select-none text-sm ${isSelected ? 'bg-[#37373D] text-white' : 'text-[#CCCCCC] hover:bg-[#2A2D2E]'
                    }`}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
                onClick={handleToggle}
                onContextMenu={handleContextMenu}
            >
                <span className="mr-1 opacity-70">
                    {node.is_folder ? (
                        expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    ) : (
                        <span className="w-[14px] inline-block" />
                    )}
                </span>
                <span className="mr-2 text-blue-400">
                    {node.is_folder ? (
                        expanded ? <FolderOpen size={14} /> : <Folder size={14} />
                    ) : (
                        <File size={14} className="text-gray-400" />
                    )}
                </span>
                <span className="truncate">{node.name}</span>
            </div>

            {node.is_folder && expanded && node.children && (
                <div>
                    {node.children.map((child: any) => (
                        <FileNode
                            key={child.id}
                            node={child}
                            level={level + 1}
                            onSelect={onSelect}
                            onContextMenu={onContextMenu}
                            selectedId={selectedId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileNode;
