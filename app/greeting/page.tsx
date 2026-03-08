'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FloatingFlowers } from '@/components/effects/FloatingFlowers';
import { TypewriterText } from '@/components/effects/TypewriterText';
import { ComplimentCards } from '@/components/greeting/ComplimentCards';
import { NAMES, PERSONAL_GREETINGS, CURATOR_NAMES, ANONYMOUS_COMPLIMENTS } from '@/lib/data';
import { useGameStore } from '@/lib/store';
import { ChevronRight, Sparkles, User, Shield } from 'lucide-react';

type Step = 'name' | 'greeting' | 'quest-intro';

export default function GreetingPage() {
    const [step, setStep] = useState<Step>('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const { setPlayer } = useGameStore();
    const router = useRouter();

    const filteredNames = NAMES.filter((n) =>
        n.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isCurator = CURATOR_NAMES.includes(selectedName);

    const handleSelectName = (name: string) => {
        setSelectedName(name);
        setPlayer(name, CURATOR_NAMES.includes(name));
        setStep('greeting');
    };

    const handleStartQuest = () => {
        router.push('/quest');
    };

    const greeting = PERSONAL_GREETINGS[selectedName];
    const anonCompliments = ANONYMOUS_COMPLIMENTS[selectedName] ?? [];

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
            <FloatingFlowers count={10} />

            <div className="relative z-10 w-full max-w-lg mx-auto">
                <AnimatePresence mode="wait">

                    {/* ── Шаг 1: выбор имени ── */}
                    {step === 'name' && (
                        <motion.div
                            key="name-selection"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            className="glass rounded-3xl p-8 shadow-2xl border border-white/60 space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <div className="text-5xl mb-2">🕵️‍♀️</div>
                                <h1 className="font-comfortaa font-black text-2xl text-gradient-rose">
                                    Идентификация агента
                                </h1>
                                <p className="text-navy/60 text-sm">
                                    Выбери своё имя, чтобы получить персональное поздравление
                                </p>
                            </div>

                            {/* Search */}
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Поиск по имени..."
                                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-pink-400 outline-none bg-white/80 font-nunito text-navy placeholder:text-navy/30 transition-colors"
                                />
                            </div>

                            {/* Name grid */}
                            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                                {filteredNames.map((name, i) => (
                                    <motion.button
                                        key={name}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleSelectName(name)}
                                        className={`px-4 py-3 rounded-2xl text-left font-semibold text-navy border transition-all text-sm ${CURATOR_NAMES.includes(name)
                                            ? 'bg-lavender/60 hover:bg-lavender border-lavender-dark/30 hover:border-lavender-dark'
                                            : 'bg-pink-50/80 hover:bg-pink-100 border-pink-100 hover:border-pink-300'
                                            }`}
                                    >
                                        <span className="mr-2">{CURATOR_NAMES.includes(name) ? '👑' : '🌸'}</span>
                                        {name}
                                        {CURATOR_NAMES.includes(name) && (
                                            <span className="ml-1 text-xs text-purple-500">(куратор)</span>
                                        )}
                                    </motion.button>
                                ))}
                                {filteredNames.length === 0 && (
                                    <p className="col-span-2 text-center text-navy/40 text-sm py-4">
                                        Имя не найдено 😔
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Шаг 2: персональное поздравление + комплименты ── */}
                    {step === 'greeting' && greeting && (
                        <motion.div
                            key="greeting"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            className="space-y-5"
                        >
                            <div className="glass rounded-3xl p-8 shadow-2xl border border-white/60 space-y-5">
                                {/* Header */}
                                <div className="text-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-5xl mb-3"
                                    >
                                        {isCurator ? '👑' : '💌'}
                                    </motion.div>
                                    <h2 className="font-comfortaa font-black text-2xl text-gradient-rose">
                                        С 8 Марта, {selectedName}!
                                    </h2>
                                    {isCurator && (
                                        <span className="inline-block mt-1 text-xs bg-lavender border border-lavender-dark/30 text-purple-700 px-3 py-1 rounded-full font-semibold">
                                            Куратор группы 👑
                                        </span>
                                    )}
                                </div>

                                {/* Personal greeting */}
                                <div className="bg-pink-50/70 rounded-2xl p-4 border border-pink-100">
                                    <TypewriterText
                                        text={greeting.greeting}
                                        speed={30}
                                        className="text-navy/80 leading-relaxed"
                                    />
                                </div>

                                {/* Personal qualities */}
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-navy/50 uppercase tracking-wider">
                                        О тебе говорят:
                                    </p>
                                    <div className="space-y-1.5">
                                        {greeting.compliments.map((c, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + i * 0.12 }}
                                                className="flex items-start gap-2 bg-white/60 rounded-xl px-3 py-2 text-sm text-navy/80"
                                            >
                                                {c}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Anonymous compliments from guys */}
                                {anonCompliments.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                    >
                                        <ComplimentCards compliments={anonCompliments} />
                                    </motion.div>
                                )}

                                <Button
                                    onClick={() => setStep('quest-intro')}
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-pink-400 to-violet-400 text-white font-comfortaa font-bold text-lg rounded-2xl py-5 shadow-xl gap-2"
                                >
                                    Продолжить
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>

                            <button
                                onClick={() => setStep('name')}
                                className="w-full text-center text-sm text-navy/40 hover:text-navy/60 transition-colors"
                            >
                                ← Выбрать другое имя
                            </button>
                        </motion.div>
                    )}

                    {/* ── Шаг 3: предложение квеста ── */}
                    {step === 'quest-intro' && (
                        <motion.div
                            key="quest-intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass rounded-3xl p-8 shadow-2xl border border-white/60 space-y-6 text-center"
                        >
                            <motion.div
                                animate={{ rotate: [0, 8, -8, 0], y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-6xl"
                            >
                                🕵️‍♀️
                            </motion.div>

                            <div className="space-y-2">
                                <h2 className="font-comfortaa font-black text-2xl text-gradient-rose">
                                    Секретная миссия!
                                </h2>
                                <p className="text-navy/70 leading-relaxed">
                                    Агент <span className="font-bold text-navy">{selectedName}</span>, поздравления
                                    получены. Но это ещё не всё!
                                </p>
                                <p className="text-navy/60 text-sm leading-relaxed">
                                    Тебе предстоит пройти <span className="font-bold">7 заданий</span>, собрать буквы
                                    загаданного кодового слова и обменять
                                    его на подарочный сертификат. Готова?
                                </p>
                            </div>

                            {/* Mission details */}
                            <div className="grid grid-cols-2 gap-3 text-left">
                                {[
                                    { icon: '🎯', text: '7 заданий' },
                                    { icon: '⏱️', text: '10–15 минут' },
                                    { icon: '💡', text: 'Подсказки есть' },
                                    { icon: '🎁', text: 'Сертификат в конце' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="flex items-center gap-2 bg-pink-50/70 rounded-xl px-3 py-2"
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="text-sm font-semibold text-navy/70">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <Button
                                    onClick={handleStartQuest}
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-pink-400 via-rose-400 to-violet-400 text-white font-comfortaa font-bold text-lg rounded-2xl py-6 shadow-xl gap-2"
                                >
                                    <Shield className="w-5 h-5" />
                                    Принять миссию!
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                                <button
                                    onClick={() => setStep('greeting')}
                                    className="w-full text-center text-sm text-navy/40 hover:text-navy/60 transition-colors"
                                >
                                    ← Вернуться к поздравлению
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </main>
    );
}
