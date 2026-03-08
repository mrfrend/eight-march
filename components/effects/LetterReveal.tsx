'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface LetterRevealProps {
    letter: string | null; // null = ★
    show: boolean;
    className?: string;
}

export function LetterReveal({ letter, show, className = '' }: LetterRevealProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ scale: 0, rotate: -15, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative inline-flex items-center justify-center ${className}`}
                >
                    {/* Glow rings */}
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-yellow-300/40 blur-md"
                    />
                    {/* Card */}
                    <div className="relative w-20 h-24 rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-200 to-yellow-400 shadow-xl flex items-center justify-center animate-glow-pulse border-2 border-yellow-200">
                        <span className="font-comfortaa font-black text-4xl text-navy drop-shadow-sm">
                            {letter ?? '★'}
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
