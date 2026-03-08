'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { TASKS } from '@/lib/tasks-config';
import { TaskRenderer } from '@/components/quest/TaskRenderer';
import { QuestProgressBar } from '@/components/quest/ProgressBar';
import { FloatingFlowers } from '@/components/effects/FloatingFlowers';
import { CuratorTask } from '@/components/quest/tasks/CuratorTask';
import { Shield } from 'lucide-react';

export default function QuestPage() {
    const { playerName, isCurator, currentTask, questCompleted, startQuest, questStarted } = useGameStore();
    const router = useRouter();

    useEffect(() => {
        if (!playerName) {
            router.replace('/greeting');
            return;
        }
        if (!questStarted) startQuest();
    }, [playerName, questStarted, startQuest, router]);

    useEffect(() => {
        if (questCompleted) {
            router.push('/quest/final');
        }
    }, [questCompleted, router]);

    if (!playerName) return null;

    const task = TASKS[currentTask];

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-start px-4 py-8 overflow-hidden">
            <FloatingFlowers count={8} />

            <div className="relative z-10 w-full max-w-lg mx-auto space-y-5">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-2xl px-5 py-3 shadow-sm border border-white/60 flex items-center gap-3"
                >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-rose-300 flex items-center justify-center shadow-sm">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="font-comfortaa font-bold text-navy text-sm">
                            Агент {playerName} — на задании
                        </p>
                    </div>
                </motion.div>

                {/* Progress */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-2xl p-4 shadow-sm border border-white/60"
                >
                    <QuestProgressBar />
                </motion.div>

                {/* Task card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTask}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="glass rounded-3xl p-6 shadow-xl border border-white/60"
                    >
                        {isCurator ? (
                            <CuratorTask onComplete={() => router.push('/quest/final')} />
                        ) : task ? (
                            <TaskRenderer task={task} taskIndex={currentTask} />
                        ) : null}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}
