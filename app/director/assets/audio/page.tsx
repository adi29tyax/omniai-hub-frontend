'use client';

import { useState } from 'react';
import api from '@/services/api';
import { AudioControls } from '@/app/director/components/AudioControls';

export default function AudioWorkspace() {
    const [text, setText] = useState("");
    const [emotion, setEmotion] = useState("neutral");
    const [generatedAudio, setGeneratedAudio] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGenerateVoice = async () => {
        setLoading(true);
        try {
            const res = await api.post('/director/generate-audio', {
                project_id: "project_uuid",
                scene_id: "scene_uuid",
                text,
                emotion
            });
            setGeneratedAudio([res.data, ...generatedAudio]);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Generator */}
            <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-6">Voice Generator</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Dialogue</label>
                            <textarea
                                className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white h-32 focus:border-purple-500 outline-none"
                                placeholder="Enter dialogue here..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Emotion</label>
                            <select
                                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                value={emotion}
                                onChange={(e) => setEmotion(e.target.value)}
                            >
                                <option value="neutral">Neutral</option>
                                <option value="happy">Happy</option>
                                <option value="angry">Angry</option>
                                <option value="sad">Sad</option>
                                <option value="excited">Excited</option>
                            </select>
                        </div>
                        <button
                            onClick={handleGenerateVoice}
                            disabled={loading || !text}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded font-medium transition disabled:opacity-50"
                        >
                            {loading ? 'Generating...' : 'Generate Voice'}
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-6">SFX & Music</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded transition">
                            Sound Designer Mode
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded transition">
                            Music Composer
                        </button>
                    </div>
                </div>
            </div>

            {/* Library */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 overflow-y-auto">
                <h2 className="text-xl font-bold text-white mb-6">Audio Library</h2>
                <div className="space-y-4">
                    {generatedAudio.map((audio, i) => (
                        <div key={i} className="bg-gray-800 p-4 rounded border border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-white truncate w-2/3">
                                    {audio.metadata?.text || "Audio Asset"}
                                </span>
                                <span className="text-xs text-gray-500">Voice</span>
                            </div>
                            <AudioControls src={audio.url} />
                        </div>
                    ))}
                    {generatedAudio.length === 0 && (
                        <div className="text-gray-500 text-center py-8">No audio generated yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
