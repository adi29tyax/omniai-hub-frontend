import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewFileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

const NewFileModal: React.FC<NewFileModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name.trim());
            setName('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-4 w-80">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#E4E4E4] font-medium">New File</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={16} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="filename.py"
                        className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded px-3 py-2 text-[#E4E4E4] text-sm focus:outline-none focus:border-blue-500 mb-4"
                        autoFocus
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewFileModal;
