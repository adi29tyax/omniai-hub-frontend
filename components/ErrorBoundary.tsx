"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        // TODO: Send to backend logger
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-zinc-900 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-bold text-red-500 mb-2">Something went wrong</h2>
                    <p className="text-zinc-400 mb-4 max-w-md">
                        {this.state.error?.message || "An unexpected error occurred."}
                    </p>
                    <button
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
