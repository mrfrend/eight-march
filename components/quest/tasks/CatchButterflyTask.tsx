'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const TARGET_CLICKS = 5;
const TIME_TO_MOVE = 450;

function getRandomPosition() {
    return {
        x: 10 + Math.random() * 75,
        y: 10 + Math.random() * 70,
    };
}

interface CatchButterflyTaskProps {
    letter: string;
    onComplete: () => void;
}

export function CatchButterflyTask({ letter, onComplete }: CatchButterflyTaskProps) {
    const [catches, setCatches] = useState(0);
    const [pos, setPos] = useState(getRandomPosition);
    const [isFlapping, setIsFlapping] = useState(false);
    const [done, setDone] = useState(false);

    // Move butterfly every 1.5 seconds
    useEffect(() => {
        if (done) return;
        const interval = setInterval(() => {
            setPos(getRandomPosition());
        }, TIME_TO_MOVE);
        return () => clearInterval(interval);
    }, [done]);

    const handleCatch = useCallback(() => {
        if (done) return;
        setIsFlapping(true);
        setTimeout(() => setIsFlapping(false), 300);
        setPos(getRandomPosition());

        setCatches((prev) => {
            const next = prev + 1;
            if (next >= TARGET_CLICKS) {
                setDone(true);
                toast.success(`🦋 Поймала! Получаешь ${letter === '!' || letter === '?' ? 'символ' : 'букву'} ${letter}!`, { duration: 3000 });
                setTimeout(onComplete, 1000);
            } else {
                toast.info(`🦋 Почти! Поймано: ${next}/${TARGET_CLICKS}`, { duration: 1000 });
            }
            return next;
        });
    }, [done, onComplete]);

    return (
        <div className="space-y-4">
            {/* Counter */}
            <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-pink-50 rounded-2xl px-6 py-3 border border-pink-100">
                    <span className="text-2xl">🦋</span>
                    <span className="font-comfortaa font-bold text-navy text-lg">
                        Поймано: {catches} / {TARGET_CLICKS}
                    </span>
                </div>
            </div>

            {/* Catch area */}
            <div className="relative h-64 rounded-3xl bg-gradient-to-br from-sky-50 via-rose-50 to-mint border-2 border-dashed border-pink-200 overflow-hidden">
                {/* Decorative flowers */}
                <span className="absolute bottom-2 left-4 text-3xl opacity-40">🌸</span>
                <span className="absolute bottom-2 right-6 text-2xl opacity-40">🌺</span>
                <span className="absolute top-3 left-8 text-xl opacity-30">🌼</span>

                {/* Butterfly */}
                <AnimatePresence mode="wait">
                    {!done && (
                        <motion.button
                            key={`${pos.x}-${pos.y}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotate: [0, 5, -5, 0],
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.15 }}
                            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                            onClick={handleCatch}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-4xl cursor-pointer select-none hover:scale-110 transition-transform"
                            aria-label="Поймай бабочку"
                        >
                            <motion.span
                                animate={{ scaleX: isFlapping ? [1, 0.4, 1] : 1 }}
                                transition={{ duration: 0.2 }}
                                className="block"
                            >
                                🦋
                            </motion.span>
                        </motion.button>
                    )}
                </AnimatePresence>

                {done && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center"
                        >
                            <div className="text-5xl mb-2">🎉</div>
                            <p className="font-comfortaa font-bold text-navy">Поймала!</p>
                        </motion.div>
                    </div>
                )}
            </div>
            <p className="text-center text-xs text-navy/50">Докажи свою реакцию — поймай бабочку 5 раз!</p>
        </div>
    );
}
