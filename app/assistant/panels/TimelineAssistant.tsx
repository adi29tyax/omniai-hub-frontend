import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw, ArrowRight } from "lucide-react";
import { assistantQuery, Suggestion } from "../../../services/assistant";
import { gatherContext } from "../context";
import { LoadingSkeleton } from "../../../components/ui/LoadingSkeleton";

export default function TimelineAssistant() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSuggestions = async () => {
        setLoading(true);
        try {
            const ctx = gatherContext('timeline', {});
            const results = await assistantQuery(ctx);
            setSuggestions(results);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, []);

    return (
        <div className="space-y-4 p-4 bg-[#111] border-l border-white/10 h-full">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Sparkles size={14} className="text-purple-400" />
                    Timeline AI
                </h3>
                <button
                    onClick={fetchSuggestions}
                    className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                    disabled={loading}
                >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {loading ? (
                <LoadingSkeleton count={3} className="h-16" />
            ) : (
                <div className="space-y-3">
                    {suggestions.map((s) => (
                        <div key={s.id} className="bg-white/5 border border-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors group">
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-sm text-white/80">{s.text}</p>
                                <button className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
