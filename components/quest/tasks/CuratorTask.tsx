'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const FLOWERS = ['🌸', '🌺', '🌹', '🌷', '🌼'];
const CORRECT_INDEX = 2; // 🌹 — самый красивый

interface CuratorTaskProps {
    onComplete: () => void;
}

export function CuratorTask({ onComplete }: CuratorTaskProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [done, setDone] = useState(false);

    const handlePick = (i: number) => {
        if (done) return;
        setSelected(i);
    };

    const handleSubmit = () => {
        if (selected === null) return;
        setDone(true);
        toast.success('🌹 Прекрасный выбор! Миссия выполнена!', { duration: 3000 });
        setTimeout(onComplete, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-peach to-lavender border border-purple-200 p-5 text-center">
                <p className="text-3xl mb-2">👑</p>
                <p className="font-comfortaa font-bold text-navy text-lg">Задание куратора</p>
                <p className="text-navy/60 text-sm mt-1">Выбери самый красивый цветок — и миссия завершена!</p>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
                {FLOWERS.map((flower, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePick(i)}
                        className={`
              w-20 h-20 rounded-2xl text-4xl flex items-center justify-center
              border-2 transition-all duration-200 shadow-sm
              ${selected === i
                                ? 'border-pink-400 bg-pink-50 scale-110 shadow-md ring-2 ring-pink-300'
                                : 'border-pink-100 bg-white hover:border-pink-300'
                            }
            `}
                    >
                        {flower}
                    </motion.button>
                ))}
            </div>

            <Button
                onClick={handleSubmit}
                disabled={selected === null || done}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-xl py-3 shadow-lg"
            >
                {done ? '🎉 Миссия выполнена!' : '💐 Это мой выбор!'}
            </Button>
        </div>
    );
}
