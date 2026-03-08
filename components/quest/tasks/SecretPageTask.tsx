'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/lib/store';
import { ExternalLink, MapPin } from 'lucide-react';

interface SecretPageTaskProps {
    onComplete: () => void;
}

export function SecretPageTask({ onComplete }: SecretPageTaskProps) {
    const { secretPageVisited } = useGameStore();
    const router = useRouter();
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    useEffect(() => {
        if (secretPageVisited) {
            onComplete();
        }
    }, [secretPageVisited, onComplete]);

    return (
        <div className="space-y-6">
            {/* Map illustration */}
            <div className="rounded-2xl bg-gradient-to-br from-navy/5 to-lavender/30 border border-lavender-dark/20 p-6 text-center space-y-3">
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl"
                >
                    🗺️
                </motion.div>
                <p className="text-navy/70 text-sm">
                    Информатор оставил след по особому адресу...
                </p>
                <div className="inline-flex items-center gap-2 bg-navy text-white rounded-xl px-4 py-2 font-mono text-sm">
                    <MapPin className="w-4 h-4 text-pink-300" />
                    <span className="text-pink-300">{origin}</span>
                    <span className="text-yellow-300">...</span>
                </div>
            </div>

            <p className="text-center text-navy/60 text-sm">
                Перейди на секретную страницу, чтобы получить следующую букву. После возвращайся сюда!
            </p>

            {/* <Button
                onClick={() => router.push('/secret')}
                className="w-full bg-gradient-to-r from-navy to-navy-light hover:opacity-90 text-white font-semibold rounded-xl py-3 shadow-lg gap-2"
            >
                <ExternalLink className="w-5 h-5" />
                Перейти на /secret
            </Button> */}

            {secretPageVisited && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-4 rounded-2xl bg-green-50 border border-green-200"
                >
                    <p className="text-green-700 font-semibold">✅ Ты уже посетила секретную страницу!</p>
                </motion.div>
            )}
        </div>
    );
}
