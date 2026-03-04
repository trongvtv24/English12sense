"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { useAudioEffects } from '@/lib/useAudioEffects';
import { Rocket, Target } from 'lucide-react';

interface QuizItem {
    id: string;
    sentence: string; // use ___ for the blank
    options: string[];
    correctAnswer: string;
}

const QUIZZES: QuizItem[] = [
    // Hiện tại đơn
    { id: 'sq1', sentence: "I ___ my grandparents every weekend.", options: ['visit', 'am visiting', 'visited'], correctAnswer: 'visit' },
    { id: 'sq2', sentence: "Water ___ at 100 degrees Celsius.", options: ['boil', 'boils', 'is boiling'], correctAnswer: 'boils' },
    { id: 'sq3', sentence: "The train ___ at 8 AM tomorrow.", options: ['leaves', 'is leaving', 'left'], correctAnswer: 'leaves' },

    // Hiện tại tiếp diễn
    { id: 'sq4', sentence: "Listen! The baby ___ in the bedroom.", options: ['cries', 'is crying', 'cried'], correctAnswer: 'is crying' },
    { id: 'sq5', sentence: "We ___ for our English exam right now.", options: ['study', 'are studying', 'studied'], correctAnswer: 'are studying' },
    { id: 'sq6', sentence: "She ___ dinner at the moment.", options: ['cooks', 'is cooking', 'has cooked'], correctAnswer: 'is cooking' },

    // Hiện tại hoàn thành
    { id: 'sq7', sentence: "They ___ in this city since 2015.", options: ['live', 'are living', 'have lived'], correctAnswer: 'have lived' },
    { id: 'sq8', sentence: "I ___ three cups of coffee today.", options: ['drink', 'drank', 'have drunk'], correctAnswer: 'have drunk' },
    { id: 'sq9', sentence: "She ___ her homework already.", options: ['finishes', 'finished', 'has finished'], correctAnswer: 'has finished' },

    // Quá khứ đơn
    { id: 'sq10', sentence: "We ___ to the beach last summer.", options: ['go', 'went', 'have gone'], correctAnswer: 'went' },
    { id: 'sq11', sentence: "He ___ a new car two days ago.", options: ['buys', 'bought', 'has bought'], correctAnswer: 'bought' },
    { id: 'sq12', sentence: "I ___ Mary at the park yesterday.", options: ['see', 'saw', 'have seen'], correctAnswer: 'saw' },

    // Quá khứ tiếp diễn
    { id: 'sq13', sentence: "When I called him, he ___ TV.", options: ['watched', 'was watching', 'is watching'], correctAnswer: 'was watching' },
    { id: 'sq14', sentence: "They ___ football at 5 PM yesterday.", options: ['play', 'played', 'were playing'], correctAnswer: 'were playing' },
    { id: 'sq15', sentence: "While I was reading, my brother ___ music.", options: ['listens', 'listened', 'was listening'], correctAnswer: 'was listening' },

    // Quá khứ hoàn thành
    { id: 'sq16', sentence: "By the time we arrived, the movie ___.", options: ['starts', 'started', 'had started'], correctAnswer: 'had started' },
    { id: 'sq17', sentence: "She ___ all the food before I came.", options: ['eats', 'ate', 'had eaten'], correctAnswer: 'had eaten' },
    { id: 'sq18', sentence: "They ___ the report before the meeting began.", options: ['finish', 'finished', 'had finished'], correctAnswer: 'had finished' },

    // Tương lai đơn / Gần
    { id: 'sq19', sentence: "I think it ___ rain tomorrow.", options: ['will', 'is going to', 'rains'], correctAnswer: 'will' },
    { id: 'sq20', sentence: "Look at those dark clouds! It ___ rain.", options: ['will', 'is going to', 'rains'], correctAnswer: 'is going to' },
    { id: 'sq21', sentence: "Don't worry, I ___ help you with that.", options: ['will', 'am going to', 'help'], correctAnswer: 'will' },
    { id: 'sq22', sentence: "We ___ our grandparents next week.", options: ['will visit', 'are going to visit', 'visit'], correctAnswer: 'are going to visit' }
];

export default function SpaceShooterGame() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [feedback, setFeedback] = useState<'IDLE' | 'HIT' | 'MISS'>('IDLE');

    const addScore = useGameStore(state => state.addScore);
    const { playSound } = useAudioEffects();
    const quiz = QUIZZES[currentIdx];

    // Timer logic
    useEffect(() => {
        if (!isPlaying || feedback !== 'IDLE') return;

        if (timeLeft <= 0) {
            handleTimeout();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, feedback]);

    const startGame = () => {
        setIsPlaying(true);
        setTimeLeft(10);
        setFeedback('IDLE');
        playSound('POP');
    };

    const handleTimeout = () => {
        setFeedback('MISS');
        playSound('ERROR');
        setTimeout(() => nextRound(), 1500);
    };

    const handleShoot = (selectedOption: string) => {
        if (feedback !== 'IDLE') return;

        if (selectedOption === quiz.correctAnswer) {
            setFeedback('HIT');
            playSound('SHOOT');
            addScore(50 + timeLeft * 5); // bonus points for speed
        } else {
            setFeedback('MISS');
            playSound('ERROR');
        }

        setTimeout(() => nextRound(), 1500);
    };

    const nextRound = () => {
        if (currentIdx < QUIZZES.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setTimeLeft(10);
            setFeedback('IDLE');
        } else {
            setIsPlaying(false);
            alert("Nhiệm vụ không gian thành công! 🌟");
            // Reset for replay
            setCurrentIdx(0);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-slate-900 rounded-[2rem] shadow-2xl border-4 border-slate-700 text-white relative overflow-hidden">

            {/* Background space elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute bg-white rounded-full w-1 h-1 animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="text-center mb-8 relative z-10">
                <h2 className="text-3xl font-black text-white flex items-center justify-center gap-3">
                    <span className="text-4xl text-sky-400"><Rocket size={40} /></span> Bắn Tàu Vũ Trụ
                </h2>
                <p className="text-slate-400 font-bold mt-2">
                    Chọn đúng đạn ngữ pháp để bắn hạ thiên thạch đang rơi!
                </p>
            </div>

            {!isPlaying ? (
                <div className="flex justify-center p-12">
                    <button
                        onClick={startGame}
                        className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-black text-2xl hover:bg-amber-400 active:scale-95 transition-all shadow-[0_6px_0_0_#b45309]"
                    >
                        🚀 KHỞI HÀNH NGAY 🚀
                    </button>
                </div>
            ) : (
                <div className="relative z-10 flex flex-col items-center">

                    {/* Top Bar: Timer & Progress */}
                    <div className="w-full flex justify-between items-center mb-12 px-4">
                        <span className="font-bold text-slate-400">Thiên thạch {currentIdx + 1}/{QUIZZES.length}</span>
                        <div className={`text-2xl font-black px-4 py-1 rounded-full ${timeLeft <= 3 ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`}>
                            ⏳ {timeLeft}s
                        </div>
                    </div>

                    {/* Falling Meteor (The Question) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={quiz.id}
                            initial={{ y: -50, opacity: 0, scale: 0.8 }}
                            animate={{
                                y: feedback === 'IDLE' ? [0, 20, 0] : 0,
                                opacity: 1,
                                scale: 1
                            }}
                            exit={{ opacity: 0, scale: feedback === 'HIT' ? 0 : 1 }}
                            transition={{
                                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                            }}
                            className="bg-slate-800 border-4 border-slate-600 p-8 rounded-3xl shadow-2xl mb-12 max-w-xl text-center relative"
                        >
                            {/* Explosion effect if hit */}
                            {feedback === 'HIT' && (
                                <div className="absolute inset-0 flex items-center justify-center text-8xl z-50">💥</div>
                            )}
                            {feedback === 'MISS' && (
                                <div className="absolute inset-0 bg-red-500/20 rounded-2xl flex items-center justify-center text-6xl z-50">❌</div>
                            )}

                            <Target className="absolute -top-6 -left-6 text-slate-500 opacity-50" size={48} />
                            <p className="text-2xl font-bold leading-relaxed">
                                {quiz.sentence.split('___').map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {part}
                                        {i < arr.length - 1 && (
                                            <span className="inline-block border-b-4 border-dashed border-amber-500 w-24 mx-2"></span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* The Ammo (Options) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                        {quiz.options.map((opt, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ y: -5, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={feedback !== 'IDLE'}
                                onClick={() => handleShoot(opt)}
                                className={`
                  py-4 rounded-xl font-black text-xl border-b-4 transition-colors
                  ${feedback !== 'IDLE'
                                        ? (opt === quiz.correctAnswer ? 'bg-green-500 border-green-700' : 'bg-slate-700 border-slate-800 text-slate-500')
                                        : 'bg-sky-500 border-sky-700 hover:bg-sky-400'}
                `}
                            >
                                {opt}
                            </motion.button>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
}
