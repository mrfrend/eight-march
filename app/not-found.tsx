'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FloatingFlowers } from '@/components/effects/FloatingFlowers';
import { Home } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
            <FloatingFlowers count={8} />

            <div className="relative z-10 w-full max-w-md mx-auto text-center space-y-8">
                {/* 404 display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="space-y-2"
                >
                    <div className="font-comfortaa font-black text-9xl text-gradient-rose opacity-30 select-none">
                        404
                    </div>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-3xl p-8 shadow-xl border border-white/60 space-y-5"
                >
                    <motion.div
                        animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-6xl"
                    >
                        🐰
                    </motion.div>

                    <div className="space-y-2">
                        <h1 className="font-comfortaa font-bold text-2xl text-navy">
                            Страница засекречена!
                        </h1>
                        <p className="text-navy/60 leading-relaxed">
                            Агент, ты зашла не туда! Эта страница либо не существует,
                            либо слишком хорошо засекречена 🔐
                        </p>
                    </div>

                    {/* Easter egg badge */}
                    <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-2">
                        <span className="text-xl">🥚</span>
                        <span className="text-sm font-semibold text-yellow-700">
                            Ты нашла пасхалку! +100 очков 🎉
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={() => router.push('/')}
                            className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold rounded-xl gap-2"
                        >
                            <Home className="w-4 h-4" />
                            На базу
                        </Button>
                        <Button
                            onClick={() => router.push('/quest')}
                            variant="outline"
                            className="flex-1 border-lavender-dark/30 text-navy hover:bg-lavender/50 rounded-xl"
                        >
                            К миссии 🕵️‍♀️
                        </Button>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-navy/30 text-xs"
                >
                    С 8 Марта! Даже 404 бывает праздничным 🌸
                </motion.p>
            </div>
        </main>
    );
}
