'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { TASKS } from '@/lib/tasks-config';
import { SECRET_WORD } from '@/lib/data';

export function QuestProgressBar() {
    const { completedTasks, collectedLetters } = useGameStore();
    const total = TASKS.length;
    const progress = (completedTasks.length / total) * 100;

    return (
        <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold text-navy/70">
                <span>Прогресс миссии</span>
                <span>{completedTasks.length} / {total}</span>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-pink-100 rounded-full overflow-hidden border border-pink-200">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            </div>

            {/* Collected letters */}
            {collectedLetters.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-navy/60 font-medium">Собрано:</span>
                    <div className="flex gap-1">
                        {collectedLetters.map((letter, i) => (
                            <motion.span
                                key={i}
                                initial={{ scale: 0, rotate: -15 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', delay: i * 0.1 }}
                                className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center font-comfortaa font-black text-navy text-sm shadow-sm"
                            >
                                {letter}
                            </motion.span>
                        ))}
                        {Array.from({ length: Math.max(0, SECRET_WORD.length - collectedLetters.length) }).map((_, i) => (
                            <span
                                key={`empty-${i}`}
                                className="w-7 h-7 rounded-lg bg-pink-100 border border-dashed border-pink-300 flex items-center justify-center text-pink-300 text-xs"
                            >
                                ?
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
