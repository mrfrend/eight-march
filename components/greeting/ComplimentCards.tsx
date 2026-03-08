'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComplimentCardsProps {
    compliments: string[];
}

export function ComplimentCards({ compliments }: ComplimentCardsProps) {
    const [flipped, setFlipped] = useState<boolean[]>(() => compliments.map(() => false));

    const toggleFlip = (i: number) => {
        setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    };

    return (
        <div className="space-y-2">
            <p className="text-xs font-semibold text-navy/50 uppercase tracking-wider">
                Анонимные комплименты 🕵️
            </p>
            <div className="space-y-2">
                {compliments.map((text, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.12 }}
                        onClick={() => toggleFlip(i)}
                        className="cursor-pointer"
                    >
                        <AnimatePresence mode="wait">
                            {!flipped[i] ? (
                                <motion.div
                                    key="front"
                                    initial={{ rotateY: 90 }}
                                    animate={{ rotateY: 0 }}
                                    exit={{ rotateY: -90 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex items-center gap-3 bg-pink-50/80 hover:bg-pink-100/80 border border-pink-100 hover:border-pink-200 rounded-xl px-4 py-3 transition-colors"
                                >
                                    <span className="text-xl flex-shrink-0">💌</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-navy/80 leading-snug">{text}</p>
                                        <p className="text-xs text-navy/40 mt-0.5">— Аноним 🕵️‍♂️</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="back"
                                    initial={{ rotateY: 90 }}
                                    animate={{ rotateY: 0 }}
                                    exit={{ rotateY: -90 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex items-center gap-3 bg-lavender/50 border border-lavender-dark/20 rounded-xl px-4 py-3"
                                >
                                    <span className="text-xl flex-shrink-0">🌸</span>
                                    <p className="text-sm text-navy/60 italic">Нажми снова, чтобы прочитать ещё раз</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
            <p className="text-xs text-navy/30 text-center pt-1">Нажми на карточку, чтобы «перевернуть» ✨</p>
        </div>
    );
}
