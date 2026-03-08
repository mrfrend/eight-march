'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
    trigger?: boolean;
    continuous?: boolean;
    duration?: number;
}

export function ConfettiEffect({ trigger = false, continuous = false, duration = 5000 }: ConfettiProps) {
    const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!trigger) return;

        const colors = ['#ff96b0', '#e8839f', '#c4a0e0', '#fde68a', '#86efac', '#fff'];

        const fire = () => {
            confetti({
                particleCount: 60,
                spread: 80,
                origin: { x: Math.random(), y: Math.random() * 0.4 },
                colors,
                shapes: ['circle', 'square'],
                scalar: 1.2,
            });
        };

        if (continuous) {
            const end = Date.now() + duration;
            const frame = () => {
                fire();
                if (Date.now() < end) {
                    animRef.current = setTimeout(frame, 300);
                }
            };
            frame();
        } else {
            fire();
            setTimeout(fire, 200);
            setTimeout(fire, 400);
        }

        return () => {
            if (animRef.current) clearTimeout(animRef.current);
        };
    }, [trigger, continuous, duration]);

    return null;
}

export function triggerConfetti() {
    const colors = ['#ff96b0', '#e8839f', '#c4a0e0', '#fde68a'];
    confetti({
        particleCount: 120,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors,
        scalar: 1.3,
    });
    setTimeout(() => {
        confetti({
            particleCount: 60,
            spread: 70,
            origin: { x: 0.2, y: 0.5 },
            colors,
        });
        confetti({
            particleCount: 60,
            spread: 70,
            origin: { x: 0.8, y: 0.5 },
            colors,
        });
    }, 300);
}
