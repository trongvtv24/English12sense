"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { useAudioEffects } from '@/lib/useAudioEffects';
import { Bug, Hammer } from 'lucide-react';

interface BugSentence {
    id: string;
    words: { text: string; isBug: boolean; fix: string }[];
}

const LEVEL_DATA: BugSentence[] = [
    {
        id: 'b1',
        words: [
            { text: "He", isBug: false, fix: "" },
            { text: "don't", isBug: true, fix: "doesn't" },
            { text: "like", isBug: false, fix: "" },
            { text: "reading", isBug: false, fix: "" },
            { text: "books.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b2',
        words: [
            { text: "We", isBug: false, fix: "" },
            { text: "was", isBug: true, fix: "were" },
            { text: "at", isBug: false, fix: "" },
            { text: "the", isBug: false, fix: "" },
            { text: "park", isBug: false, fix: "" },
            { text: "yesterday.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b3',
        words: [
            { text: "Look!", isBug: false, fix: "" },
            { text: "She", isBug: false, fix: "" },
            { text: "sing", isBug: true, fix: "is singing" },
            { text: "a", isBug: false, fix: "" },
            { text: "song.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b4',
        words: [
            { text: "I", isBug: false, fix: "" },
            { text: "have", isBug: false, fix: "" },
            { text: "went", isBug: true, fix: "gone" },
            { text: "to", isBug: false, fix: "" },
            { text: "Paris.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b5',
        words: [
            { text: "They", isBug: false, fix: "" },
            { text: "will", isBug: false, fix: "" },
            { text: "playing", isBug: true, fix: "play" },
            { text: "football", isBug: false, fix: "" },
            { text: "tomorrow.", isBug: false, fix: "" }
        ]
    }
];

export default function BugHunterGame() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [feedback, setFeedback] = useState<'IDLE' | 'HIT' | 'MISS'>('IDLE');

    const addScore = useGameStore(state => state.addScore);
    const addLevel = useGameStore(state => state.level);
    const { playSound } = useAudioEffects();

    const sentence = LEVEL_DATA[currentIdx];

    const handleWordClick = (isBug: boolean) => {
        if (feedback !== 'IDLE') return;

        if (isBug) {
            setFeedback('HIT');
            playSound('BUG_SQUASH');
            addScore(40); // 40pts per bug
            setTimeout(() => nextRound(), 2500); // Wait longer to show the fix
        } else {
            setFeedback('MISS');
            playSound('ERROR');
            addScore(-10);
            setTimeout(() => setFeedback('IDLE'), 1000);
        }
    };

    const nextRound = () => {
        if (currentIdx < LEVEL_DATA.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setFeedback('IDLE');
        } else {
            alert("Tuyệt vời! Khu vườn đã sạch bóng lỗi ngữ pháp! 🌿");
            setCurrentIdx(0);
            setFeedback('IDLE');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-emerald-50 rounded-[2rem] shadow-xl border-4 border-emerald-200">

            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-emerald-800 flex items-center justify-center gap-3">
                    <span className="text-4xl text-rose-500"><Bug size={40} /></span> Thợ Săn Bắt Bọ
                </h2>
                <p className="text-emerald-600 font-bold mt-2 text-lg">
                    Có một con "bọ ngữ pháp" đang ẩn nấp trong câu! Hãy tìm và đập nó!
                </p>
            </div>

            <div className="flex justify-between items-center mb-6 px-4">
                <div className="flex gap-2">
                    {LEVEL_DATA.map((_, i) => (
                        <div key={i} className={`w-8 h-3 rounded-full ${i <= currentIdx ? 'bg-rose-500' : 'bg-emerald-200'}`} />
                    ))}
                </div>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-4 py-1 rounded-full border-2 border-emerald-200">
                    Level {addLevel} Thợ Săn
                </span>
            </div>

            {/* The Forest / Sentence Area */}
            <div className="bg-white p-12 rounded-3xl border-4 border-emerald-100 shadow-inner min-h-[300px] flex flex-col justify-center relative overflow-hidden">

                {/* Background decorations */}
                <div className="absolute top-4 left-4 text-4xl opacity-20">🍃</div>
                <div className="absolute bottom-4 right-8 text-5xl opacity-20">🍄</div>

                <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center text-4xl font-black z-10">
                    {sentence.words.map((wordObj, i) => (
                        <motion.div
                            key={`${currentIdx}-${i}`}
                            whileHover={{ scale: 1.1, translateY: -4 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleWordClick(wordObj.isBug)}
                            className="relative cursor-pointer group"
                        >
                            <span className={`
                px-4 py-2 rounded-2xl transition-all inline-block
                ${feedback === 'HIT' && wordObj.isBug
                                    ? 'bg-green-100 text-green-700 border-b-4 border-green-500'
                                    : (feedback === 'IDLE' ? 'text-slate-700 hover:bg-emerald-100 hover:text-emerald-800' : 'text-slate-400')}
              `}>
                                {/* Show the fix instead of the bug if HIT */}
                                {feedback === 'HIT' && wordObj.isBug ? wordObj.fix : wordObj.text}
                            </span>

                            {/* Fake Bug Icon on hover before clicking */}
                            {feedback === 'IDLE' && (
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <Hammer size={24} className="-rotate-45" />
                                </span>
                            )}

                            {/* Show check or X briefly based on result */}
                            <AnimatePresence>
                                {feedback === 'MISS' && wordObj.isBug === false && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: -20 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -top-2 left-1/2 -translate-x-1/2 text-red-500 pointer-events-none"
                                    >
                                        ❌
                                    </motion.span>
                                )}

                                {feedback === 'HIT' && wordObj.isBug && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, y: 0 }}
                                        animate={{ opacity: 1, scale: [1, 1.2, 1], y: -40 }}
                                        className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none whitespace-nowrap"
                                    >
                                        <span className="text-4xl">💥</span>
                                        <span className="text-green-600 font-bold bg-white px-3 py-1 rounded-full text-sm shadow mt-1 border border-green-200">
                                            Sửa thành: {wordObj.fix}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
