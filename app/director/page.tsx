'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { api } from '../../services/api';

export default function DirectorDashboard() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkOwner = async () => {
            try {
                const res = await api.get('/auth/me');
                const user = res.data;
                if (user.email === "csadityasharma2000@gmail.com") {
                    // console.log("👑 Owner Mode Active");
                }
                // Fetch projects
                const projectsRes = await api.get('/director/projects/list/user_123'); // TODO: Use actual user ID
                setProjects(projectsRes.data);
            } catch (err: any) {
                console.error("AUTH ERROR:", err?.response?.data || err);
                alert(err?.response?.data?.detail || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        checkOwner();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Director Dashboard</h2>
                <Link href="/director/workflow">
                    <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded flex items-center gap-2 transition">
                        <Plus size={20} /> Create New Project
                    </button>
                </Link>
            </div>

            {loading ? (
                <div className="text-gray-400">Loading projects...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                <Link href={`/director/stories`} className="text-purple-400 hover:text-purple-300 font-medium">
                                    Open Project →
                                </Link>
                            </div>
                        </div>
                    ))}

                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500 bg-gray-900 rounded border border-dashed border-gray-800">
                            No projects found. Create one to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
