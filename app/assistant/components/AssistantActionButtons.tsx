import { AssistantAction } from '@/services/assistant';

interface AssistantActionButtonsProps {
    actions: AssistantAction[];
    onActionClick: (action: AssistantAction) => void;
}

export default function AssistantActionButtons({ actions, onActionClick }: AssistantActionButtonsProps) {
    if (!actions.length) return null;

    return (
        <div className="flex flex-wrap gap-2 p-4 pt-0">
            {actions.map((action, i) => (
                <button
                    key={i}
                    onClick={() => onActionClick(action)}
                    className="bg-gray-700 hover:bg-gray-600 text-purple-300 text-xs px-3 py-1.5 rounded-full border border-purple-500/30 transition"
                >
                    ✨ {action.label}
                </button>
            ))}
        </div>
    );
}
