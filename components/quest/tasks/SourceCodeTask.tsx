'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { checkAnswer } from '@/lib/utils';
import { toast } from 'sonner';
import { Code2, ChevronRight, ChevronDown } from 'lucide-react';

const SECRET_KEYWORD = 'тюльпан';

interface SourceCodeTaskProps {
    letter: string;
    onComplete: () => void;
}

function CodeLine({ className = '', children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`font-mono text-xs leading-relaxed pl-2 ${className}`}>
            {children}
        </div>
    );
}

export function SourceCodeTask({ letter, onComplete }: SourceCodeTaskProps) {
    const [input, setInput] = useState('');
    const [wrong, setWrong] = useState(false);
    const [expandedBody, setExpandedBody] = useState(false);
    const [expandedMain, setExpandedMain] = useState(false);
    const [expandedComment, setExpandedComment] = useState(false);
    const [found, setFound] = useState(false);

    const handleSubmit = () => {
        if (checkAnswer(input, SECRET_KEYWORD)) {
            toast.success(`💻 Верно! Финальный рубеж пройден! Получаешь ${letter === '!' || letter === '?' ? 'символ' : 'последнюю букву'} ${letter}!`, { duration: 3000 });
            onComplete();
        } else {
            setWrong(true);
            toast.error('Не то слово... Раскрой все теги в коде! 🔍', { duration: 2000 });
            setTimeout(() => setWrong(false), 600);
        }
    };

    const handleExpandComment = () => {
        setExpandedComment(true);
        setFound(true);
        toast('🎉 Нашла! Теперь введи найденное слово.', { duration: 2500 });
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-navy/60 text-center bg-purple-50 rounded-xl p-3 border border-purple-100">
                <Code2 className="w-4 h-4 inline mr-1 text-purple-500" />
                Нажимай на треугольники ▶, чтобы раскрыть теги HTML. Слово спрятано в коде!
            </p>

            {/* Interactive DevTools mockup */}
            <div className="rounded-2xl bg-[#1e1e2e] overflow-hidden shadow-xl border border-white/10 text-[11px]">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-[#181825] border-b border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="ml-2 text-white/40 text-xs font-mono">DevTools — Elements</span>
                </div>

                <div className="p-3 font-mono space-y-0.5 select-none">
                    {/* <html> */}
                    <CodeLine>
                        <span className="text-blue-400">&lt;html&gt;</span>
                    </CodeLine>

                    {/* <head> collapsed */}
                    <CodeLine className="pl-6">
                        <span className="text-white/30">&lt;head&gt;...&lt;/head&gt;</span>
                    </CodeLine>

                    {/* <body> expandable */}
                    <CodeLine className="pl-4">
                        <button
                            onClick={() => setExpandedBody(!expandedBody)}
                            className="flex items-center gap-1 hover:bg-white/5 rounded px-1 py-0.5 cursor-pointer transition-colors group"
                        >
                            {expandedBody
                                ? <ChevronDown className="w-3 h-3 text-white/50 group-hover:text-white/80" />
                                : <ChevronRight className="w-3 h-3 text-white/50 group-hover:text-white/80" />
                            }
                            <span className="text-blue-400">&lt;body&gt;</span>
                            {!expandedBody && <span className="text-white/30">…</span>}
                        </button>
                    </CodeLine>

                    {/* body contents */}
                    <AnimatePresence>
                        {expandedBody && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                {/* <main> expandable */}
                                <CodeLine className="pl-12">
                                    <button
                                        onClick={() => setExpandedMain(!expandedMain)}
                                        className="flex items-center gap-1 hover:bg-white/5 rounded px-1 py-0.5 cursor-pointer transition-colors group"
                                    >
                                        {expandedMain
                                            ? <ChevronDown className="w-3 h-3 text-white/50 group-hover:text-white/80" />
                                            : <ChevronRight className="w-3 h-3 text-white/50 group-hover:text-white/80" />
                                        }
                                        <span className="text-blue-400">&lt;main </span>
                                        <span className="text-yellow-300">class</span>
                                        <span className="text-white/60">=</span>
                                        <span className="text-green-300">&quot;quest&quot;</span>
                                        <span className="text-blue-400">&gt;</span>
                                        {!expandedMain && <span className="text-white/30">…</span>}
                                    </button>
                                </CodeLine>

                                <AnimatePresence>
                                    {expandedMain && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            {/* sections */}
                                            <CodeLine className="pl-20 text-white/25">&lt;section&gt;…&lt;/section&gt;</CodeLine>
                                            <CodeLine className="pl-20 text-white/25">&lt;section&gt;…&lt;/section&gt;</CodeLine>

                                            {/* Comment — expandable secret */}
                                            <CodeLine className="pl-20">
                                                <button
                                                    onClick={handleExpandComment}
                                                    className={`flex items-center gap-1 rounded px-1 py-0.5 cursor-pointer transition-all group ${expandedComment ? '' : 'hover:bg-green-900/30'}`}
                                                    disabled={expandedComment}
                                                >
                                                    {expandedComment
                                                        ? <ChevronDown className="w-3 h-3 text-green-500/70" />
                                                        : <ChevronRight className="w-3 h-3 text-green-500/50 group-hover:text-green-400" />
                                                    }
                                                    {expandedComment ? (
                                                        <motion.span
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="text-green-400 font-bold"
                                                        >
                                                            {`<!-- Секретное слово: тюльпан -->`}
                                                        </motion.span>
                                                    ) : (
                                                        <span className="text-green-500/60 group-hover:text-green-400 transition-colors">
                                                            {`<!-- … -->`}
                                                        </span>
                                                    )}
                                                </button>
                                            </CodeLine>

                                            <CodeLine className="pl-20 text-white/25">&lt;section&gt;…&lt;/section&gt;</CodeLine>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <CodeLine className="pl-12">
                                    <span className="text-blue-400">&lt;/main&gt;</span>
                                </CodeLine>
                                <CodeLine className="pl-8 text-white/25">&lt;script&gt;…&lt;/script&gt;</CodeLine>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <CodeLine>
                        <span className="text-blue-400">&lt;/html&gt;</span>
                    </CodeLine>
                </div>
            </div>

            {/* Input */}
            <div className="space-y-3">
                <label className="text-sm font-semibold text-navy/70">
                    {found ? '✅ Нашла слово! Введи его:' : 'Введи найденное слово:'}
                </label>
                <motion.div animate={wrong ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }} transition={{ duration: 0.4 }}>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        placeholder="Введи секретное слово..."
                        className={`text-center font-comfortaa text-lg border-2 ${wrong ? 'border-red-400' : found ? 'border-green-300' : 'border-pink-200'} focus:border-pink-400`}
                    />
                </motion.div>
                <Button
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold rounded-xl py-3 shadow-lg"
                >
                    🔍 Проверить слово
                </Button>
            </div>

            {/* Для настоящего DevTools тоже оставим */}
            <div
                id="secret-clue"
                aria-hidden="true"
                style={{ display: 'none' }}
                data-hint="Молодец, что заглянула сюда! 🌷"
            >
                Секретное слово: тюльпан
            </div>
        </div>
    );
}
