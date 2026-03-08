'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useGameStore } from '@/lib/store';
import { PLAYER_PUZZLES } from '@/lib/data';

const GRID_SIZE = 3;
const TOTAL = GRID_SIZE * GRID_SIZE;

interface PuzzleTaskProps {
    letter: string;
    onComplete: () => void;
}

export function PuzzleTask({ letter, onComplete }: PuzzleTaskProps) {
    const { playerName } = useGameStore();
    const bgUrl = playerName && PLAYER_PUZZLES[playerName] ? PLAYER_PUZZLES[playerName] : PLAYER_PUZZLES['default'];

    const [items, setItems] = useState<number[]>(() => {
        const arr = Array.from({ length: TOTAL }, (_, i) => i);
        let shuffled = [...arr];
        // Убедимся, что пазл не собран изначально
        while (shuffled.every((v, i) => v === i)) {
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
        }
        return shuffled;
    });

    const [solved, setSolved] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const isSolved = (arr: number[]) => arr.every((v, i) => v === i);

    const handleTileClick = (idx: number) => {
        if (solved) return;

        if (selectedIdx === null) {
            setSelectedIdx(idx);
        } else if (selectedIdx === idx) {
            setSelectedIdx(null); // отмена выбора
        } else {
            // Меняем кусочки местами
            setItems((prev) => {
                const next = [...prev];
                const temp = next[selectedIdx];
                next[selectedIdx] = next[idx];
                next[idx] = temp;

                if (isSolved(next)) {
                    setSolved(true);
                    toast.success(`🧩 Пазл собран! Получаешь ${letter === '!' || letter === '?' ? 'символ' : 'букву'} ${letter}!`, { duration: 3000 });
                    setTimeout(onComplete, 1500);
                }
                return next;
            });
            setSelectedIdx(null);
        }
    };

    return (
        <div className="space-y-5">
            <p className="text-sm font-medium text-navy/70 text-center bg-pink-50 rounded-xl p-3 border border-pink-100">
                Нажми на один кусочек, затем на другой, чтобы поменять их местами ✨
            </p>

            <div className="grid grid-cols-3 gap-1.5 max-w-sm mx-auto bg-white/50 rounded-xl p-1.5">
                {items.map((id, index) => {
                    const isSelected = selectedIdx === index;
                    return (
                        <motion.div
                            key={id}
                            layout
                            onClick={() => handleTileClick(index)}
                            initial={false}
                            animate={{
                                scale: isSelected ? 0.95 : 1,
                                opacity: (selectedIdx !== null && !isSelected) ? 0.8 : 1,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className={`aspect-square rounded-lg cursor-pointer transition-colors shadow-sm select-none border-2 ${isSelected ? 'border-pink-500 z-10 ring-2 ring-pink-300 ring-offset-1' : 'border-white hover:border-pink-300'
                                }`}
                            style={{
                                backgroundImage: `url(${bgUrl})`,
                                backgroundSize: `${GRID_SIZE * 100}%`,
                                backgroundPosition: `${(id % GRID_SIZE) * 50}% ${Math.floor(id / GRID_SIZE) * 50}%`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Reference thumbnail */}
            <div className="flex items-center justify-center gap-3 text-sm text-navy/60 font-medium">
                <div
                    className="w-14 h-14 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
                    style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover' }}
                />
                <span>Ориентируйся на это фото</span>
            </div>

            {solved && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Button
                        onClick={onComplete}
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-white font-semibold rounded-xl py-3 shadow-lg"
                    >
                        🎉 Получить {letter === '!' || letter === '?' ? 'символ' : 'букву'} {letter}!
                    </Button>
                </motion.div>
            )}
        </div>
    );
}
