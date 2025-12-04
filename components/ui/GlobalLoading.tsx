'use client';

import { useLoading } from '@/context/LoadingContext';
import { Loader2 } from 'lucide-react';

export default function GlobalLoading() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 flex flex-col items-center gap-4 shadow-2xl">
                <Loader2 className="animate-spin text-purple-500 w-12 h-12" />
                <p className="text-white font-medium">Processing...</p>
            </div>
        </div>
    );
}
