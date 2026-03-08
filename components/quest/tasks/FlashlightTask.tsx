'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useGameStore } from '@/lib/store';
import { PLAYER_FLASHLIGHT_PINS } from '@/lib/data';

interface FlashlightTaskProps {
    letter: string;
    onComplete: () => void;
}

export function FlashlightTask({ letter, onComplete }: FlashlightTaskProps) {
    const { playerName } = useGameStore();
    const secretPin = playerName && PLAYER_FLASHLIGHT_PINS[playerName] ? PLAYER_FLASHLIGHT_PINS[playerName] : PLAYER_FLASHLIGHT_PINS['default'];

    const [mounted, setMounted] = useState(false);
    const [input, setInput] = useState('');
    const [wrong, setWrong] = useState(false);
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [radius, setRadius] = useState(120); // Default radius

    useEffect(() => {
        setMounted(true);
        // Set radius dynamically based on screen width
        const updateRadius = () => {
            setRadius(window.innerWidth < 768 ? 150 : 120);
        };
        updateRadius(); // Set initially
        window.addEventListener('resize', updateRadius); // Update on resize
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        setPos({ x: clientX, y: clientY });
    };

    const handleLeave = () => {
        setPos({ x: -100, y: -100 });
    };

    const handleSubmit = () => {
        if (input === secretPin) {
            toast.success(`🔦 Секретный код найден! Получаешь ${letter === '!' || letter === '?' ? 'символ' : 'букву'} ${letter}!`, { duration: 3000 });
            onComplete();
        } else {
            setWrong(true);
            toast.error('Неверный код... Проверь порядок (сверху вниз)!', { duration: 2000 });
            setTimeout(() => setWrong(false), 800);
        }
    };

    if (!mounted) return null;

    const isVisible = pos.x >= 0;
    const maskStyle = {
        maskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%)`,
    };

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black overflow-hidden select-none"
        >
            {/* FULL SCREEN TOUCH INTERCEPTOR LAYER */}
            <div
                className="absolute inset-0 z-10 touch-none cursor-crosshair"
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onMouseLeave={handleLeave}
                onTouchEnd={handleLeave}
                onTouchStart={handleMove}
            ></div>

            {/* REVEAL LAYER */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={maskStyle}
            >
                {/* Background grid */}
                <div className="absolute inset-0 bg-zinc-950 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                {/* PIN digits — все четыре в верхних 58% экрана, чтобы не уходить под UI-панель */}
                <span className="absolute text-pink-500 font-mono font-black text-5xl sm:text-6xl drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" style={{ top: '12%', left: '22%' }}>{secretPin[0]}</span>
                <span className="absolute text-pink-500 font-mono font-black text-5xl sm:text-6xl drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" style={{ top: '30%', left: '70%' }}>{secretPin[1]}</span>
                <span className="absolute text-pink-500 font-mono font-black text-5xl sm:text-6xl drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" style={{ top: '50%', left: '25%' }}>{secretPin[2]}</span>
                <span className="absolute text-pink-500 font-mono font-black text-5xl sm:text-6xl drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" style={{ top: '62%', left: '62%' }}>{secretPin[3]}</span>

                {/* Distractions (Letters and non-digit symbols) */}
                <span className="absolute text-zinc-600 font-mono text-3xl" style={{ top: '22%', left: '60%' }}>K</span>
                <span className="absolute text-zinc-600 font-mono text-4xl" style={{ top: '45%', left: '20%' }}>#</span>
                <span className="absolute text-zinc-600 font-mono text-2xl" style={{ top: '65%', left: '80%' }}>W</span>
                <span className="absolute text-zinc-600 font-mono text-2xl" style={{ top: '85%', left: '35%' }}>?</span>
                <span className="absolute text-zinc-600 font-mono text-xl opacity-50 tracking-widest" style={{ top: '90%', left: '10%' }}>A</span>
                <span className="absolute text-zinc-700 font-mono text-sm opacity-40 font-bold tracking-widest" style={{ top: '50%', left: '45%' }}>NO SIGNAL</span>
            </div>

            {/* Glow effect for the flashlight spot */}
            <div
                className={`absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    background: `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, rgba(236, 72, 153, 0.15) 0%, transparent 100%)`
                }}
            />

            {/* UI Overlay */}
            <div className="absolute z-20 bottom-8 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md pointer-events-auto flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl shadow-2xl space-y-4 w-full">
                    <p className="text-sm text-white/90 text-center font-medium leading-relaxed">
                        Наведи фонарик на стену, чтобы найти ПИН-код.<br />
                        <span className="text-pink-300 font-bold">Собери цифры сверху вниз.</span>
                    </p>
                    <div className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value.replace(/\D/g, ''))}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="ПИН-КОД"
                            className={`text-center font-bold tracking-widest bg-black/40 text-white placeholder:text-white/40 border-white/20 h-14 text-lg ${wrong ? 'border-red-500 focus-visible:ring-red-500 animate-shake' : 'focus-visible:ring-pink-400'}`}
                            maxLength={4}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                        <Button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold h-14 px-6 rounded-xl border border-white/20 shrink-0"
                        >
                            Ввод
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>,
        document.body
    );
}
