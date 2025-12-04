'use client';

import { useState } from 'react';
import api from '@/services/api';
import { VideoPlayer } from '@/app/director/components/VideoPlayer';

export default function ExportPage() {
    const [compiling, setCompiling] = useState(false);
    const [episodeUrl, setEpisodeUrl] = useState<string | null>(null);

    const handleRender = async () => {
        setCompiling(true);
        try {
            const res = await api.post('/director/compile-episode', {
                project_id: "project_uuid",
                episode_title: "Episode 1 - Pilot",
                scene_order: ["scene_uuid_1", "scene_uuid_2"] // Mocked
            });
            setEpisodeUrl(res.data.url);
        } catch (e) {
            console.error(e);
        } finally {
            setCompiling(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-3xl font-bold text-white mb-8">Export Episode</h1>

            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                {!episodeUrl ? (
                    <div className="py-12">
                        <div className="mb-6 text-gray-400">
                            Ready to compile your masterpiece? This will merge all video, audio, and effects layers.
                        </div>
                        <button
                            onClick={handleRender}
                            disabled={compiling}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition disabled:opacity-50 flex items-center gap-3 mx-auto"
                        >
                            {compiling ? (
                                <>
                                    <span className="animate-spin">⏳</span> Rendering...
                                </>
                            ) : (
                                'Render Full Episode'
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-green-400 font-medium mb-4">Render Complete!</div>
                        <div className="max-w-2xl mx-auto">
                            <VideoPlayer src={episodeUrl} />
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <a
                                href={episodeUrl}
                                download
                                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded transition"
                            >
                                Download MP4
                            </a>
                            <button
                                onClick={() => setEpisodeUrl(null)}
                                className="text-gray-400 hover:text-white px-6 py-2"
                            >
                                Render Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
