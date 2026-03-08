'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

export function TypewriterText({
    text,
    speed = 40,
    className = '',
    onComplete,
}: TypewriterTextProps) {
    const [displayed, setDisplayed] = useState('');
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        setDisplayed('');
        setIdx(0);
    }, [text]);

    useEffect(() => {
        if (idx >= text.length) {
            onComplete?.();
            return;
        }
        const t = setTimeout(() => {
            setDisplayed((p) => p + text[idx]);
            setIdx((i) => i + 1);
        }, speed);
        return () => clearTimeout(t);
    }, [idx, text, speed, onComplete]);

    return (
        <span className={className}>
            {displayed}
            {idx < text.length && (
                <span className="animate-pulse text-pink-400">|</span>
            )}
        </span>
    );
}
