'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { PLAYER_SECRET_WORDS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { LetterReveal } from '@/components/effects/LetterReveal';
import { triggerConfetti } from '@/components/effects/Confetti';
import { ChevronLeft } from 'lucide-react';

export default function SecretPage() {
    const { playerName, visitSecretPage } = useGameStore();
    const router = useRouter();

    const currentWord = playerName && PLAYER_SECRET_WORDS[playerName] ? PLAYER_SECRET_WORDS[playerName] : 'РАДОСТЬ';
    const currentLetter = currentWord[1] || 'А';

    useEffect(() => {
        visitSecretPage();
        triggerConfetti();
    }, [visitSecretPage]);

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-br from-navy via-purple-900 to-indigo-900">
            {/* Stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto space-y-8 text-center">
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-7xl"
                >
                    🔮
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                >
                    <h1 className="font-comfortaa font-black text-3xl text-white">
                        Ты нашла секретную страницу!
                    </h1>
                    <p className="text-white/60 leading-relaxed">
                        Отличная работа, агент! Ты раскрыла местонахождение следующей буквы.
                    </p>
                </motion.div>

                {/* Letter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-3"
                >
                    <p className="text-white/50 text-sm font-semibold uppercase tracking-wider">
                        Получаешь букву:
                    </p>
                    <LetterReveal letter={currentLetter} show={true} />
                    <p className="text-white font-comfortaa font-bold text-xl">
                        {currentLetter === '!' || currentLetter === '?' ? `Символ «${currentLetter}» найден! 🎉` : `Буква «${currentLetter}» найдена! 🎉`}
                    </p>
                </motion.div>

                {/* Flowers peek */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center gap-2 text-3xl"
                >
                    {['🌸', '🌷', '🌺', '🌷', '🌸'].map((f, i) => (
                        <motion.span
                            key={i}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                            {f}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Button
                        onClick={() => router.push('/quest')}
                        className="bg-gradient-to-r from-pink-400 to-violet-400 text-white font-comfortaa font-bold rounded-2xl py-4 px-8 shadow-xl gap-2"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Вернуться к заданиям
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
