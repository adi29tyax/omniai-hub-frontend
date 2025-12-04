'use client';

import { useState } from 'react';
import AssistantPanel from '../components/AssistantPanel';
import AssistantChat from '../components/AssistantChat';
import AssistantActionButtons from '../components/AssistantActionButtons';
import { assistantQuery, AssistantAction } from 'services/assistant';

interface KeyframeAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    keyframeData?: any;
}

export default function KeyframeAssistant({ isOpen, onClose, keyframeData }: KeyframeAssistantProps) {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [actions, setActions] = useState<AssistantAction[]>([]);

    const handleSendMessage = async (msg: string) => {
        setMessages(prev => [...prev, { role: 'user', content: msg }]);
        setLoading(true);

        try {
            const suggestions = await assistantQuery({ type: 'keyframe', data: keyframeData, prompt: msg });
            const responseText = suggestions.length > 0 ? "Here are some suggestions:" : "I couldn't find any specific suggestions.";
            setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);

            // Extract actions from suggestions
            const allActions = suggestions.flatMap(s => s.actions || []);
            setActions(allActions);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Error processing request." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AssistantPanel isOpen={isOpen} onClose={onClose} title="Keyframe Assistant">
            <AssistantChat messages={messages} onSendMessage={handleSendMessage} loading={loading} />
            <AssistantActionButtons actions={actions} onActionClick={(a) => handleSendMessage(`Do: ${a.label}`)} />
        </AssistantPanel>
    );
}
