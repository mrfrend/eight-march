'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const FLOWERS = ['🌸', '🌺', '🌹', '🌷', '🌼', '💐', '🌻', '🌸', '🌺', '🌹', '🌷'];
const SECRET_INDEX = 4; // index of the special flower

interface FindFlowerTaskProps {
    letter: string;
    onComplete: () => void;
}

export function FindFlowerTask({ letter, onComplete }: FindFlowerTaskProps) {
    const [found, setFound] = useState(false);

    const flowerPositions = useMemo(() => {
        return FLOWERS.map((emoji, i) => ({
            id: i,
            emoji,
            isSecret: i === SECRET_INDEX,
            x: 5 + (i % 4) * 24 + Math.random() * 8,
            y: 5 + Math.floor(i / 4) * 32 + Math.random() * 8,
            size: 32 + Math.floor(Math.random() * 20),
            rotate: Math.random() * 30 - 15,
            delay: i * 0.1,
        }));
    }, []);

    const handleFlowerClick = (isSecret: boolean) => {
        if (found) return;
        if (isSecret) {
            setFound(true);
            toast.success(`🌸 Нашла особенный цветок! Получаешь ${letter === '!' || letter === '?' ? 'символ' : 'букву'} ${letter}!`, { duration: 3000 });
            setTimeout(onComplete, 1200);
        } else {
            toast.info('Не тот цветок... Ищи дальше! 🔍', { duration: 1200 });
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-center text-navy/60">
                Среди этих цветов спрятан один особенный. Сможешь найти его без подсказок?
            </p>

            <div className="relative h-72 rounded-3xl bg-gradient-to-br from-mint via-pink-50 to-lavender border-2 border-pink-100 overflow-hidden">
                {flowerPositions.map((f) => (
                    <motion.button
                        key={f.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: f.rotate }}
                        transition={{ delay: f.delay, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleFlowerClick(f.isSecret)}
                        style={{
                            left: `${f.x}%`,
                            top: `${f.y}%`,
                            fontSize: f.size,
                        }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
                        aria-label={f.isSecret ? 'Особенный цветок' : 'Обычный цветок'}
                    >
                        {f.emoji}
                        {f.isSecret && (
                            <motion.span
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                                className="absolute inset-0 flex items-center justify-center text-yellow-300 text-xl"
                            >
                                ✨
                            </motion.span>
                        )}
                    </motion.button>
                ))}

                {found && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-3xl">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                            <div className="text-5xl mb-2">⭐</div>
                            <p className="font-comfortaa font-bold text-navy">Найдено!</p>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
