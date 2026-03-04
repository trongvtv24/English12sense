"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { tensesData, TenseData } from '@/data/tensesData';
import { Lock, Navigation } from 'lucide-react';

export default function InteractiveTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedTense, setSelectedTense] = useState<TenseData | null>(null);
    const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);

    // Auto scroll to present zone on mount
    useEffect(() => {
        if (containerRef.current) {
            // Present is around 100vw to 200vw, so scrolling to 100vw centers it nicely depending on viewport
            const windowWidth = window.innerWidth;
            containerRef.current.scrollTo({
                left: windowWidth,
                behavior: 'smooth'
            });
        }
    }, []);

    const handleNodeClick = (tense: TenseData) => {
        if (tense.isLockedDefault) {
            setIsLockedModalOpen(true);
        } else {
            setSelectedTense(tense);
        }
    };

    const closeModal = () => {
        setSelectedTense(null);
        setIsLockedModalOpen(false);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#f0fdf4] select-none">

            {/* Helper floating text */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/60 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold z-40 flex items-center gap-2 shadow-xl pointer-events-none">
                <Navigation className="animate-bounce" size={20} />
                <span>Giữ chuột và kéo để khám phá Trục Thời Gian!</span>
            </div>

            {/* Draggable Timeline Container */}
            <div
                ref={containerRef}
                className="w-full h-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                <motion.div
                    drag="x"
                    dragConstraints={containerRef}
                    // We set a very wide width: 300vw
                    className="flex h-full relative"
                    style={{ width: '300vw' }}
                >
                    {/* Main central line */}
                    <div className="absolute top-1/2 left-0 right-0 h-3 bg-slate-600 -translate-y-1/2 rounded-full shadow-md z-10" />

                    {/* ZONE: PAST (0vw - 100vw) */}
                    <div className="relative w-[100vw] h-full bg-gradient-to-r from-red-100 to-red-200">
                        <h2 className="absolute top-24 left-1/2 -translate-x-1/2 text-5xl font-black text-red-800/20 tracking-widest uppercase pointer-events-none">
                            Vùng Quá Khứ 🦕
                        </h2>
                    </div>

                    {/* ZONE: PRESENT (100vw - 200vw) */}
                    <div className="relative w-[100vw] h-full bg-gradient-to-r from-green-100 to-green-200 border-x-4 border-dashed border-green-800/30">
                        <h2 className="absolute top-24 left-1/2 -translate-x-1/2 text-5xl font-black text-green-800/20 tracking-widest uppercase pointer-events-none">
                            Vùng Hiện Tại 🧸
                        </h2>
                    </div>

                    {/* ZONE: FUTURE (200vw - 300vw) */}
                    <div className="relative w-[100vw] h-full bg-gradient-to-r from-sky-100 to-sky-200">
                        <h2 className="absolute top-24 left-1/2 -translate-x-1/2 text-5xl font-black text-sky-800/20 tracking-widest uppercase pointer-events-none">
                            Vùng Tương Lai 🚀
                        </h2>
                    </div>

                    {/* Render Nodes */}
                    {tensesData.map((tense) => {
                        const isPresentSimple = tense.id === 'present-simple';

                        return (
                            <motion.div
                                key={tense.id}
                                whileHover={{ scale: 1.2, y: -10 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleNodeClick(tense)}
                                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-white border-[6px] shadow-lg cursor-pointer z-20 transition-colors
                  ${tense.isLockedDefault ? 'bg-slate-200 border-slate-400 grayscale filter' : ''}
                  ${isPresentSimple ? 'w-[100px] h-[100px] animate-bounce-slow' : 'w-[80px] h-[80px]'}
                `}
                                style={{
                                    left: tense.position.left,
                                    borderColor: tense.isLockedDefault ? '#94a3b8' : tense.borderColor
                                }}
                            >
                                <div className={`text-4xl ${tense.isLockedDefault ? 'opacity-50' : ''}`}>
                                    {tense.icon}
                                </div>

                                {/* Node Title Label */}
                                <div className={`absolute w-48 text-center font-extrabold text-slate-800 text-lg drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] pointer-events-none
                  ${tense.id.includes('cont') || tense.id === 'future-simple' || tense.id === 'future-perfect' ? 'bottom-[-60px]' : 'top-[-60px]'}
                  ${isPresentSimple ? 'top-[-70px] text-xl' : ''}
                `}>
                                    {tense.name}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* MODALS */}
            {/* Tense Info Modal */}
            {selectedTense && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[2rem] p-8 w-full max-w-md text-center shadow-2xl relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full p-2">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="text-6xl mb-4 animate-bounce-slow">{selectedTense.icon}</div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">{selectedTense.name}</h2>

                        {selectedTense.nickname && (
                            <p className="text-green-600 font-bold mb-6 text-xl tracking-wide uppercase">{selectedTense.nickname}</p>
                        )}

                        <div className="bg-slate-50 rounded-2xl p-5 mb-6 shadow-inner text-left border-2 border-slate-100">
                            <p className="text-slate-700 font-bold mb-5 text-center px-2">{selectedTense.description}</p>

                            <div className="border-t-2 border-slate-200 pt-5">
                                <p className="text-xs font-black tracking-widest text-slate-400 uppercase mb-3 text-center">Thần chú nhận biết</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {selectedTense.keywords.map((kw, idx) => (
                                        <span key={idx} className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full font-black text-sm border-2 border-amber-200">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`border-4 rounded-2xl p-5 text-lg font-medium`} style={{ borderColor: selectedTense.borderColor, backgroundColor: `${selectedTense.borderColor}10` }}>
                            <p className="text-slate-800" dangerouslySetInnerHTML={{ __html: selectedTense.exampleHtml }} />
                        </div>

                        <button onClick={closeModal} className="mt-8 w-full bg-slate-800 text-white font-black py-4 rounded-xl hover:bg-slate-700 active:translate-y-1 transition-all text-xl shadow-[0_6px_0_0_#0f172a]">
                            Đã Rõ! Thử Luyện Tập →
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Locked Modal */}
            {isLockedModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-100 rounded-[2rem] p-8 w-full max-w-sm text-center shadow-2xl relative border-4 border-slate-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="text-7xl mb-6 opacity-40"><Lock className="mx-auto" size={72} /></div>
                        <h2 className="text-3xl font-black text-slate-600 mb-4">Thì Chưa Mở Khóa!</h2>
                        <p className="text-slate-500 font-bold mb-8 text-lg">Bé cần vượt qua các bài tập của <b>Thì Cơ Bản</b> để thu thập đủ Sao mở khóa khu vực này nhé!</p>
                        <button onClick={closeModal} className="w-full bg-amber-400 text-amber-900 font-black py-4 rounded-xl hover:bg-amber-300 active:translate-y-1 transition-all text-xl shadow-[0_6px_0_0_#b45309]">
                            Quay Lại Làm Nhiệm Vụ
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
