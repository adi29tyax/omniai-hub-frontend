'use client';

import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import FileTree from './FileTree';
import FileToolbar from './FileToolbar';
import FileContextMenu from './FileContextMenu';
import NewFileModal from './NewFileModal';
import NewFolderModal from './NewFolderModal';

interface FileExplorerProps {
    projectId: string;
    onFileSelect: (file: any) => void;
    activeFileId?: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ projectId, onFileSelect, activeFileId }) => {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; node: any } | null>(null);

    const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

    const fetchFiles = async () => {
        if (!projectId) return;
        setLoading(true);
        try {
            const res = await api.get(`/project-files/tree/${projectId}`);
            const flatFiles = res.data;
            const tree = buildTreeFromFlat(flatFiles);
            setFiles(tree);
        } catch (err) {
            console.error("Failed to fetch files", err);
        } finally {
            setLoading(false);
        }
    };

    const buildTreeFromFlat = (items: any[]) => {
        const root: any[] = [];
        const map: Record<string, any> = {};

        items.forEach(item => {
            map[item.path] = { ...item, children: [] };
        });

        items.forEach(item => {
            const node = map[item.path];
            const parts = item.path.split('/');
            if (parts.length > 1) {
                const parentPath = parts.slice(0, -1).join('/');
                if (map[parentPath]) {
                    map[parentPath].children.push(node);
                } else {
                    root.push(node);
                }
            } else {
                root.push(node);
            }
        });

        return root;
    };

    useEffect(() => {
        fetchFiles();
    }, [projectId]);

    const handleContextMenu = (e: React.MouseEvent, node: any) => {
        setContextMenu({ x: e.clientX, y: e.clientY, node });
    };

    const handleCreateFile = async (name: string) => {
        try {
            let path = name;
            if (contextMenu?.node?.is_folder) {
                path = `${contextMenu.node.path}/${name}`;
            } else if (contextMenu?.node) {
                const parts = contextMenu.node.path.split('/');
                parts.pop();
                path = parts.length > 0 ? `${parts.join('/')}/${name}` : name;
            }

            await api.post(`/project-files/create`, {
                project_id: projectId,
                name: name,
                path: path,
                is_folder: false,
                content: ''
            });
            fetchFiles();
        } catch (err) {
            console.error("Failed to create file", err);
        }
    };

    const handleCreateFolder = async (name: string) => {
        try {
            let path = name;
            if (contextMenu?.node?.is_folder) {
                path = `${contextMenu.node.path}/${name}`;
            } else if (contextMenu?.node) {
                const parts = contextMenu.node.path.split('/');
                parts.pop();
                path = parts.length > 0 ? `${parts.join('/')}/${name}` : name;
            }

            await api.post(`/project-files/create`, {
                project_id: projectId,
                name: name,
                path: path,
                is_folder: true
            });
            fetchFiles();
        } catch (err) {
            console.error("Failed to create folder", err);
        }
    };

    const handleDelete = async () => {
        if (!contextMenu?.node) return;
        if (!confirm(`Delete ${contextMenu.node.name}?`)) return;

        try {
            await api.delete(`/project-files/delete/${contextMenu.node.id}`);
            fetchFiles();
        } catch (err) {
            console.error("Failed to delete", err);
        }
    };

    const handleRename = async () => {
        alert("Rename not implemented yet");
    };

    return (
        <div className="flex flex-col h-full bg-[#111111] border-r border-[#2A2A2A] w-64">
            <FileToolbar
                onNewFile={() => setIsNewFileModalOpen(true)}
                onNewFolder={() => setIsNewFolderModalOpen(true)}
                onRefresh={fetchFiles}
            />

            <FileTree
                data={files}
                onSelect={onFileSelect}
                onContextMenu={handleContextMenu}
                selectedId={activeFileId}
            />

            {contextMenu && (
                <FileContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={() => setContextMenu(null)}
                    onRename={handleRename}
                    onDelete={handleDelete}
                    onNewFile={() => setIsNewFileModalOpen(true)}
                    onNewFolder={() => setIsNewFolderModalOpen(true)}
                />
            )}

            <NewFileModal
                isOpen={isNewFileModalOpen}
                onClose={() => setIsNewFileModalOpen(false)}
                onCreate={handleCreateFile}
            />

            <NewFolderModal
                isOpen={isNewFolderModalOpen}
                onClose={() => setIsNewFolderModalOpen(false)}
                onCreate={handleCreateFolder}
            />
        </div>
    );
};

export default FileExplorer;
