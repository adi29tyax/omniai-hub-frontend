import Link from 'next/link';
import { LayoutDashboard, BookOpen, Clapperboard, Film, Music, Settings } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col border-r border-gray-800">
            <div className="text-2xl font-bold mb-8 text-purple-500">Director Mode</div>
            <nav className="flex-1 space-y-2">
                <Link href="/director" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
                    <LayoutDashboard size={20} /> Dashboard
                </Link>
                <Link href="/director/stories" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
                    <BookOpen size={20} /> Stories
                </Link>
                <Link href="/director/scenes" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
                    <Clapperboard size={20} /> Scenes
                </Link>
                <Link href="/director/shots" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
                    <Film size={20} /> Shots
                </Link>
                <Link href="/director/assets/audio" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
                    <Music size={20} /> Audio & SFX
                </Link>
                <Link href="/director/timeline" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
                    <Film size={20} /> Timeline
                </Link>
            </nav>
            <div className="mt-auto">
                <Link href="/settings" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
                    <Settings size={20} /> Settings
                </Link>
            </div>
        </div>
    );
}
