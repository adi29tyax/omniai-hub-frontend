import React from "react";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    className?: string;
}

export const SectionHeader = ({ title, subtitle, action, className = "" }: SectionHeaderProps) => {
    return (
        <div className={`flex items-end justify-between border-b border-white/5 pb-4 mb-6 ${className}`}>
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    {title}
                </h2>
                {subtitle && <p className="mt-1 text-sm text-white/40">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
};
