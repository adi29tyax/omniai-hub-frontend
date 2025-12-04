'use client';

import { useState } from 'react';
import { DirectorService, Scene, Shot, Keyframe } from '@/services/director';
import { Loader2, Play, ImageIcon, Clapperboard, CheckCircle } from 'lucide-react';
import { useLoading } from '@/context/LoadingContext';
import { toast } from 'sonner';

export default function DirectorWorkflow() {
    const [step, setStep] = useState(1);
    const { isLoading, setLoading } = useLoading();
    const [error, setError] = useState<string | null>(null);

    // Data State
    const [story, setStory] = useState('');
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
    const [shots, setShots] = useState<Shot[]>([]);
    const [selectedShot, setSelectedShot] = useState<Shot | null>(null);
    const [keyframes, setKeyframes] = useState<Keyframe[]>([]);
    const [timeline, setTimeline] = useState<any>(null);
    const [renderTaskId, setRenderTaskId] = useState<string | null>(null);

    // Step 1: Story -> Scenes
    const handleSceneBreakdown = async () => {
        if (!story.trim()) {
            toast.error("Please enter a story concept.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await DirectorService.generateSceneBreakdown(story);
            setScenes(res.scenes || []);
            setStep(2);
            toast.success("Scenes generated successfully!");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to generate scenes");
            toast.error("Failed to generate scenes.");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Scene -> Shots
    const handleShotBreakdown = async (scene: Scene) => {
        setSelectedScene(scene);
        setLoading(true);
        setError(null);
        try {
            const res = await DirectorService.generateShotBreakdown(scene);
            setShots(res.shots || []);
            setStep(3);
            toast.success(`Shots generated for "${scene.title}"`);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to generate shots");
            toast.error("Failed to generate shots.");
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Shot -> Keyframe
    const handleKeyframeGeneration = async (shot: Shot) => {
        setSelectedShot(shot);
        setLoading(true);
        setError(null);
        try {
            const res = await DirectorService.generateKeyframe(shot);
            const newKeyframe: Keyframe = {
                id: `kf-${Date.now()}`,
                description: shot.description,
                url: res.image_url // Assuming backend returns image_url
            };
            setKeyframes(prev => [...prev, newKeyframe]);
            toast.success("Keyframe generated!");
            setStep(4);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to generate keyframe");
            toast.error("Failed to generate keyframe.");
        } finally {
            setLoading(false);
        }
    };

    // Step 4: Animation
    const handleAnimation = async () => {
        if (keyframes.length === 0) {
            toast.error("No keyframes to animate.");
            return;
        }
        setLoading(true);
        try {
            if (selectedShot) {
                await DirectorService.generateAnimation(keyframes, { duration: selectedShot.duration });
                toast.success("Animation generated!");
            }
            setStep(5);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to animate");
            toast.error("Failed to animate.");
        } finally {
            setLoading(false);
        }
    };

    // Step 5: Timeline
    const handleTimeline = async () => {
        if (scenes.length === 0) {
            toast.error("No scenes to compile.");
            return;
        }
        setLoading(true);
        try {
            const res = await DirectorService.compileTimeline(scenes);
            setTimeline(res);
            setStep(6);
            toast.success("Timeline compiled!");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to compile timeline");
            toast.error("Failed to compile timeline.");
        } finally {
            setLoading(false);
        }
    };

    // Step 6: Render
    const handleRender = async () => {
        if (!timeline) {
            toast.error("No timeline to render.");
            return;
        }
        setLoading(true);
        try {
            const res = await DirectorService.startRender(timeline, "project_123");
            setRenderTaskId(res.task_id);
            toast.success("Render started!");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to start render");
            toast.error("Failed to start render.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <Clapperboard className="text-purple-500" /> Director Workflow
                </h1>

                {/* Progress Bar */}
                <div className="flex justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 transform -translate-y-1/2"></div>
                    {[1, 2, 3, 4, 5, 6].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s ? 'bg-purple-600' : 'bg-gray-800 border border-gray-600'}`}>
                            {step > s ? <CheckCircle size={20} /> : s}
                        </div>
                    ))}
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded mb-6">
                        {error}
                    </div>
                )}

                {/* Step Content */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 min-h-[400px]">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full py-20">
                            <Loader2 className="animate-spin text-purple-500 mb-4" size={48} />
                            <p className="text-gray-400">Processing...</p>
                        </div>
                    ) : (
                        <>
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold">Step 1: The Story</h2>
                                    <p className="text-gray-400">Enter your story concept to begin the breakdown process.</p>
                                    <textarea
                                        className="w-full h-40 bg-gray-800 border border-gray-700 rounded p-4 text-white focus:border-purple-500 focus:outline-none"
                                        placeholder="A cyberpunk hacker infiltrates a secure facility..."
                                        value={story}
                                        onChange={(e) => setStory(e.target.value)}
                                    />
                                    <button
                                        onClick={handleSceneBreakdown}
                                        disabled={!story}
                                        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Generate Scenes
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Step 2: Scene Breakdown</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {scenes.map((scene, idx) => (
                                            <div key={idx} className="bg-gray-800 p-4 rounded border border-gray-700 hover:border-purple-500 cursor-pointer transition" onClick={() => handleShotBreakdown(scene)}>
                                                <h3 className="font-bold text-lg mb-2">{scene.title}</h3>
                                                <p className="text-sm text-gray-400">{scene.summary}</p>
                                                <div className="mt-2 text-xs text-purple-400 uppercase">{scene.location} • {scene.mood}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Step 3: Shot List for "{selectedScene?.title}"</h2>
                                    <div className="space-y-4">
                                        {shots.map((shot, idx) => (
                                            <div key={idx} className="bg-gray-800 p-4 rounded border border-gray-700 flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium">{shot.description}</p>
                                                    <div className="text-sm text-gray-500 mt-1">{shot.camera_angle} • {shot.movement} • {shot.duration}s</div>
                                                </div>
                                                <button
                                                    onClick={() => handleKeyframeGeneration(shot)}
                                                    className="bg-gray-700 hover:bg-purple-600 p-2 rounded transition"
                                                >
                                                    <ImageIcon size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Step 4: Visuals & Animation</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {keyframes.map((kf, idx) => (
                                            <div key={idx} className="bg-gray-800 p-2 rounded border border-gray-700">
                                                <div className="aspect-video bg-black rounded mb-2 flex items-center justify-center text-gray-600 overflow-hidden">
                                                    {kf.url ? <img src={kf.url} alt="Keyframe" className="w-full h-full object-cover" /> : <ImageIcon />}
                                                </div>
                                                <p className="text-xs text-gray-400 truncate">{kf.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleAnimation}
                                        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded font-bold w-full"
                                    >
                                        Generate Animations & Proceed
                                    </button>
                                </div>
                            )}

                            {step === 5 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Step 5: Timeline Assembly</h2>
                                    <p className="text-gray-400">Review your compiled timeline before rendering.</p>
                                    <div className="bg-black p-4 rounded border border-gray-800 h-40 flex items-center justify-center text-gray-600">
                                        [Timeline Visualization Placeholder]
                                    </div>
                                    <button
                                        onClick={handleTimeline}
                                        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded font-bold"
                                    >
                                        Confirm & Compile Timeline
                                    </button>
                                </div>
                            )}

                            {step === 6 && (
                                <div className="text-center space-y-6">
                                    <h2 className="text-3xl font-bold text-green-400">Ready to Render</h2>
                                    <p className="text-gray-400">Your project is assembled and ready for final rendering.</p>
                                    {renderTaskId ? (
                                        <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl inline-block">
                                            <p className="text-xl font-bold mb-2">Rendering Started!</p>
                                            <p className="text-sm text-gray-400">Task ID: {renderTaskId}</p>
                                            <p className="text-xs text-gray-500 mt-4">You can check the status in the dashboard.</p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleRender}
                                            className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-3 mx-auto transition transform hover:scale-105"
                                        >
                                            <Play fill="currentColor" /> Start Final Render
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
