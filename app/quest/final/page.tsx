'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { ConfettiEffect } from '@/components/effects/Confetti';
import { FloatingFlowers } from '@/components/effects/FloatingFlowers';
import { Button } from '@/components/ui/button';
import { Home, RotateCcw, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { PLAYER_SECRET_WORDS, PLAYER_FINAL_CODES } from '@/lib/data';

export default function FinalPage() {
    const { playerName, collectedLetters, hintsUsed, completedTasks, reset } = useGameStore();
    const router = useRouter();

    const currentWord = playerName && PLAYER_SECRET_WORDS[playerName] ? PLAYER_SECRET_WORDS[playerName] : 'РАДОСТЬ';
    const finalCode = playerName && PLAYER_FINAL_CODES[playerName] ? PLAYER_FINAL_CODES[playerName] : PLAYER_FINAL_CODES['default'];

    const [showConfetti, setShowConfetti] = useState(false);
    const [copied, setCopied] = useState(false);

    const ORGANIZERS: Record<string, string> = {
        'Соня': 'Ване',
        'Интизар': 'Ване',
        'Олеся': 'Дамиру',
        'Марина Юрьевна': 'Эльдару',
        'Вика': 'Эльдару',
        'Арина': 'Дамиру',
        'Настя': 'Дамиру',
        'Милена': 'Дамиру',
        'Ася': 'Артуру',
        'Карина': 'Артуру'
    };

    const responsibleGuy = playerName ? ORGANIZERS[playerName] || 'одному из парней' : 'одному из парней';

    useEffect(() => {
        setTimeout(() => setShowConfetti(true), 300);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(finalCode);
        setCopied(true);
        toast.success(`Код «${finalCode}» скопирован!`, {
            description: 'Теперь отправь его парням',
        });
        setTimeout(() => setCopied(false), 2000);
    };

    if (!playerName) {
        router.replace('/');
        return null;
    }

    const handleReset = () => {
        reset();
        router.push('/');
    };

    const letterColors = [
        'from-pink-300 to-rose-300',
        'from-violet-300 to-purple-300',
        'from-amber-300 to-yellow-300',
        'from-emerald-300 to-green-300',
        'from-sky-300 to-blue-300',
        'from-indigo-300 to-violet-300',
        'from-fuchsia-300 to-pink-300',
    ];

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
            <ConfettiEffect trigger={showConfetti} continuous duration={6000} />
            <FloatingFlowers count={20} />

            <div className="relative z-10 w-full max-w-lg mx-auto space-y-6">
                {/* Main celebration card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="glass rounded-3xl p-8 shadow-2xl border border-white/60 text-center space-y-6"
                >
                    {/* Stars header */}
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-5xl"
                    >
                        🎉
                    </motion.div>

                    <div className="space-y-1">
                        <h1 className="font-comfortaa font-black text-3xl text-gradient-rose">
                            Миссия выполнена!
                        </h1>
                        <p className="text-navy/60">
                            Агент <span className="font-bold text-navy">{playerName}</span> завершила квест!
                        </p>
                    </div>

                    {/* Secret word reveal */}
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-navy/50 uppercase tracking-wider">
                            Кодовое слово:
                        </p>
                        <div className="flex gap-2 justify-center">
                            {currentWord.split('').map((letter, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 300 }}
                                    className={`w-14 h-16 rounded-2xl bg-gradient-to-br ${letterColors[i]} shadow-lg flex items-center justify-center border-2 border-white animate-glow-pulse`}
                                >
                                    <span className="font-comfortaa font-black text-3xl text-white drop-shadow">
                                        {letter}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Gift certificate */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-dashed border-amber-300 p-6 space-y-3"
                    >
                        <div className="text-3xl">🎁</div>
                        <p className="font-comfortaa font-bold text-navy text-lg leading-tight">Секретный токен</p>
                        <p className="text-navy/60 text-sm">
                            Собранное слово успешно сгенерировало твой уникальный токен для получения подарка:
                            <span className="font-bold text-amber-600 block mt-2 text-xl truncate">«{finalCode}»</span>
                        </p>
                        <p className="text-navy/60 text-sm italic mt-1">
                            Отправь этот токен <strong>{responsibleGuy}</strong>, чтобы забрать свой подарок.
                        </p>

                        <div className="pt-2">
                            <Button
                                onClick={handleCopy}
                                className={`w-full font-bold shadow-md transition-all gap-2 py-6 rounded-xl text-md ${copied
                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                    : 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Код скопирован!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-5 h-5" />
                                        Скопировать «{finalCode}»
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="grid grid-cols-2 gap-3 text-center"
                    >
                        <div className="bg-pink-50 rounded-2xl p-3">
                            <p className="text-2xl font-comfortaa font-black text-pink-500">{completedTasks.length}</p>
                            <p className="text-xs text-navy/50">заданий пройдено</p>
                        </div>
                        <div className="bg-lavender/50 rounded-2xl p-3">
                            <p className="text-2xl font-comfortaa font-black text-violet-500">{hintsUsed}</p>
                            <p className="text-xs text-navy/50">подсказок использовано</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/')}
                        className="gap-2 border-pink-200 text-navy hover:bg-pink-50 rounded-xl"
                    >
                        <Home className="w-4 h-4" />
                        На главную
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        className="gap-2 border-violet-200 text-navy hover:bg-lavender/50 rounded-xl"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Заново
                    </Button>
                </div>

                <p className="text-center text-sm text-navy/40">
                    С 8 Марта! Ты настоящий агент! 🌸💕
                </p>
            </div>
        </main>
    );
}
