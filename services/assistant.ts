// services/assistant.ts
import api from "./api";

export async function getSceneAssistantHelp(sceneId: string) {
    return { message: "Assistant help placeholder for scene " + sceneId };
}

export async function getShotAssistantHelp(shotId: string) {
    return { message: "Assistant help placeholder for shot " + shotId };
}

export async function askAssistant(question: string) {
    return { answer: "Placeholder assistant answer for: " + question };
}

export interface AssistantAction {
    label: string;
    action: string;
}

export interface Suggestion {
    id: string;
    text: string;
    type: 'completion' | 'action';
    actions?: AssistantAction[];
    confidence: number;
}

export async function assistantQuery(context: any): Promise<Suggestion[]> {
    return [
        {
            id: '1',
            text: 'Placeholder suggestion',
            type: 'completion',
            actions: [{ label: 'Do something', action: 'do_something' }],
            confidence: 0.95
        }
    ];
}
