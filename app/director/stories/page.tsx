'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import StoryCard from '../components/StoryCard';

export default function StoriesPage() {
    // Mocking project ID for now, in real app would come from context/url
    const projectId = "project_uuid_placeholder";
    const [stories, setStories] = useState<any[]>([]);

    useEffect(() => {
        // Fetch stories (assuming endpoint exists or using mock)
        // api.get(`/director/stories/list/${projectId}`)...
        // For now using placeholder data since list endpoint wasn't explicitly requested in backend step
        setStories([
            { id: '1', title: 'The Last Starship', logline: 'A lone pilot navigates a dying galaxy.', style: 'Cyberpunk Anime' },
            { id: '2', title: 'School of Magic', logline: 'A young wizard discovers a dark secret.', style: 'Fantasy Anime' }
        ]);
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map(story => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>
    );
}
