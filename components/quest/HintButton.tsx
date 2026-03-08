'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/lib/store';
import { toast } from 'sonner';

interface HintButtonProps {
    hint: string;
}

export function HintButton({ hint }: HintButtonProps) {
    const [revealed, setRevealed] = useState(false);
    const useHint = useGameStore((s) => s.useHint);

    const handleReveal = () => {
        if (!revealed) {
            useHint();
            setRevealed(true);
            toast.info('💡 Подсказка открыта!', { duration: 2000 });
        }
    };

    return (
        <div className="space-y-2">
            <Button
                variant="outline"
                size="sm"
                onClick={handleReveal}
                disabled={revealed}
                className="gap-2 border-lavender-dark text-navy/70 hover:bg-lavender/50"
            >
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                {revealed ? 'Подсказка открыта' : 'Показать подсказку'}
            </Button>

            <AnimatePresence>
                {revealed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-sm text-navy/80">
                            <span className="font-semibold text-yellow-600">💡 Подсказка: </span>
                            {hint}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
