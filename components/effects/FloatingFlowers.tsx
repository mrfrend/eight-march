'use client';

import { useEffect, useState } from 'react';

const FLOWERS = ['🌸', '🌺', '🌹', '🌷', '🌼', '💐', '🌻'];

interface Flower {
    id: number;
    emoji: string;
    x: number;
    duration: number;
    delay: number;
    size: number;
}

export function FloatingFlowers({ count = 12 }: { count?: number }) {
    const [flowers, setFlowers] = useState<Flower[]>([]);

    useEffect(() => {
        // Ограничиваем количество для мобильных непосредственно здесь
        // предотвращая перерендер компонента Home
        const actualCount = window.innerWidth < 768 ? Math.min(8, count) : count;

        const generated: Flower[] = Array.from({ length: actualCount }, (_, i) => ({
            id: i,
            emoji: FLOWERS[i % FLOWERS.length],
            x: Math.random() * 100,
            duration: 8 + Math.random() * 8,
            delay: Math.random() * 5,
            size: 16 + Math.floor(Math.random() * 20),
        }));

        setFlowers(generated);
    }, [count]);

    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
            {flowers.map((f) => (
                <span
                    key={f.id}
                    className="absolute select-none"
                    style={{
                        left: `${f.x}%`,
                        top: '-40px',
                        fontSize: f.size,
                        animation: `petals-fall ${f.duration}s linear ${f.delay}s infinite`,
                        opacity: 0.7,
                    }}
                >
                    {f.emoji}
                </span>
            ))}
        </div>
    );
}
