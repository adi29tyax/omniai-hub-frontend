interface AssetCardProps {
    asset: any;
    onPlay?: (url: string) => void;
}

export default function AssetCard({ asset, onPlay }: AssetCardProps) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 group">
            <div className="aspect-video bg-black relative flex items-center justify-center">
                {asset.type === 'image' || asset.type === 'keyframe' ? (
                    <img src={asset.url} alt="Asset" className="w-full h-full object-cover" />
                ) : (
                    <div className="text-gray-500 flex flex-col items-center">
                        <span className="text-4xl mb-2">▶</span>
                        <span className="text-xs uppercase">{asset.type}</span>
                    </div>
                )}

                {(asset.type === 'video' || asset.type === 'animation' || asset.type === 'voice' || asset.type === 'bgm' || asset.type === 'sfx') && (
                    <button
                        onClick={() => onPlay && onPlay(asset.url)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"
                    >
                        <span className="text-white text-4xl">▶</span>
                    </button>
                )}
            </div>
            <div className="p-3">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400 uppercase">{asset.type}</span>
                    <span className="text-xs text-gray-600">v{asset.version}</span>
                </div>
                <div className="text-xs text-gray-500 truncate">
                    {new Date(asset.created_at).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
