"use client"

import React from 'react';
import { Star, Menu, User } from 'lucide-react';
import { useGameStore } from '@/lib/store';

export default function Header() {
    const score = useGameStore(state => state.score);
    const level = useGameStore(state => state.level);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

                {/* Left: Avatar & Level */}
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm p-2 pr-4 rounded-full shadow-lg border-2 border-slate-200">
                    <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                        <User className="text-amber-700" size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-800 leading-tight">Bé 9 Tuổi</span>
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Level {level}</span>
                        </div>
                    </div>
                </div>

                {/* Center: Title (Hidden on mobile) */}
                <div className="hidden md:flex bg-slate-800 text-white px-6 py-2 rounded-full font-black tracking-widest uppercase shadow-lg border-4 border-slate-900 shadow-[0_4px_0_0_#0f172a]">
                    Vương Quốc 12 Thì 🏰
                </div>

                {/* Right: Score & Menu */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-2 border-amber-200 transition-all hover:scale-105 cursor-pointer" title="Số sao đạt được">
                        <Star className="text-amber-500 fill-amber-500" size={24} />
                        <span className="font-black text-xl text-amber-600">{score}</span>
                    </div>

                    <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-600">
                        <Menu size={24} />
                    </button>
                </div>

            </div>
        </header>
    );
}
