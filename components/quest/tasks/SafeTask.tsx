'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useGameStore } from '@/lib/store';
import { PLAYER_SAFE_DATA } from '@/lib/data';

interface SafeTaskProps {
    letter: string;
    onComplete: () => void;
}

export function SafeTask({ letter, onComplete }: SafeTaskProps) {
    const { playerName } = useGameStore();
    const safeData = playerName && PLAYER_SAFE_DATA[playerName] ? PLAYER_SAFE_DATA[playerName] : PLAYER_SAFE_DATA['default'];

    const [dials, setDials] = useState([0, 0, 0]);

    const changeDial = (index: number, delta: number) => {
        setDials(prev => {
            const next = [...prev];
            let val = next[index] + delta;
            if (val > 9) val = 0;
            if (val < 0) val = 9;
            next[index] = val;
            return next;
        });
    };

    const handleUnlock = () => {
        const attempt = dials.join('');
        if (attempt === safeData.answer) {
            toast.success(`🔓 Сейф открыт! Получаешь ${letter === '!' || letter === '?' ? 'символ' : 'букву'} ${letter}!`, { duration: 3000 });
            onComplete();
        } else {
            toast.error('Доступ запрещён! Код неверный.', { duration: 2000 });
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 p-6 rounded-3xl shadow-2xl border-4 border-zinc-700 max-w-sm mx-auto">
                <div className="text-center mb-6">
                    <p className="font-mono text-zinc-400 text-sm tracking-widest uppercase mb-1">Electronic Safe</p>
                    <div className="h-2 w-16 bg-red-500/20 mx-auto rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-1/3 animate-pulse"></div>
                    </div>
                </div>

                {/* Dials */}
                <div className="flex justify-center gap-4 mb-8">
                    {dials.map((digit, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <button
                                onClick={() => changeDial(i, 1)}
                                className="w-12 h-10 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-t-xl transition-colors flex items-center justify-center"
                            >
                                ▲
                            </button>
                            <div className="w-16 h-20 bg-black border-2 border-zinc-700 flex items-center justify-center shadow-inner">
                                <span className="font-mono text-4xl text-green-400 font-bold drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                                    {digit}
                                </span>
                            </div>
                            <button
                                onClick={() => changeDial(i, -1)}
                                className="w-12 h-10 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-b-xl transition-colors flex items-center justify-center"
                            >
                                ▼
                            </button>
                        </div>
                    ))}
                </div>

                <Button
                    onClick={handleUnlock}
                    className="w-full h-14 bg-zinc-700 hover:bg-zinc-600 border border-zinc-500 text-white font-bold tracking-widest rounded-xl transition-all shadow-lg active:scale-95"
                >
                    ENTER
                </Button>
            </div>

            {/* Clues */}
            <div className="bg-pink-50 border border-pink-100 p-4 rounded-2xl space-y-3 shadow-inner">
                <p className="text-xs font-bold text-pink-400 uppercase tracking-widest text-center mb-2">
                    Подсказки
                </p>
                {safeData.clues.map((clue, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <div className="flex gap-1">
                            {clue.digits.map((d, j) => (
                                <span key={j} className="w-6 h-6 bg-white border border-pink-200 rounded flex items-center justify-center font-mono font-bold text-sm text-navy">
                                    {d}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-navy/70 uppercase leading-snug flex-1">
                            {clue.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
