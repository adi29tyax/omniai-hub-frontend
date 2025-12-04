import React from 'react';
import FileNode from './FileNode';

interface FileTreeProps {
    data: any[];
    onSelect: (node: any) => void;
    onContextMenu: (e: React.MouseEvent, node: any) => void;
    selectedId?: string;
}

const FileTree: React.FC<FileTreeProps> = ({ data, onSelect, onContextMenu, selectedId }) => {
    if (!data || data.length === 0) {
        return <div className="p-4 text-xs text-gray-500 text-center">No files found</div>;
    }

    return (
        <div className="flex-1 overflow-y-auto py-2">
            {data.map((node) => (
                <FileNode
                    key={node.id}
                    node={node}
                    level={0}
                    onSelect={onSelect}
                    onContextMenu={onContextMenu}
                    selectedId={selectedId}
                />
            ))}
        </div>
    );
};

export default FileTree;
