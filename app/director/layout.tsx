"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Clapperboard,
    Film,
    Scissors,
    Settings,
    ChevronLeft,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import ErrorBoundary from '../../components/ErrorBoundary';

// Dynamic import for AssistantOverlay to prevent SSR issues
const AssistantOverlay = dynamic(
    () => import('../../app/assistant/overlay/AssistantOverlay'),
    { ssr: false }
);

const SidebarItem = ({ icon: Icon, label, href, collapsed, active }: any) => (
    <Link href={href}>
        <div className={`flex items-center p-3 mb-2 rounded-xl transition-all duration-200 group
      ${active
                ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-white/10'
                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }
    `}>
            <Icon size={20} className={`${active ? 'text-purple-400' : 'group-hover:text-white'} transition-colors`} />
            {!collapsed && (
                <span className="ml-3 font-medium text-sm tracking-wide">{label}</span>
            )}
            {collapsed && active && (
                <div className="absolute left-16 bg-zinc-900 text-white text-xs px-2 py-1 rounded border border-white/10 z-50">
                    {label}
                </div>
            )}
        </div>
    </Link>
);

export default function DirectorLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/director' },
        { icon: Clapperboard, label: 'Stories', href: '/director/stories' },
        { icon: Film, label: 'Scenes', href: '/director/scenes' },
        { icon: Scissors, label: 'Timeline', href: '/director/timeline' },
        { icon: Sparkles, label: 'Assets', href: '/director/assets' },
        { icon: Settings, label: 'Settings', href: '/director/settings' },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-purple-500/30">
            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{ width: collapsed ? 80 : 260 }}
                className="relative h-full bg-zinc-950/50 border-r border-white/5 backdrop-blur-xl flex flex-col z-20"
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    {!collapsed && (
                        <span className="ml-3 font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                            OmniAI
                        </span>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex-1 py-6 px-3 overflow-y-auto custom-scrollbar">
                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <SidebarItem
                                key={item.href}
                                {...item}
                                collapsed={collapsed}
                                active={pathname === item.href || pathname?.startsWith(item.href + '/')}
                            />
                        ))}
                    </div>
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all shadow-xl z-30"
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* User Profile (Simplified) */}
                <div className="p-4 border-t border-white/5">
                    <div className={`flex items-center ${collapsed ? 'justify-center' : 'px-2'}`}>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
                        {!collapsed && (
                            <div className="ml-3">
                                <div className="text-sm font-medium">Director</div>
                                <div className="text-xs text-zinc-500">Pro Plan</div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Background Gradients */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/5 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-3xl" />
                </div>

                {/* Content Scrollable */}
                <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
                    <ErrorBoundary>
                        {children}
                    </ErrorBoundary>
                </main>

                {/* Global Assistant Overlay */}
                <AssistantOverlay />
            </div>
        </div>
    );
}
