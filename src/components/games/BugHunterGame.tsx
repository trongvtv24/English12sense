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
    // Hiện tại đơn
    {
        id: 'b1', words: [
            { text: "She", isBug: false, fix: "" }, { text: "go", isBug: true, fix: "goes" }, { text: "to", isBug: false, fix: "" }, { text: "school", isBug: false, fix: "" }, { text: "every day.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b2', words: [
            { text: "They", isBug: false, fix: "" }, { text: "doesn't", isBug: true, fix: "don't" }, { text: "like", isBug: false, fix: "" }, { text: "eating", isBug: false, fix: "" }, { text: "apples.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b3', words: [
            { text: "I", isBug: false, fix: "" }, { text: "am", isBug: true, fix: "do" }, { text: "not", isBug: false, fix: "" }, { text: "play", isBug: false, fix: "" }, { text: "tennis.", isBug: false, fix: "" }
        ]
    },
    // Hiện tại tiếp diễn
    {
        id: 'b4', words: [
            { text: "He", isBug: false, fix: "" }, { text: "is", isBug: false, fix: "" }, { text: "play", isBug: true, fix: "playing" }, { text: "games", isBug: false, fix: "" }, { text: "now.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b5', words: [
            { text: "We", isBug: false, fix: "" }, { text: "am", isBug: true, fix: "are" }, { text: "studying", isBug: false, fix: "" }, { text: "at", isBug: false, fix: "" }, { text: "the moment.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b6', words: [
            { text: "Look!", isBug: false, fix: "" }, { text: "It", isBug: false, fix: "" }, { text: "is", isBug: false, fix: "" }, { text: "rain", isBug: true, fix: "raining." }
        ]
    },
    // Hiện tại hoàn thành
    {
        id: 'b7', words: [
            { text: "I", isBug: false, fix: "" }, { text: "have", isBug: false, fix: "" }, { text: "see", isBug: true, fix: "seen" }, { text: "that", isBug: false, fix: "" }, { text: "movie", isBug: false, fix: "" }, { text: "already.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b8', words: [
            { text: "She", isBug: false, fix: "" }, { text: "have", isBug: true, fix: "has" }, { text: "lived", isBug: false, fix: "" }, { text: "here", isBug: false, fix: "" }, { text: "for 5 years.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b9', words: [
            { text: "They", isBug: false, fix: "" }, { text: "haven't", isBug: false, fix: "" }, { text: "finish", isBug: true, fix: "finished" }, { text: "their", isBug: false, fix: "" }, { text: "homework.", isBug: false, fix: "" }
        ]
    },
    // Quá khứ đơn
    {
        id: 'b10', words: [
            { text: "We", isBug: false, fix: "" }, { text: "go", isBug: true, fix: "went" }, { text: "to", isBug: false, fix: "" }, { text: "Paris", isBug: false, fix: "" }, { text: "last year.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b11', words: [
            { text: "She", isBug: false, fix: "" }, { text: "didn't", isBug: false, fix: "" }, { text: "played", isBug: true, fix: "play" }, { text: "outside", isBug: false, fix: "" }, { text: "yesterday.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b12', words: [
            { text: "Was", isBug: true, fix: "Did" }, { text: "you", isBug: false, fix: "" }, { text: "watch", isBug: false, fix: "" }, { text: "the match", isBug: false, fix: "" }, { text: "last night?", isBug: false, fix: "" }
        ]
    },
    // Quá khứ tiếp diễn
    {
        id: 'b13', words: [
            { text: "I", isBug: false, fix: "" }, { text: "was", isBug: false, fix: "" }, { text: "sleep", isBug: true, fix: "sleeping" }, { text: "at 8 PM.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b14', words: [
            { text: "They", isBug: false, fix: "" }, { text: "was", isBug: true, fix: "were" }, { text: "watching", isBug: false, fix: "" }, { text: "TV", isBug: false, fix: "" }, { text: "when", isBug: false, fix: "" }, { text: "I called.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b15', words: [
            { text: "She", isBug: false, fix: "" }, { text: "was reading", isBug: false, fix: "" }, { text: "while", isBug: false, fix: "" }, { text: "he", isBug: false, fix: "" }, { text: "plays", isBug: true, fix: "was playing" }, { text: "games.", isBug: false, fix: "" }
        ]
    },
    // Quá khứ hoàn thành
    {
        id: 'b16', words: [
            { text: "I", isBug: false, fix: "" }, { text: "had", isBug: false, fix: "" }, { text: "leave", isBug: true, fix: "left" }, { text: "before", isBug: false, fix: "" }, { text: "she", isBug: false, fix: "" }, { text: "arrived.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b17', words: [
            { text: "They", isBug: false, fix: "" }, { text: "has", isBug: true, fix: "had" }, { text: "eaten", isBug: false, fix: "" }, { text: "dinner", isBug: false, fix: "" }, { text: "by 8 PM.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b18', words: [
            { text: "After", isBug: false, fix: "" }, { text: "he", isBug: false, fix: "" }, { text: "has", isBug: true, fix: "had" }, { text: "finished", isBug: false, fix: "" }, { text: "homework,", isBug: false, fix: "" }, { text: "he slept.", isBug: false, fix: "" }
        ]
    },
    // Tương lai đơn / Gần
    {
        id: 'b19', words: [
            { text: "I", isBug: false, fix: "" }, { text: "think", isBug: false, fix: "" }, { text: "it", isBug: false, fix: "" }, { text: "will", isBug: false, fix: "" }, { text: "raining", isBug: true, fix: "rain" }, { text: "tomorrow.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b20', words: [
            { text: "We", isBug: false, fix: "" }, { text: "is", isBug: true, fix: "are" }, { text: "going to", isBug: false, fix: "" }, { text: "travel", isBug: false, fix: "" }, { text: "next week.", isBug: false, fix: "" }
        ]
    },
    {
        id: 'b21', words: [
            { text: "She", isBug: false, fix: "" }, { text: "will", isBug: false, fix: "" }, { text: "goes", isBug: true, fix: "go" }, { text: "to", isBug: false, fix: "" }, { text: "the party.", isBug: false, fix: "" }
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
                    Có một con &quot;bọ ngữ pháp&quot; đang ẩn nấp trong câu! Hãy tìm và đập nó!
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
