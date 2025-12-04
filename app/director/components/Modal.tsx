import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-lg border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="flex justify-between items-center p-4 border-b border-gray-800">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
