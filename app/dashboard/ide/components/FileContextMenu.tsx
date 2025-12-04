import React from 'react';

interface FileContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onRename: () => void;
    onDelete: () => void;
    onNewFile: () => void;
    onNewFolder: () => void;
}

const FileContextMenu: React.FC<FileContextMenuProps> = ({
    x,
    y,
    onClose,
    onRename,
    onDelete,
    onNewFile,
    onNewFolder,
}) => {
    React.useEffect(() => {
        const handleClickOutside = () => onClose();
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [onClose]);

    return (
        <div
            className="fixed z-50 bg-[#2A2A2A] border border-[#3A3A3A] rounded shadow-lg py-1 w-40"
            style={{ top: y, left: x }}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="w-full text-left px-4 py-2 text-sm text-[#E4E4E4] hover:bg-[#3A3A3A]"
                onClick={() => { onNewFile(); onClose(); }}
            >
                New File
            </button>
            <button
                className="w-full text-left px-4 py-2 text-sm text-[#E4E4E4] hover:bg-[#3A3A3A]"
                onClick={() => { onNewFolder(); onClose(); }}
            >
                New Folder
            </button>
            <div className="border-t border-[#3A3A3A] my-1" />
            <button
                className="w-full text-left px-4 py-2 text-sm text-[#E4E4E4] hover:bg-[#3A3A3A]"
                onClick={() => { onRename(); onClose(); }}
            >
                Rename
            </button>
            <button
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#3A3A3A]"
                onClick={() => { onDelete(); onClose(); }}
            >
                Delete
            </button>
        </div>
    );
};

export default FileContextMenu;
