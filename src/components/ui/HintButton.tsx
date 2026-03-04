"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

interface HintButtonProps {
    title: string;
    description: React.ReactNode;
}

export default function HintButton({ title, description }: HintButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 bg-amber-400 text-amber-900 px-5 py-2.5 rounded-full shadow-md hover:bg-amber-300 hover:shadow-lg active:scale-95 transition-all font-bold group"
            >
                <HelpCircle size={22} className="group-hover:rotate-12 transition-transform" />
                Hướng dẫn
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="text-2xl font-black text-amber-500 mb-4 flex items-center gap-3">
                                <HelpCircle size={32} /> {title}
                            </h3>

                            <div className="text-slate-600 text-[1.1rem] leading-relaxed space-y-4 font-medium">
                                {description}
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-8 w-full bg-slate-800 text-white py-3.5 rounded-xl font-bold hover:bg-slate-700 active:scale-95 transition-all shadow-[0_4px_0_0_#334155]"
                            >
                                Đã hiểu! Xong báo cáo! 🫡
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
