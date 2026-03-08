'use client';

import { motion } from 'framer-motion';
import { Person, ANONYMOUS_MESSAGES, CURATOR_NAMES } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/lib/store';
import { ChevronRight } from 'lucide-react';

export default function IndividualPage({ person }: { person: Person }) {
    const [openedMessages, setOpenedMessages] = useState<number[]>([]);
    const [clickCount, setClickCount] = useState(0);
    const router = useRouter();
    const { setPlayer } = useGameStore();

    const handleMessageOpen = (index: number) => {
        if (!openedMessages.includes(index)) {
            setOpenedMessages([...openedMessages, index]);
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.6 }
            });
        }
    };

    const handleNameClick = () => {
        setClickCount(clickCount + 1);
        // User requested easter egg: 7 clicks
        if (clickCount + 1 === 7) {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 }
            });
        }
    };

    const startQuest = () => {
        // Determine if curator based on existing logic or hardcoded name
        const isCurator = CURATOR_NAMES ? CURATOR_NAMES.includes(person.name) : false;
        setPlayer(person.name, isCurator);
        router.push('/quest');
    };

    return (
        <div className="min-h-screen bg-pink-50/30 overflow-hidden font-nunito">

            {/* SECTION 1: HERO */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Floating background elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-5xl opacity-30"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -40, 0],
                                rotate: [0, 15, -15, 0],
                            }}
                            transition={{
                                duration: 6 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {['🌸', '🌷', '✨', '💝', '🦋'][i % 5]}
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-10 text-center px-4 max-w-2xl mx-auto glass p-10 rounded-3xl shadow-2xl border border-white/60">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="mb-6"
                    >
                        <span className="inline-block text-xl font-bold bg-white/60 text-pink-500 px-4 py-1.5 rounded-full border border-pink-200 uppercase tracking-widest shadow-sm">
                            С 8 Марта!
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl sm:text-7xl font-black mb-4 text-gradient-rose cursor-pointer font-comfortaa leading-tight"
                        onClick={handleNameClick}
                    >
                        {person.name}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-navy/70 mt-6 leading-relaxed"
                    >
                        Специально для {person.id === '10' ? "Вас" : "тебя"} парни подготовили эту страницу ✨
                    </motion.p>
                </div>
            </section>

            {/* SECTION 2: PERSONAL TEXT */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="glass rounded-3xl p-8 sm:p-12 shadow-xl border border-white/60 text-center relative"
                    >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-7xl drop-shadow-md">
                            💌
                        </div>
                        <h2 className="text-3xl font-black mb-8 mt-4 font-comfortaa text-navy">
                            Кто ты для нас
                        </h2>
                        <div className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-pink-100/50">
                            <p className="text-navy/80 leading-relaxed text-lg sm:text-xl font-medium">
                                {person.personalText}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3: ANONYMOUS MESSAGES */}
            <section className="py-24 relative bg-white/40">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-black font-comfortaa text-navy mb-4">
                            16 анонимных голосов
                        </h2>
                        <p className="text-navy/60">Каждый из нас написал то, что думает. Открой карточки!</p>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {(ANONYMOUS_MESSAGES[person.name] || ANONYMOUS_MESSAGES['Вика']).slice(0, 16).map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index % 4) * 0.1 }}
                                className="relative h-40 sm:h-44"
                            >
                                <motion.button
                                    onClick={() => handleMessageOpen(index)}
                                    whileHover={{ scale: openedMessages.includes(index) ? 1 : 1.05 }}
                                    whileTap={{ scale: openedMessages.includes(index) ? 1 : 0.95 }}
                                    className={`w-full h-full rounded-2xl shadow-md border transition-all duration-500 overflow-hidden ${openedMessages.includes(index)
                                        ? 'bg-white border-pink-200/50 rotate-y-180'
                                        : 'bg-gradient-to-br from-pink-300 to-rose-400 border-pink-400/50 hover:shadow-lg hover:shadow-pink-300/30'
                                        }`}
                                >
                                    {openedMessages.includes(index) ? (
                                        <div className="p-4 w-full h-full flex flex-col text-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            <p className="text-xs sm:text-sm font-medium text-navy/80 leading-relaxed my-auto">«{message}»</p>
                                            <span className="text-[10px] text-navy/40 mt-3 flex-shrink-0 block uppercase tracking-wide font-bold">— Аноним</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-white">
                                            <span className="text-4xl sm:text-5xl mb-2 drop-shadow-sm">🤫</span>
                                            <span className="text-xs font-bold uppercase tracking-wider opacity-90">Нажми</span>
                                        </div>
                                    )}
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>

                    {openedMessages.length === 16 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 text-center"
                        >
                            <p className="text-2xl text-pink-600 font-bold font-comfortaa">
                                Ты прочитала всё! Мы старались ❤️
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* SECTION 4: QUALITIES CLOUD */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-black mb-12 font-comfortaa text-navy"
                    >
                        Твои суперсилы ⚡
                    </motion.h2>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 align-center">
                        {person.qualities.map((quality, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, type: "spring" }}
                                whileHover={{ scale: 1.15, zIndex: 10, rotate: Math.random() > 0.5 ? 2 : -2 }}
                                className="bg-white/80 border border-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-sm cursor-pointer hover:shadow-md hover:border-pink-200 transition-colors"
                            >
                                <span className="text-navy/80 font-bold whitespace-nowrap text-sm sm:text-base">{quality}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: SPECIAL QUOTE */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center bg-gradient-to-r from-transparent via-pink-100/50 to-transparent py-12 rounded-3xl"
                    >
                        <div className="text-5xl sm:text-7xl mb-6 text-pink-300 opacity-50 font-serif">❝</div>
                        <p className="text-2xl sm:text-3xl font-comfortaa text-navy font-bold leading-relaxed mb-6 px-4">
                            {person.specialWish}
                        </p>
                        <div className="text-5xl sm:text-7xl text-pink-300 opacity-50 font-serif rotate-180">❝</div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 6: CTA TO QUEST */}
            <section className="py-24 relative overflow-hidden">
                {/* Abstract background blobs */}
                <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-pink-300/30 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-2xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass p-10 sm:p-14 rounded-3xl shadow-2xl border border-white text-center space-y-8"
                    >
                        <div className="text-6xl animate-bounce mb-4">🎁</div>
                        <h2 className="text-3xl sm:text-4xl font-black font-comfortaa text-navy">
                            {person.name}, готова забрать свой подарок?
                        </h2>
                        <p className="text-lg text-navy/70 mb-8 max-w-md mx-auto">
                            Мы спрятали его за 7 заданиями. Пройди секретную миссию, чтобы получить кодовое слово.
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex justify-center"
                        >
                            <button
                                onClick={startQuest}
                                className="bg-gradient-to-r from-pink-500 hover:from-pink-600 to-rose-400 hover:to-rose-500 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl shadow-pink-500/30 flex items-center gap-3 transition-colors"
                            >
                                <span>Начать миссию</span>
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
