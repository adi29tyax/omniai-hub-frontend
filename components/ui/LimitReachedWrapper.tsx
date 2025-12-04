"use client";

import React, { useEffect, useState } from "react";
import LimitReachedModal from "@/components/ui/LimitReachedModal";

export default function LimitReachedWrapper() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleLimitReached = (event: CustomEvent) => {
            setMessage(event.detail);
            setIsOpen(true);
        };

        window.addEventListener("limit-reached" as any, handleLimitReached);
        return () => window.removeEventListener("limit-reached" as any, handleLimitReached);
    }, []);

    return <LimitReachedModal isOpen={isOpen} onClose={() => setIsOpen(false)} message={message} />;
}
