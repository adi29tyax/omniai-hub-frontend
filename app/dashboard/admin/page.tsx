"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shield, Users, RefreshCw } from "lucide-react";

export default function AdminPage() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Mock fetching users
        setUsers([
            { id: 1, email: "csadityasharma2000@gmail.com", role: "owner", usage: "Unlimited" },
            { id: 2, email: "user@example.com", role: "free", usage: "High" },
            { id: 3, email: "pro@example.com", role: "pro", usage: "Low" },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <SectionHeader title="Admin Console" subtitle="Manage users and system status." />

            <div className="mt-8">
                <GlassCard className="overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <h3 className="font-semibold flex items-center gap-2"><Users size={18} /> Users</h3>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><RefreshCw size={16} /></button>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-white/60">
                            <tr>
                                <th className="p-4 font-medium">ID</th>
                                <th className="p-4 font-medium">Email</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium">Usage</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-white/60">{user.id}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'owner' ? 'bg-red-500/20 text-red-400' :
                                                user.role === 'pro' ? 'bg-purple-500/20 text-purple-400' :
                                                    'bg-white/10 text-white/60'
                                            }`}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4 text-white/60">{user.usage}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-purple-400 hover:text-purple-300 text-xs font-medium mr-3">Edit</button>
                                        <button className="text-red-400 hover:text-red-300 text-xs font-medium">Reset</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GlassCard>
            </div>
        </div>
    );
}
