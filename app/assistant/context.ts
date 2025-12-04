export interface AssistantContext {
    type: 'scene' | 'shot' | 'keyframe' | 'timeline' | 'general' | 'animation' | 'audio';
    data?: any;
    prompt?: string;
    recentActions?: string[];
}

export const gatherContext = (type: AssistantContext['type'], data: any, prompt: string = ""): AssistantContext => {
    // In a real app, this might access global state stores (Zustand/Redux)
    // For now, we accept data passed directly from the component
    return {
        type,
        data,
        prompt,
        recentActions: [] // Could be fetched from a history service
    };
};
