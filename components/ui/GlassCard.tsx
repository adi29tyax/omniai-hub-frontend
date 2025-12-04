import React from "react";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className = "", hoverEffect = true }: GlassCardProps) => {
    return (
        <div
            className={`
        relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md
        transition-all duration-300 ease-out
        ${hoverEffect ? "hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10" : ""}
        ${className}
      `}
        >
            {children}
        </div>
    );
};
