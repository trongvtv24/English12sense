"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { CheckCircle2, XCircle } from 'lucide-react';

interface WordCard {
    id: string;
    word: string;
    correctZone: 'PAST' | 'PRESENT' | 'FUTURE';
}

const INITIAL_WORDS: WordCard[] = [
    // --- PAST ZONE ---
    { id: 'w1', word: 'Yesterday', correctZone: 'PAST' },
    { id: 'w2', word: 'Last week', correctZone: 'PAST' },
    { id: 'w3', word: 'Two days ago', correctZone: 'PAST' },
    { id: 'w4', word: 'In 1990', correctZone: 'PAST' },
    { id: 'w5', word: 'Recently', correctZone: 'PAST' },
    { id: 'w6', word: 'Last night', correctZone: 'PAST' },
    { id: 'w7', word: 'When I was young', correctZone: 'PAST' },
    { id: 'w8', word: 'Last year', correctZone: 'PAST' },
    { id: 'w9', word: 'Before', correctZone: 'PAST' },
    { id: 'w10', word: 'The other day', correctZone: 'PAST' },

    // --- PRESENT ZONE ---
    { id: 'w11', word: 'Always', correctZone: 'PRESENT' },
    { id: 'w12', word: 'Usually', correctZone: 'PRESENT' },
    { id: 'w13', word: 'Every day', correctZone: 'PRESENT' },
    { id: 'w14', word: 'Right now', correctZone: 'PRESENT' },
    { id: 'w15', word: 'At the moment', correctZone: 'PRESENT' },
    { id: 'w16', word: 'Look!', correctZone: 'PRESENT' },
    { id: 'w17', word: 'Listen!', correctZone: 'PRESENT' },
    { id: 'w18', word: 'Often', correctZone: 'PRESENT' },
    { id: 'w19', word: 'Sometimes', correctZone: 'PRESENT' },
    { id: 'w20', word: 'Nowadays', correctZone: 'PRESENT' },
    { id: 'w21', word: 'Currently', correctZone: 'PRESENT' },

    // --- FUTURE ZONE ---
    { id: 'w22', word: 'Tomorrow', correctZone: 'FUTURE' },
    { id: 'w23', word: 'Next year', correctZone: 'FUTURE' },
    { id: 'w24', word: 'In 2050', correctZone: 'FUTURE' },
    { id: 'w25', word: 'Next Monday', correctZone: 'FUTURE' },
    { id: 'w26', word: 'In the future', correctZone: 'FUTURE' },
    { id: 'w27', word: 'Soon', correctZone: 'FUTURE' },
    { id: 'w28', word: 'Later', correctZone: 'FUTURE' },
    { id: 'w29', word: 'Next month', correctZone: 'FUTURE' },
    { id: 'w30', word: 'Next week', correctZone: 'FUTURE' },
    { id: 'w31', word: 'By tomorrow', correctZone: 'FUTURE' }
];

export default function TimeBasketGame() {
    const [words, setWords] = useState<WordCard[]>(INITIAL_WORDS);
    const [feedback, setFeedback] = useState<{ id: string, isCorrect: boolean } | null>(null);
    const addScore = useGameStore(state => state.addScore);

    const handleDragEnd = (event: any, word: WordCard) => {
        const { point } = event; // point.x, point.y is page-relative in Framer Motion
        const dropZones = document.querySelectorAll('.drop-zone');

        let droppedZoneId: string | null = null;

        dropZones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            // Convert rect to page-relative coordinates
            const zoneLeft = rect.left + window.scrollX;
            const zoneRight = rect.right + window.scrollX;
            const zoneTop = rect.top + window.scrollY;
            const zoneBottom = rect.bottom + window.scrollY;

            if (
                point.x >= zoneLeft &&
                point.x <= zoneRight &&
                point.y >= zoneTop &&
                point.y <= zoneBottom
            ) {
                droppedZoneId = zone.getAttribute('data-zone');
            }
        });

        if (droppedZoneId) {
            if (droppedZoneId === word.correctZone) {
                // Correct
                setFeedback({ id: word.id, isCorrect: true });
                addScore(50);
                setTimeout(() => {
                    setWords(prev => prev.filter(w => w.id !== word.id));
                    setFeedback(null);
                }, 800);
            } else {
                // Incorrect
                setFeedback({ id: word.id, isCorrect: false });
                setTimeout(() => setFeedback(null), 800);
            }
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-[2rem] shadow-xl border-4 border-slate-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-800 flex items-center justify-center gap-3">
                    <span className="text-4xl">🧺</span> Rổ Thời Gian Kỳ Diệu
                </h2>
                <p className="text-slate-500 font-bold mt-2 text-lg">
                    Kéo thả các từ khóa thần chú vào đúng chiếc rổ của vùng thời gian tương ứng nhé!
                </p>
            </div>

            {/* The Baskets (Drop Zones) */}
            <div className="grid grid-cols-3 gap-6 mb-12">
                <div data-zone="PAST" className="drop-zone h-48 rounded-[2rem] bg-red-100 border-4 border-red-300 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-colors">
                    <span className="text-5xl mb-2">🦕</span>
                    <span className="font-black text-red-800 uppercase tracking-widest bg-white/50 px-4 py-1 rounded-full">Quá Khứ</span>
                </div>

                <div data-zone="PRESENT" className="drop-zone h-48 rounded-[2rem] bg-green-100 border-4 border-green-300 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-colors">
                    <span className="text-5xl mb-2">🧸</span>
                    <span className="font-black text-green-800 uppercase tracking-widest bg-white/50 px-4 py-1 rounded-full">Hiện Tại</span>
                </div>

                <div data-zone="FUTURE" className="drop-zone h-48 rounded-[2rem] bg-sky-100 border-4 border-sky-300 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-colors">
                    <span className="text-5xl mb-2">🚀</span>
                    <span className="font-black text-sky-800 uppercase tracking-widest bg-white/50 px-4 py-1 rounded-full">Tương Lai</span>
                </div>
            </div>

            {/* The Words (Draggable) */}
            <div className="flex flex-wrap gap-4 justify-center min-h-[150px] p-6 bg-slate-50 rounded-2xl border-2 border-slate-200">
                <AnimatePresence>
                    {words.length === 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-black text-amber-500 flex items-center gap-2"
                        >
                            🎉 Tuyệt vời! Bé đã phân loại đúng hết rồi!
                        </motion.div>
                    )}

                    {words.map((word) => {
                        const isFeebackForThis = feedback?.id === word.id;

                        return (
                            <motion.div
                                key={word.id}
                                layoutId={word.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                                drag
                                dragSnapToOrigin={isFeebackForThis && feedback.isCorrect ? false : true}
                                onDragEnd={(e, info) => handleDragEnd(info, word)}
                                whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50, rotate: -5 }}
                                className={`
                  relative cursor-grab bg-white px-6 py-3 rounded-full text-xl font-bold border-4 shadow-md
                  flex items-center gap-2 select-none touch-none
                  ${isFeebackForThis
                                        ? (feedback.isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700 animate-shake')
                                        : 'border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50'}
                `}
                            >
                                {word.word}
                                {isFeebackForThis && feedback.isCorrect && <CheckCircle2 className="text-green-500" size={20} />}
                                {isFeebackForThis && !feedback.isCorrect && <XCircle className="text-red-500" size={20} />}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
