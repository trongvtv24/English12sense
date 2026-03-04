"use client"

import React, { useState } from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { useAudioEffects } from '@/lib/useAudioEffects';
import { Blocks, Check } from 'lucide-react';

interface SentencePuzzle {
    id: string;
    correctOrder: string[];
    jumbledOrder: string[];
}

const PUZZLES: SentencePuzzle[] = [
    // Hiện tại đơn
    { id: 'p1', correctOrder: ['I', 'always', 'wake', 'up', 'early'], jumbledOrder: ['up', 'always', 'early', 'I', 'wake'] },
    { id: 'p2', correctOrder: ['She', 'plays', 'tennis', 'every', 'weekend'], jumbledOrder: ['every', 'plays', 'weekend', 'She', 'tennis'] },
    { id: 'p3', correctOrder: ['They', 'usually', 'walk', 'to', 'school'], jumbledOrder: ['to', 'They', 'school', 'usually', 'walk'] },

    // Hiện tại tiếp diễn
    { id: 'p4', correctOrder: ['The', 'baby', 'is', 'sleeping', 'now'], jumbledOrder: ['sleeping', 'now', 'is', 'The', 'baby'] },
    { id: 'p5', correctOrder: ['We', 'are', 'studying', 'English', 'today'], jumbledOrder: ['today', 'studying', 'We', 'are', 'English'] },
    { id: 'p6', correctOrder: ['Look!', 'He', 'is', 'eating', 'apples'], jumbledOrder: ['is', 'apples', 'Look!', 'eating', 'He'] },

    // Hiện tại hoàn thành
    { id: 'p7', correctOrder: ['I', 'have', 'read', 'that', 'book'], jumbledOrder: ['read', 'I', 'that', 'have', 'book'] },
    { id: 'p8', correctOrder: ['She', 'has', 'lived', 'here', 'since', '2010'], jumbledOrder: ['has', 'lived', '2010', 'She', 'since', 'here'] },
    { id: 'p9', correctOrder: ['They', 'have', 'not', 'finished', 'yet'], jumbledOrder: ['have', 'yet', 'finished', 'not', 'They'] },

    // Quá khứ đơn
    { id: 'p10', correctOrder: ['We', 'went', 'to', 'the', 'zoo'], jumbledOrder: ['zoo', 'went', 'to', 'We', 'the'] },
    { id: 'p11', correctOrder: ['I', 'bought', 'a', 'new', 'car'], jumbledOrder: ['a', 'bought', 'car', 'I', 'new'] },
    { id: 'p12', correctOrder: ['She', 'watched', 'TV', 'last', 'night'], jumbledOrder: ['watched', 'last', 'TV', 'night', 'She'] },

    // Quá khứ tiếp diễn
    { id: 'p13', correctOrder: ['I', 'was', 'sleeping', 'at', '8 PM'], jumbledOrder: ['at', 'sleeping', 'I', '8 PM', 'was'] },
    { id: 'p14', correctOrder: ['They', 'were', 'playing', 'football', 'yesterday'], jumbledOrder: ['playing', 'yesterday', 'They', 'football', 'were'] },
    { id: 'p15', correctOrder: ['She', 'was', 'cooking', 'while', 'I', 'read'], jumbledOrder: ['cooking', 'while', 'read', 'I', 'She', 'was'] },

    // Quá khứ hoàn thành
    { id: 'p16', correctOrder: ['I', 'had', 'finished', 'before', 'she', 'came'], jumbledOrder: ['finished', 'she', 'before', 'I', 'had', 'came'] },
    { id: 'p17', correctOrder: ['The', 'train', 'had', 'left', 'early'], jumbledOrder: ['had', 'early', 'The', 'left', 'train'] },
    { id: 'p18', correctOrder: ['They', 'had', 'eaten', 'dinner', 'by', 'then'], jumbledOrder: ['dinner', 'had', 'eaten', 'by', 'They', 'then'] },

    // Tương lai đơn / Gần
    { id: 'p19', correctOrder: ['I', 'think', 'it', 'will', 'rain'], jumbledOrder: ['will', 'rain', 'I', 'think', 'it'] },
    { id: 'p20', correctOrder: ['We', 'are', 'going', 'to', 'travel'], jumbledOrder: ['are', 'travel', 'to', 'going', 'We'] },
    { id: 'p21', correctOrder: ['She', 'will', 'visit', 'us', 'next', 'week'], jumbledOrder: ['will', 'next', 'week', 'us', 'visit', 'She'] }
];

export default function SentenceBuilderGame() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const puzzle = PUZZLES[currentIdx];
    const [items, setItems] = useState(puzzle.jumbledOrder);
    const [isChecking, setIsChecking] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const addScore = useGameStore(state => state.addScore);
    const { playSound } = useAudioEffects();

    const checkOrder = () => {
        setIsChecking(true);
        const correctStr = puzzle.correctOrder.join(' ');
        const userStr = items.join(' ');

        if (correctStr === userStr) {
            setIsCorrect(true);
            playSound('SUCCESS');
            addScore(60);
            setTimeout(() => nextRound(), 2000);
        } else {
            setIsCorrect(false);
            playSound('ERROR');
            addScore(-5);
            setTimeout(() => setIsChecking(false), 1500);
        }
    };

    const nextRound = () => {
        if (currentIdx < PUZZLES.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setItems(PUZZLES[currentIdx + 1].jumbledOrder);
            setIsChecking(false);
            setIsCorrect(false);
        } else {
            alert("Cầu đã nối xong! Chúc mừng kỹ sư nhí! 🌉");
            setCurrentIdx(0);
            setItems(PUZZLES[0].jumbledOrder);
            setIsChecking(false);
            setIsCorrect(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6 bg-sky-50 rounded-[2rem] shadow-xl border-4 border-sky-200">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-sky-800 flex items-center justify-center gap-3">
                    <span className="text-4xl text-sky-500"><Blocks size={40} /></span> Xây Cầu Qua Sông
                </h2>
                <p className="text-sky-600 font-bold mt-2 text-lg">
                    Kéo thả các khối từ vựng để tạo thành một câu hoàn chỉnh giúp bạn Thỏ qua sông nhé!
                </p>
            </div>

            <div className="flex justify-between items-center mb-6 px-4">
                <span className="font-bold text-sky-700 bg-sky-100 px-4 py-1 rounded-full">
                    Cầu số {currentIdx + 1}/{PUZZLES.length}
                </span>
            </div>

            {/* The River Background */}
            <div className="bg-sky-400 p-8 md:p-12 rounded-3xl border-4 border-sky-600 shadow-inner relative overflow-hidden min-h-[250px] flex items-center justify-center">

                {/* Fake water animation */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="w-[200%] h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[wave_3s_linear_infinite]" />
                </div>

                {/* Reorder List Component */}
                <Reorder.Group
                    axis="x"
                    values={items}
                    onReorder={setItems}
                    className="flex flex-wrap md:flex-nowrap gap-3 items-center justify-center z-10 w-full px-4"
                >
                    {items.map((word) => (
                        <Reorder.Item
                            key={word}
                            value={word}
                            className={`
                 bg-white px-6 py-4 rounded-xl shadow-lg border-b-4 cursor-grab active:cursor-grabbing font-black text-2xl
                 ${isChecking
                                    ? (isCorrect ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50 animate-shake')
                                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'}
               `}
                            style={{ touchAction: 'none' }} // Crucial for mobile drag
                        >
                            {word}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                {/* Success Overlay specific to this game logic */}
                <AnimatePresence>
                    {isCorrect && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center"
                        >
                            <div className="text-6xl text-green-500 mb-2"><Check size={80} /></div>
                            <h3 className="text-3xl font-black text-green-600">Tuyệt vời!</h3>
                            <p className="text-xl font-bold text-slate-500 mt-2">Cầu đã được nối liền!</p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={checkOrder}
                    disabled={isChecking}
                    className="bg-amber-500 text-slate-900 px-10 py-4 rounded-full font-black text-xl hover:bg-amber-400 active:translate-y-1 shadow-[0_6px_0_0_#b45309] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Kiểm Tra Nào! 🚀
                </button>
            </div>

        </div>
    );
}
