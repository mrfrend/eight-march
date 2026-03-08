'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { GROUP_SIZE } from '@/lib/data';

const QUIZ_OPTIONS = [22, GROUP_SIZE, 30, 18];

interface QuizTaskProps {
    letter: string;
    onComplete: () => void;
}

export function QuizTask({ letter, onComplete }: QuizTaskProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (selected === null) return;
        setSubmitted(true);
        if (selected === GROUP_SIZE) {
            toast.success(`🎉 Верно! В группе ${GROUP_SIZE} агентов! Получаешь ${letter === '!' || letter === '?' ? 'символ' : 'букву'} ${letter}!`, { duration: 3000 });
            setTimeout(onComplete, 1000);
        } else {
            toast.error('Не совсем верно... Подумай ещё! 🤔', { duration: 2000 });
            setTimeout(() => { setSelected(null); setSubmitted(false); }, 1500);
        }
    };

    const optionColors = [
        'from-pink-200 to-rose-200 border-pink-300',
        'from-lavender to-purple-200 border-purple-300',
        'from-mint to-green-200 border-green-300',
        'from-peach to-orange-200 border-orange-300',
    ];

    return (
        <div className="space-y-6">
            {/* Question */}
            <div className="rounded-2xl bg-gradient-to-br from-peach to-amber-100 border border-amber-200 p-5 text-center">
                <p className="text-2xl mb-2">🤔</p>
                <p className="font-comfortaa font-bold text-navy text-lg leading-snug">
                    Сколько прекрасных агентов в вашей группе?
                </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
                {QUIZ_OPTIONS.map((opt, i) => (
                    <motion.button
                        key={opt}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => !submitted && setSelected(opt)}
                        className={`
              h-16 rounded-2xl border-2 font-comfortaa font-bold text-2xl text-navy
              bg-gradient-to-br ${optionColors[i]}
              transition-all duration-150 shadow-sm
              ${selected === opt ? 'ring-2 ring-offset-2 ring-pink-400 scale-105' : ''}
            `}
                    >
                        {opt}
                    </motion.button>
                ))}
            </div>

            <Button
                onClick={handleSubmit}
                disabled={selected === null || submitted}
                className="w-full bg-gradient-to-r from-violet-400 to-purple-400 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl py-3 shadow-lg"
            >
                ✅ Подтвердить ответ
            </Button>
        </div>
    );
}
