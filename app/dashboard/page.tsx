'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Film, LogOut } from 'lucide-react';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch projects (mock or real)
        // const res = await api.get('/director/projects'); 
        // setProjects(res.data);
        setProjects([]); // Empty for now as per requirements
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('omni_token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Film className="text-purple-500" /> OmniAI Studio
          </h1>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white flex items-center gap-2">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to Director Mode</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Create stunning AI-generated videos from simple text prompts. Start a new project to begin your journey.
          </p>

          <Link href="/director/workflow">
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto transition transform hover:scale-105">
              <Plus size={24} /> Start New Project
            </button>
          </Link>
        </div>

        {/* Recent Projects Placeholder */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-gray-400">Recent Projects</h3>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="text-gray-600 italic">No recent projects found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project Cards would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
