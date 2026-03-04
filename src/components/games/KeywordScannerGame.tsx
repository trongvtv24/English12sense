"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { Search, CheckCircle2 } from 'lucide-react';

interface QuizSentence {
    id: string;
    text: string;
    keywords: string[]; // words that should be highlighted when found
}

const QUIZ_DATA: QuizSentence[] = [
    { id: 'q1', text: "She usually plays piano after dinner.", keywords: ['usually'] },
    { id: 'q2', text: "We have lived here since 2010.", keywords: ['since'] },
    { id: 'q3', text: "They will fly to Tokyo tomorrow.", keywords: ['tomorrow'] },
    { id: 'q4', text: "I am doing my homework right now.", keywords: ['right', 'now'] },
    { id: 'q5', text: "He went to the zoo yesterday.", keywords: ['yesterday'] },
    { id: 'q6', text: "Look! The monkey is eating a banana.", keywords: ['look'] },
    { id: 'q7', text: "We will travel to Paris next week.", keywords: ['next', 'week'] },
    { id: 'q8', text: "She has already finished her project.", keywords: ['already'] },
    { id: 'q9', text: "I always brush my teeth in the morning.", keywords: ['always'] },
    { id: 'q10', text: "They watched a great movie last night.", keywords: ['last', 'night'] }
];

export default function KeywordScannerGame() {
    const [currentQ, setCurrentQ] = useState(0);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

    const addScore = useGameStore(state => state.addScore);
    const sentence = QUIZ_DATA[currentQ];

    const handleWordClick = (wordRaw: string) => {
        // Remove punctuation for clean matching
        const word = wordRaw.replace(/[.,]/g, '').toLowerCase();

        if (sentence.keywords.includes(word) && !foundWords.includes(word)) {
            setFoundWords(prev => [...prev, word]);
            addScore(30);

            // Check if all keywords for this sentence are found
            if (foundWords.length + 1 === sentence.keywords.length) {
                setIsCompleted(true);
            }
        } else if (!sentence.keywords.includes(word)) {
            // Wrong word clicked, maybe subtract points or play sound
            addScore(-5);
        }
    };

    const nextQuestion = () => {
        if (currentQ < QUIZ_DATA.length - 1) {
            setCurrentQ(prev => prev + 1);
            setFoundWords([]);
            setIsCompleted(false);
        } else {
            // Game over state
            alert("Hết câu hỏi rồi! Chúc mừng bé!");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-[2rem] shadow-xl border-4 border-slate-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-800 flex items-center justify-center gap-3">
                    <span className="text-4xl text-amber-500"><Search size={40} /></span> Máy Quét Dấu Hiệu
                </h2>
                <p className="text-slate-500 font-bold mt-2 text-lg">
                    Hãy tìm và bấm vào những từ khóa làm "dấu hiệu nhận biết" thì tiếng Anh trong câu nhé!
                </p>
            </div>

            <div className="flex justify-center mb-4 gap-2">
                {QUIZ_DATA.map((_, idx) => (
                    <div key={idx} className={`w-12 h-3 rounded-full ${idx <= currentQ ? 'bg-amber-400' : 'bg-slate-200'}`} />
                ))}
            </div>

            <div className="bg-slate-50 p-12 rounded-3xl border-2 border-slate-200 text-center min-h-[250px] flex flex-col justify-center items-center relative overflow-hidden">

                <div className="flex flex-wrap gap-x-3 gap-y-4 justify-center text-3xl font-black text-slate-700 leading-relaxed max-w-2xl mx-auto z-10">
                    {sentence.text.split(' ').map((wordPart, idx) => {
                        const cleanWord = wordPart.replace(/[.,]/g, '').toLowerCase();
                        const isFound = foundWords.includes(cleanWord);

                        return (
                            <motion.span
                                key={idx}
                                whileHover={{ scale: 1.1, color: '#f59e0b' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleWordClick(wordPart)}
                                className={`
                  cursor-pointer px-3 py-1 rounded-xl transition-all duration-300
                  ${isFound ? 'bg-amber-300 text-amber-900 border-b-4 border-amber-500 shadow-sm' : 'hover:bg-slate-200'}
                `}
                            >
                                {wordPart}
                            </motion.span>
                        );
                    })}
                </div>

                {/* Completion Overlay */}
                {isCompleted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center pt-8"
                    >
                        <div className="text-6xl text-green-500 mb-4 animate-bounce"><CheckCircle2 size={80} /></div>
                        <h3 className="text-2xl font-black text-green-600 mb-6">Chính Xác!</h3>
                        <button
                            onClick={nextQuestion}
                            className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold text-xl shadow-[0_4px_0_0_#15803d] hover:bg-green-400 active:translate-y-1 transition-all"
                        >
                            Tiếp tục 🚀
                        </button>
                    </motion.div>
                )}
            </div>

            <div className="mt-6 flex justify-between text-slate-500 font-bold px-4">
                <span>Cấp độ: Dễ</span>
                <span>Từ cần tìm: {foundWords.length}/{sentence.keywords.length}</span>
            </div>
        </div>
    );
}
