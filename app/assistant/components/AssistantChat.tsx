import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface AssistantChatProps {
    messages: Message[];
    onSendMessage: (msg: string) => void;
    loading: boolean;
}

export default function AssistantChat({ messages, onSendMessage, loading }: AssistantChatProps) {
    const [input, setInput] = useState("");
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSendMessage(input);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-200'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-700 text-gray-400 p-3 rounded-lg text-sm animate-pulse">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>
            <div className="p-4 border-t border-gray-700 flex gap-2">
                <input
                    className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-purple-500 outline-none"
                    placeholder="Ask AI Assistant..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded transition disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}
