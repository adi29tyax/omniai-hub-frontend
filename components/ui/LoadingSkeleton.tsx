import React from "react";

interface LoadingSkeletonProps {
    className?: string;
    count?: number;
}

export const LoadingSkeleton = ({ className = "h-4 w-full", count = 1 }: LoadingSkeletonProps) => {
    return (
        <div className="space-y-2 animate-pulse">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={`rounded bg-white/5 ${className}`} />
            ))}
        </div>
    );
};
