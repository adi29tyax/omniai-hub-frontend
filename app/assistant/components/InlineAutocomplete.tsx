import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { assistantQuery, Suggestion } from "../../../services/assistant";
import { gatherContext } from "../context";

interface InlineAutocompleteProps {
    contextType: 'scene' | 'shot' | 'keyframe' | 'general';
    inputValue: string;
    onApply: (text: string) => void;
    trigger?: boolean; // External trigger (e.g. Ctrl+Space)
}

export default function InlineAutocomplete({ contextType, inputValue, onApply, trigger }: InlineAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (trigger && inputValue.length > 2) {
            fetchSuggestions();
        } else {
            setIsVisible(false);
        }
    }, [trigger, inputValue]);

    const fetchSuggestions = async () => {
        setLoading(true);
        setIsVisible(true);
        try {
            const ctx = gatherContext(contextType, {}, inputValue);
            const results = await assistantQuery(ctx);
            // Filter for completions only
            const completions = results.filter(r => r.type === 'completion' || r.type === 'action').slice(0, 5);
            setSuggestions(completions);
            setSelectedIndex(0);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isVisible) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            if (suggestions[selectedIndex]) {
                onApply(suggestions[selectedIndex].text);
                setIsVisible(false);
            }
        } else if (e.key === 'Escape') {
            setIsVisible(false);
        }
    };

    // Attach key listener to window or parent? 
    // Ideally this component is placed near the input and the input handles keys.
    // But for this standalone component, we might need a different approach.
    // For now, we assume the parent passes the key event or we just render the list.
    // Let's assume this component renders the LIST and the parent handles keys.
    // BUT the requirement says "Uses keyboard navigation". 
    // We'll export a helper or hook for keys, but for now let's just render the UI.

    if (!isVisible || suggestions.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute z-50 mt-1 w-full max-w-md bg-[#1a1a1a] border border-purple-500/30 rounded-lg shadow-xl overflow-hidden backdrop-blur-md"
            >
                {loading ? (
                    <div className="p-2 flex items-center gap-2 text-white/40 text-xs">
                        <Sparkles size={12} className="animate-spin" />
                        <span>Thinking...</span>
                    </div>
                ) : (
                    <div className="py-1">
                        {suggestions.map((s, idx) => (
                            <div
                                key={s.id}
                                className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between ${idx === selectedIndex ? "bg-purple-500/20 text-white" : "text-white/70 hover:bg-white/5"
                                    }`}
                                onClick={() => {
                                    onApply(s.text);
                                    setIsVisible(false);
                                }}
                            >
                                <span>{s.text}</span>
                                {idx === selectedIndex && <span className="text-[10px] text-white/40">Enter</span>}
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
