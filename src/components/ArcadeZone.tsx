"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X, Bug, Blocks } from 'lucide-react';

// Import Games
import TimeBasketGame from './games/TimeBasketGame';
import KeywordScannerGame from './games/KeywordScannerGame';
import MagicCardsGame from './games/MagicCardsGame';
import SpaceShooterGame from './games/SpaceShooterGame';
import BugHunterGame from './games/BugHunterGame';
import SentenceBuilderGame from './games/SentenceBuilderGame';

type GameMode = 'NONE' | 'BASKET' | 'SCANNER' | 'CARDS' | 'SHOOTER' | 'BUG' | 'BUILDER';

export default function ArcadeZone() {
    const [activeGame, setActiveGame] = useState<GameMode>('NONE');

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">

            {/* Menu Selection (Visible when no game is active) */}
            <AnimatePresence mode="wait">
                {activeGame === 'NONE' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <div className="col-span-full mb-8 text-center">
                            <h2 className="text-4xl font-black text-slate-800 flex items-center justify-center gap-3">
                                <span className="text-5xl text-purple-500"><Gamepad2 size={48} /></span> Khu Vui Chơi
                            </h2>
                            <p className="text-slate-500 font-bold mt-2 text-xl">
                                Chọn một trò chơi để rèn luyện trí não và thu thập thật nhiều sao nào! ✨
                            </p>
                        </div>

                        {/* Game 1 Card */}
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveGame('BASKET')}
                            className="bg-white rounded-[2rem] p-6 shadow-xl border-4 border-slate-100 cursor-pointer flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform">🧺</div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Rổ Thời Gian</h3>
                            <p className="text-slate-500 font-bold">Kéo thả từ khóa vào đúng chiếc rổ Quá Khứ, Hiện Tại, Tương Lai.</p>
                        </motion.div>

                        {/* Game 2 Card */}
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveGame('SCANNER')}
                            className="bg-white rounded-[2rem] p-6 shadow-xl border-4 border-slate-100 cursor-pointer flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Máy Quét Dấu Hiệu</h3>
                            <p className="text-slate-500 font-bold">Luyện mắt tinh tường để tìm ra các "thần chú" ẩn trong câu.</p>
                        </motion.div>

                        {/* Game 3 Card */}
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveGame('CARDS')}
                            className="bg-white rounded-[2rem] p-6 shadow-xl border-4 border-slate-100 cursor-pointer flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform">🃏</div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Thẻ Bài Ma Thuật</h3>
                            <p className="text-slate-500 font-bold">Ôn tập siêu tốc với flashcards lật bằng kỹ xảo 3D đẹp mắt.</p>
                        </motion.div>

                        {/* Game 4 Card */}
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveGame('SHOOTER')}
                            className="bg-slate-900 rounded-[2rem] p-6 shadow-xl border-4 border-slate-700 cursor-pointer flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
                            <h3 className="text-2xl font-black text-white mb-2">Bắn Tàu Vũ Trụ</h3>
                            <p className="text-slate-400 font-bold">Bắn hạ thiên thạch bằng cách chọn đúng đáp án thật nhanh.</p>
                        </motion.div>

                        {/* Game 5 Card */}
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveGame('BUG')}
                            className="bg-emerald-50 rounded-[2rem] p-6 shadow-xl border-4 border-emerald-200 cursor-pointer flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform text-rose-500"><Bug size={48} /></div>
                            <h3 className="text-2xl font-black text-emerald-800 mb-2">Thợ Săn Bắt Bọ</h3>
                            <p className="text-emerald-600 font-bold">Truy tìm và tiêu diệt các lỗi ngữ pháp ẩn nấp trong đoạn văn.</p>
                        </motion.div>

                        {/* Game 6 Card */}
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveGame('BUILDER')}
                            className="bg-sky-50 rounded-[2rem] p-6 shadow-xl border-4 border-sky-200 cursor-pointer flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform text-sky-500"><Blocks size={48} /></div>
                            <h3 className="text-2xl font-black text-sky-800 mb-2">Xây Cầu Qua Sông</h3>
                            <p className="text-sky-600 font-bold">Kéo thả sắp xếp các từ lộn xộn thành một câu hoàn chỉnh.</p>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active Game Container */}
            <AnimatePresence mode="wait">
                {activeGame !== 'NONE' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative pt-12"
                    >
                        {/* Back to Menu Button */}
                        <button
                            onClick={() => setActiveGame('NONE')}
                            className="absolute top-0 left-4 md:left-0 z-10 flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-full font-bold hover:bg-slate-700 transition-colors shadow-lg"
                        >
                            <X size={20} /> Thoát game
                        </button>

                        {/* Render Game */}
                        <div className="mt-8">
                            {activeGame === 'BASKET' && <TimeBasketGame />}
                            {activeGame === 'SCANNER' && <KeywordScannerGame />}
                            {activeGame === 'CARDS' && <MagicCardsGame />}
                            {activeGame === 'SHOOTER' && <SpaceShooterGame />}
                            {activeGame === 'BUG' && <BugHunterGame />}
                            {activeGame === 'BUILDER' && <SentenceBuilderGame />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
