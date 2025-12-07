'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/services/api';
import SceneCard from '../../components/SceneCard';

export default function StoryViewer() {
    const params = useParams();
    const [story, setStory] = useState<any>(null);
    const [scenes, setScenes] = useState<any[]>([]);

    useEffect(() => {
        if (params.id) {
            api.get(`/director/story/get/${params.id}`).then(res => setStory(res.data));
            api.get(`/director/scenes/list/${params.id}`).then(res => setScenes(res.data));
        }
    }, [params.id]);

    if (!story) return <div className="text-gray-400">Loading story...</div>;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h1 className="text-3xl font-bold text-white mb-2">{story.title}</h1>
                <p className="text-xl text-gray-400 mb-4">{story.logline}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                    <span>Theme: {story.theme}</span>
                    <span>Style: {story.style}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded transition">
                    Generate New Scene Breakdown
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
                    Regenerate Story
                </button>
            </div>

            {/* Scenes */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Scenes</h3>
                <div className="grid grid-cols-1 gap-4">
                    {scenes.map(scene => (
                        <SceneCard key={scene.id} scene={scene} />
                    ))}
                </div>
            </div>
        </div>
    );
}
