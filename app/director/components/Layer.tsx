interface LayerProps {
    id: string;
    name: string;
    start: number;
    duration: number;
    color?: string;
    onDrag?: (id: string, newStart: number) => void;
}

export default function Layer({ id, name, start, duration, color = "bg-blue-600", onDrag }: LayerProps) {
    return (
        <div
            className={`absolute h-full rounded ${color} border border-white/20 flex items-center px-2 text-xs text-white overflow-hidden cursor-move`}
            style={{ left: `${start * 10}px`, width: `${duration * 10}px` }}
            draggable
            onDragEnd={(e) => {
                // Placeholder drag logic
                // In a real app, calculate new position based on mouse coordinates
                // console.log("Dragged layer", id);
            }}
        >
            {name}
        </div>
    );
}
