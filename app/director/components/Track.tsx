import Layer from './Layer';

interface TrackProps {
    name: string;
    layers: any[];
    type: 'video' | 'audio' | 'sfx' | 'bgm';
}

export default function Track({ name, layers, type }: TrackProps) {
    const bgColor = type === 'video' ? 'bg-gray-800' : 'bg-gray-900';
    const layerColor = type === 'video' ? 'bg-blue-600' : type === 'audio' ? 'bg-green-600' : 'bg-purple-600';

    return (
        <div className="flex h-24 border-b border-gray-700">
            <div className="w-32 bg-gray-800 border-r border-gray-700 p-2 flex items-center text-xs font-bold text-gray-300 uppercase shrink-0">
                {name}
            </div>
            <div className={`flex-1 relative ${bgColor} overflow-hidden`}>
                {layers.map(layer => (
                    <Layer
                        key={layer.id}
                        {...layer}
                        color={layerColor}
                    />
                ))}
            </div>
        </div>
    );
}
