"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { Layers } from 'lucide-react';

interface Flashcard {
    id: string;
    front: string;
    backTitle: string;
    backDesc: string;
}

const CARDS: Flashcard[] = [
    // Hiện tại đơn
    { id: 'f1', front: 'Always', backTitle: 'Hiện Tại Đơn', backDesc: 'Luôn luôn, thường xuyên xảy ra' },
    { id: 'f2', front: 'Usually', backTitle: 'Hiện Tại Đơn', backDesc: 'Thường thường' },
    { id: 'f3', front: 'Every day', backTitle: 'Hiện Tại Đơn', backDesc: 'Mỗi ngày (thói quen)' },

    // Hiện tại tiếp diễn
    { id: 'f4', front: 'Right now', backTitle: 'Hiện Tại Tiếp Diễn', backDesc: 'Ngay lúc này' },
    { id: 'f5', front: 'At the moment', backTitle: 'Hiện Tại Tiếp Diễn', backDesc: 'Tại thời điểm này' },
    { id: 'f6', front: 'Look!', backTitle: 'Hiện Tại Tiếp Diễn', backDesc: 'Nhìn kìa! (Sự việc đang xảy ra trước mắt)' },

    // Hiện tại hoàn thành
    { id: 'f7', front: 'Since 2010', backTitle: 'Hiện Tại Hoàn Thành', backDesc: 'Từ năm 2010 (Đến nay vẫn còn)' },
    { id: 'f8', front: 'For 3 years', backTitle: 'Hiện Tại Hoàn Thành', backDesc: 'Được 3 năm (Khoảng thời gian)' },
    { id: 'f9', front: 'Already', backTitle: 'Hiện Tại Hoàn Thành', backDesc: 'Đã xong rồi' },

    // Quá khứ đơn
    { id: 'f10', front: 'Yesterday', backTitle: 'Quá Khứ Đơn', backDesc: 'Ngày hôm qua' },
    { id: 'f11', front: 'Last night', backTitle: 'Quá Khứ Đơn', backDesc: 'Tối qua (Đã chấm dứt)' },
    { id: 'f12', front: 'Two days ago', backTitle: 'Quá Khứ Đơn', backDesc: 'Hai ngày trước' },

    // Quá khứ tiếp diễn
    { id: 'f13', front: 'At 8 PM yesterday', backTitle: 'Quá Khứ Tiếp Diễn', backDesc: 'Hành động đang xảy ra tại 1 thời điểm ở QK' },
    { id: 'f14', front: 'While', backTitle: 'Quá Khứ Tiếp Diễn', backDesc: 'Trong lúc (2 việc cùng diễn ra ở QK)' },
    { id: 'f15', front: 'When (QK)', backTitle: 'Quá Khứ Tiếp Diễn', backDesc: 'Khi (1 việc đang xảy ra thì việc khác xen vào)' },

    // Quá khứ hoàn thành
    { id: 'f16', front: 'Before (QK)', backTitle: 'Quá Khứ Hoàn Thành', backDesc: 'Xảy ra trước 1 hành động ở quá khứ' },
    { id: 'f17', front: 'By the time', backTitle: 'Quá Khứ Hoàn Thành', backDesc: 'Vào lúc (hành động đã xong trước đó)' },
    { id: 'f18', front: 'After', backTitle: 'Quá Khứ Hoàn Thành', backDesc: 'Sau khi (việc này xong mới đến việc kia)' },

    // Tương lai
    { id: 'f19', front: 'Tomorrow', backTitle: 'Tương Lai Đơn', backDesc: 'Ngày mai' },
    { id: 'f20', front: 'Next week', backTitle: 'Tương Lai Đơn', backDesc: 'Tuần tới (dự định)' },
    { id: 'f21', front: 'I think', backTitle: 'Tương Lai Đơn', backDesc: 'Tôi nghĩ là (đưa ra dự đoán)' }
];

export default function MagicCardsGame() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const addScore = useGameStore(state => state.addScore);

    const card = CARDS[currentIdx];

    const handleReview = (difficulty: 'HARD' | 'NORMAL' | 'EASY') => {
        // Basic logic for points
        const points = difficulty === 'HARD' ? 10 : (difficulty === 'EASY' ? 30 : 20);
        addScore(points);

        // Move to next card
        if (currentIdx < CARDS.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIdx(prev => prev + 1), 200);
        } else {
            alert("Hôm nay bé đã ôn tập xong hết thẻ bài rồi! 🎉");
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-[2rem] shadow-xl border-4 border-slate-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-800 flex items-center justify-center gap-3">
                    <span className="text-4xl text-purple-500"><Layers size={40} /></span> Thẻ Bài Ma Thuật
                </h2>
                <p className="text-slate-500 font-bold mt-2 text-lg">
                    Lật thẻ để ôn tập từ khóa. Nhớ nói thật to nhé!
                </p>
            </div>

            <div className="flex justify-between items-center px-4 mb-4 font-bold text-slate-400">
                <span>Thẻ {currentIdx + 1} / {CARDS.length}</span>
            </div>

            {/* 3D Flip Card Container */}
            <div
                className="relative w-full aspect-[4/3] perspective-1000 mb-8"
                onClick={() => !isFlipped && setIsFlipped(true)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d cursor-pointer"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                >
                    {/* Card Front */}
                    <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl border-4 border-indigo-200 shadow-lg flex flex-col items-center justify-center p-8">
                        <span className="text-6xl text-indigo-300 opacity-20 absolute top-4 left-4">❓</span>
                        <h3 className="text-5xl font-black text-indigo-900 tracking-wider text-center">{card.front}</h3>
                        {!isFlipped && (
                            <span className="absolute bottom-6 text-indigo-500 font-bold bg-white/50 px-4 py-1 rounded-full animate-pulse">
                                Chạm để lật bài
                            </span>
                        )}
                    </div>

                    {/* Card Back */}
                    <div
                        className="absolute w-full h-full backface-hidden bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl border-4 border-emerald-200 shadow-lg flex flex-col items-center justify-center p-8 px-12"
                        style={{ transform: "rotateY(180deg)" }}
                    >
                        <h3 className="text-4xl font-black text-emerald-900 mb-4">{card.backTitle}</h3>
                        <p className="text-2xl font-bold text-teal-700 text-center">{card.backDesc}</p>
                    </div>
                </motion.div>
            </div>

            {/* Review Actions (only show when flipped) */}
            <div className="h-20">
                {isFlipped && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4 justify-center"
                    >
                        <button onClick={() => handleReview('HARD')} className="flex-1 bg-red-100 text-red-700 border-2 border-red-200 hover:bg-red-200 font-bold py-3 rounded-xl active:scale-95 transition-all text-lg shadow-sm">
                            Khó Nhớ 😓
                        </button>
                        <button onClick={() => handleReview('NORMAL')} className="flex-1 bg-amber-100 text-amber-700 border-2 border-amber-200 hover:bg-amber-200 font-bold py-3 rounded-xl active:scale-95 transition-all text-lg shadow-sm">
                            Bình Thường 🤔
                        </button>
                        <button onClick={() => handleReview('EASY')} className="flex-1 bg-green-100 text-green-700 border-2 border-green-200 hover:bg-green-200 font-bold py-3 rounded-xl active:scale-95 transition-all text-lg shadow-sm">
                            Rất Dễ 🤩
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
