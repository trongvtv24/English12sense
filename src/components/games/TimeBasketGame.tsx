"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { CheckCircle2, XCircle } from 'lucide-react';

type TenseCategory =
    | 'Present Simple'
    | 'Present Continuous'
    | 'Present Perfect'
    | 'Past Simple'
    | 'Past Continuous'
    | 'Past Perfect'
    | 'Future Simple';

interface WordCard {
    id: string;
    word: string;
    correctZone: TenseCategory;
}

const INITIAL_WORDS: WordCard[] = [
    // Present Simple
    { id: 't1', word: 'Always', correctZone: 'Present Simple' },
    { id: 't2', word: 'Usually', correctZone: 'Present Simple' },
    { id: 't3', word: 'Every day', correctZone: 'Present Simple' },

    // Present Continuous
    { id: 't4', word: 'Right now', correctZone: 'Present Continuous' },
    { id: 't5', word: 'At the moment', correctZone: 'Present Continuous' },
    { id: 't6', word: 'Look!', correctZone: 'Present Continuous' },

    // Present Perfect
    { id: 't7', word: 'Just', correctZone: 'Present Perfect' },
    { id: 't8', word: 'Already', correctZone: 'Present Perfect' },
    { id: 't9', word: 'Since 2010', correctZone: 'Present Perfect' },

    // Past Simple
    { id: 't10', word: 'Yesterday', correctZone: 'Past Simple' },
    { id: 't11', word: 'Last week', correctZone: 'Past Simple' },
    { id: 't12', word: 'Two days ago', correctZone: 'Past Simple' },

    // Past Continuous
    { id: 't13', word: 'At 8 PM yesterday', correctZone: 'Past Continuous' },
    { id: 't14', word: 'While', correctZone: 'Past Continuous' },
    { id: 't15', word: 'When (in past)', correctZone: 'Past Continuous' },

    // Past Perfect
    { id: 't16', word: 'By the time', correctZone: 'Past Perfect' },
    { id: 't17', word: 'Before (in past)', correctZone: 'Past Perfect' },
    { id: 't18', word: 'After (in past)', correctZone: 'Past Perfect' },

    // Future Simple / Near Future
    { id: 't19', word: 'Tomorrow', correctZone: 'Future Simple' },
    { id: 't20', word: 'Next year', correctZone: 'Future Simple' },
    { id: 't21', word: 'I think', correctZone: 'Future Simple' }
];

export default function TimeBasketGame() {
    const [words, setWords] = useState<WordCard[]>(INITIAL_WORDS);
    const [feedback, setFeedback] = useState<{ id: string, isCorrect: boolean } | null>(null);
    const addScore = useGameStore(state => state.addScore);

    const handleDragEnd = (info: PanInfo, word: WordCard) => {
        const { point } = info;
        const dropZones = document.querySelectorAll('.drop-zone');

        let droppedZoneId: string | null = null;

        dropZones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
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
        <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-[2rem] shadow-xl border-4 border-slate-100">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-slate-800 flex items-center justify-center gap-3">
                    <span className="text-4xl">🧺</span> Rổ Thời Gian Kỳ Diệu
                </h2>
                <p className="text-slate-500 font-bold mt-2 text-lg">
                    Kéo thả các Dấu hiệu thần chú vào ĐÚNG rổ của 7 Thì tương ứng nhé!
                </p>
            </div>

            {/* The Baskets (7 Drop Zones) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div data-zone="Present Simple" className="drop-zone h-36 rounded-2xl bg-green-50 border-4 border-green-300 border-dashed flex flex-col items-center justify-center relative transition-colors">
                    <span className="font-black text-green-800 text-center px-2">Hiện Tại Đơn</span>
                </div>
                <div data-zone="Present Continuous" className="drop-zone h-36 rounded-2xl bg-emerald-50 border-4 border-emerald-300 border-dashed flex flex-col items-center justify-center relative transition-colors">
                    <span className="font-black text-emerald-800 text-center px-2">Hiện Tại <br /> Tiếp Diễn</span>
                </div>
                <div data-zone="Present Perfect" className="drop-zone h-36 rounded-2xl bg-teal-50 border-4 border-teal-300 border-dashed flex flex-col items-center justify-center relative transition-colors">
                    <span className="font-black text-teal-800 text-center px-2">Hiện Tại <br /> Hoàn Thành</span>
                </div>
                <div data-zone="Past Simple" className="drop-zone h-36 rounded-2xl bg-red-50 border-4 border-red-300 border-dashed flex flex-col items-center justify-center relative transition-colors">
                    <span className="font-black text-red-800 text-center px-2">Quá Khứ Đơn</span>
                </div>
                <div data-zone="Past Continuous" className="drop-zone h-36 rounded-2xl bg-rose-50 border-4 border-rose-300 border-dashed flex flex-col items-center justify-center relative transition-colors">
                    <span className="font-black text-rose-800 text-center px-2">Quá Khứ <br /> Tiếp Diễn</span>
                </div>
                <div data-zone="Past Perfect" className="drop-zone h-36 rounded-2xl bg-orange-50 border-4 border-orange-300 border-dashed flex flex-col items-center justify-center relative transition-colors">
                    <span className="font-black text-orange-800 text-center px-2">Quá Khứ <br /> Hoàn Thành</span>
                </div>
                <div data-zone="Future Simple" className="drop-zone h-36 rounded-2xl bg-sky-50 border-4 border-sky-300 border-dashed flex flex-col items-center justify-center relative transition-colors lg:col-span-2">
                    <span className="font-black text-sky-800 text-center px-2">Tương Lai Đơn</span>
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
