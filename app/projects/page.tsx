"use client";

import { useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  created_by: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchProjects = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const res = await fetch(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setProjects(data);
  };

  const createProject = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });

    setName("");
    setDescription("");
    await fetchProjects();
    setLoading(false);
  };

  const deleteProject = async (id: number) => {
    const token = localStorage.getItem("access_token");
    await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">🚀 Your Projects</h1>

      <div className="mb-8 bg-gray-900 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Create New Project</h2>
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-800 border border-gray-700 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-800 border border-gray-700 rounded"
        />
        <button
          onClick={createProject}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="bg-gray-900 p-5 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-gray-400">{p.description}</p>
              </div>
              <button
                onClick={() => deleteProject(p.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
