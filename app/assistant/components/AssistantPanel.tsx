import { X } from 'lucide-react';

interface AssistantPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function AssistantPanel({ isOpen, onClose, title, children }: AssistantPanelProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed right-6 bottom-6 w-96 h-[600px] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden">
            <div className="bg-gray-800 p-3 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-purple-500">✦</span> {title}
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={16} />
                </button>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col bg-gray-900">
                {children}
            </div>
        </div>
    );
}
