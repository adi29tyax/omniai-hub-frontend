import Link from 'next/link';

interface StoryCardProps {
    story: any;
}

export default function StoryCard({ story }: StoryCardProps) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition shadow-lg">
            <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{story.logline}</p>
            <div className="flex justify-between items-center">
                <span className="text-xs bg-purple-900 text-purple-200 px-2 py-1 rounded">{story.style}</span>
                <Link href={`/director/stories/${story.id}`} className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                    View Details →
                </Link>
            </div>
        </div>
    );
}
