'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMPLIMENT_POOL = [
    'Ты умеешь делать жизнь ярче своим присутствием ✨',
    'Твоя улыбка — настоящее произведение искусства 🌸',
    'Ты вдохновляешь людей вокруг, даже не осознавая этого 💫',
    'Твоя доброта — редкий и ценный дар 💛',
    'Ты справляешься с трудностями так, словно они специально для тебя лёгкие 💪',
    'Твой стиль и вкус — всегда выше похвал 👑',
    'Ты умеешь слышать других — это невероятная способность 🌿',
    'Рядом с тобой люди чувствуют себя лучше 🌷',
    'Ты — человек, который делает всё по-настоящему 🔥',
    'Твоя оригинальность делает мир интереснее 🎨',
    'Ты умеешь находить красоту в обычных вещах 🌼',
    'Твоя уверенность притягивает внимание 🌟',
    'С тобой любой разговор становится запоминающимся 💬',
    'Ты — источник позитива для всей группы ☀️',
    'Твоя искренность — одно из лучших твоих качеств 🤍',
];

export function ComplimentGenerator() {
    const [current, setCurrent] = useState<string>(COMPLIMENT_POOL[0]);
    const [key, setKey] = useState(0);

    useEffect(() => {
        // Устанавливаем первый случайный комплимент только на клиенте
        const initialRandom = COMPLIMENT_POOL[Math.floor(Math.random() * COMPLIMENT_POOL.length)];
        setCurrent(initialRandom);

        const interval = setInterval(() => {
            setCurrent((prev) => {
                const pool = COMPLIMENT_POOL.filter((c) => c !== prev);
                return pool[Math.floor(Math.random() * pool.length)];
            });
            setKey((k) => k + 1);
        }, 5000); // Смена каждые 5 секунд

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-3 mt-1">
            <AnimatePresence mode="wait">
                <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.8 }}
                    className="rounded-2xl bg-gradient-to-br from-pink-50 to-lavender/40 border border-pink-100/50 px-5 py-6 text-center shadow-sm min-h-[100px] flex items-center justify-center"
                >
                    <p className="text-navy/80 font-medium text-sm leading-relaxed">{current}</p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
