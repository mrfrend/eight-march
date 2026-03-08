'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/lib/tasks-config';
import { useGameStore } from '@/lib/store';
import { PLAYER_SECRET_WORDS } from '@/lib/data';
import { triggerConfetti } from '@/components/effects/Confetti';
import { LetterReveal } from '@/components/effects/LetterReveal';
import { HintButton } from '@/components/quest/HintButton';
import { CipherTask } from '@/components/quest/tasks/CipherTask';
import { SecretPageTask } from '@/components/quest/tasks/SecretPageTask';
import { PuzzleTask } from '@/components/quest/tasks/PuzzleTask';
import { SafeTask } from '@/components/quest/tasks/SafeTask';
import { CatchButterflyTask } from '@/components/quest/tasks/CatchButterflyTask';
import { FlashlightTask } from '@/components/quest/tasks/FlashlightTask';
import { SourceCodeTask } from '@/components/quest/tasks/SourceCodeTask';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield } from 'lucide-react';

interface TaskRendererProps {
    task: Task;
    taskIndex: number;
}

export function TaskRenderer({ task, taskIndex }: TaskRendererProps) {
    const [completed, setCompleted] = useState(false);
    const { completeTask, playerName } = useGameStore();
    const router = useRouter();

    const currentWord = playerName && PLAYER_SECRET_WORDS[playerName] ? PLAYER_SECRET_WORDS[playerName] : 'РАДОСТЬ';
    const currentLetter = currentWord[taskIndex];

    const [canSkip, setCanSkip] = useState(false);
    const [skipTimeLeft, setSkipTimeLeft] = useState(120);

    useEffect(() => {
        if (completed) return;

        const timer = setInterval(() => {
            setSkipTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanSkip(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [completed]);

    const handleComplete = useCallback(() => {
        if (completed) return;
        setCompleted(true);
        completeTask(taskIndex, currentLetter);
        triggerConfetti();
    }, [completed, completeTask, taskIndex, currentLetter]);

    const handleNext = () => {
        if (taskIndex >= 6) {
            router.push('/quest/final');
        }
    };

    const renderTask = () => {
        switch (task.type) {
            case 'cipher':
                return <CipherTask answer={task.answer!} letter={currentLetter} onComplete={handleComplete} />;
            case 'secret-page':
                return <SecretPageTask onComplete={handleComplete} />;
            case 'puzzle':
                return <PuzzleTask letter={currentLetter} onComplete={handleComplete} />;
            case 'safe':
                return <SafeTask letter={currentLetter} onComplete={handleComplete} />;
            case 'butterfly':
                return <CatchButterflyTask letter={currentLetter} onComplete={handleComplete} />;
            case 'flashlight':
                return <FlashlightTask letter={currentLetter} onComplete={handleComplete} />;
            case 'source-code':
                return <SourceCodeTask letter={currentLetter} onComplete={handleComplete} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-5">
            {/* Task header */}
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-pink-500 uppercase tracking-wider">
                        Задание {taskIndex + 1} из 7
                    </p>
                    <h2 className="font-comfortaa font-bold text-navy text-lg leading-tight">
                        {task.title.replace(/^Задание \d+: /, '')}
                    </h2>
                </div>
            </div>

            {/* Briefing */}
            <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-lavender/30 border border-pink-100 p-4">
                <p className="text-navy/80 leading-relaxed">{task.briefing}</p>
            </div>

            {/* Task content */}
            <AnimatePresence mode="wait">
                {!completed ? (
                    <motion.div
                        key="task"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {renderTask()}
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-5"
                    >
                        {/* Letter reveal */}
                        <div className="flex flex-col items-center gap-3 py-4">
                            <p className="text-navy/60 text-sm font-semibold">Ты получила:</p>
                            <LetterReveal letter={currentLetter} show={true} />
                            {currentLetter && (
                                <p className="font-comfortaa font-bold text-xl text-gradient-gold">
                                    {(currentLetter === '!' || currentLetter === '?') ? `Символ «${currentLetter}»!` : `Буква «${currentLetter}»!`}
                                </p>
                            )}
                        </div>

                        {taskIndex < 6 && (
                            <Button
                                onClick={handleNext}
                                className="w-full bg-gradient-to-r from-pink-400 to-violet-400 text-white font-semibold rounded-xl py-3 shadow-lg gap-2"
                            >
                                Следующее задание
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        )}
                        {taskIndex >= 6 && (
                            <Button
                                onClick={() => router.push('/quest/final')}
                                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-semibold rounded-xl py-3 shadow-lg animate-pulse"
                            >
                                🎉 К финалу миссии!
                            </Button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint and Skip */}
            {!completed && (
                <div className="flex flex-col gap-3 pt-2">
                    <HintButton hint={task.hint} />

                    {canSkip ? (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <Button
                                variant="outline"
                                onClick={handleComplete}
                                className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl py-2 shadow-sm font-semibold"
                            >
                                Не получается? Пропустить задание
                            </Button>
                        </motion.div>
                    ) : (
                        <p className="text-center text-xs text-navy/40 font-medium mt-1">
                            Возможность пропустить откроется через {Math.floor(skipTimeLeft / 60)}:{(skipTimeLeft % 60).toString().padStart(2, '0')}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
