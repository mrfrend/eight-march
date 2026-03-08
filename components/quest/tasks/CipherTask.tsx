'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { checkAnswer } from '@/lib/utils';
import { toast } from 'sonner';

interface CipherTaskProps {
    answer: string;
    letter: string;
    onComplete: () => void;
}

const CIPHER_TEXT = 'Х 5 Лзула!';
const DECODED_HINT_CHARS = ['С', ' ', '8', ' ', 'М', 'а', 'р', 'т', 'а', '!'];

export function CipherTask({ answer, letter, onComplete }: CipherTaskProps) {
    const [input, setInput] = useState('');
    const [wrong, setWrong] = useState(false);

    const handleSubmit = () => {
        if (checkAnswer(input, answer)) {
            toast.success(`🔓 Шифр взломан! Получаешь ${letter === '!' || letter === '?' ? 'символ' : 'букву'} ${letter}!`, { duration: 3000 });
            onComplete();
        } else {
            setWrong(true);
            toast.error('Не совсем верно... Попробуй ещё раз! 🔍', { duration: 2000 });
            setTimeout(() => setWrong(false), 600);
        }
    };

    return (
        <div className="space-y-6">
            {/* Cipher display */}
            <div className="rounded-2xl bg-navy/5 border border-navy/10 p-5 space-y-3">
                <p className="text-sm font-semibold text-navy/60 uppercase tracking-wider">Зашифрованное сообщение:</p>
                <div className="flex gap-2 flex-wrap justify-center">
                    {CIPHER_TEXT.split('').map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="w-10 h-12 rounded-xl bg-navy text-white font-comfortaa font-bold text-xl flex items-center justify-center shadow-md"
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Input */}
            <div className="space-y-3">
                <label className="text-sm font-semibold text-navy/70">Введи расшифрованный текст:</label>
                <motion.div
                    animate={wrong ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        placeholder="Например: мореанас"
                        className={`text-center text-lg font-comfortaa border-2 ${wrong ? 'border-red-400' : 'border-pink-200'} focus:border-pink-400`}
                    />
                </motion.div>
                <Button
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold rounded-xl py-3 shadow-lg"
                >
                    🔓 Расшифровать!
                </Button>
            </div>
        </div>
    );
}
