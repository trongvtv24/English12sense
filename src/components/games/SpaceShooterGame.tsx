"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Target } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { useAudioEffects } from '@/lib/useAudioEffects';

interface QuizItem {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    tense: string;
}

const QUIZZES: QuizItem[] = [
    // Present Simple
    { id: 'q1', question: 'Water ______ at 100 degrees Celsius.', options: ['boil', 'boils', 'is boiling'], correctAnswer: 'boils', tense: 'Present Simple' },
    { id: 'q2', question: 'He ______ to the gym every morning.', options: ['go', 'goes', 'going'], correctAnswer: 'goes', tense: 'Present Simple' },
    { id: 'q3', question: 'Cats ______ fish.', options: ['likes', 'like', 'are liking'], correctAnswer: 'like', tense: 'Present Simple' },
    { id: 'q4', question: 'The train ______ at 6 PM.', options: ['leaves', 'leave', 'is leaving'], correctAnswer: 'leaves', tense: 'Present Simple' },

    // Present Continuous
    { id: 'q5', question: 'Look! The dog ______ after the postman.', options: ['runs', 'is running', 'run'], correctAnswer: 'is running', tense: 'Present Continuous' },
    { id: 'q6', question: 'I ______ a really good book right now.', options: ['read', 'am reading', 'reading'], correctAnswer: 'am reading', tense: 'Present Continuous' },
    { id: 'q7', question: 'They ______ dinner at the moment.', options: ['have', 'are having', 'having'], correctAnswer: 'are having', tense: 'Present Continuous' },

    // Present Perfect
    { id: 'q8', question: 'I ______ never ______ sushi before.', options: ['have / eaten', 'has / eaten', 'am / eating'], correctAnswer: 'have / eaten', tense: 'Present Perfect' },
    { id: 'q9', question: 'She ______ already ______ her homework.', options: ['have / finished', 'has / finished', 'is / finishing'], correctAnswer: 'has / finished', tense: 'Present Perfect' },
    { id: 'q10', question: 'We ______ here since 2015.', options: ['lived', 'have lived', 'are living'], correctAnswer: 'have lived', tense: 'Present Perfect' },

    // Past Simple
    { id: 'q11', question: 'We ______ to Paris last summer.', options: ['go', 'went', 'have gone'], correctAnswer: 'went', tense: 'Past Simple' },
    { id: 'q12', question: 'She ______ a new car two days ago.', options: ['buys', 'bought', 'has bought'], correctAnswer: 'bought', tense: 'Past Simple' },
    { id: 'q13', question: 'I ______ him yesterday.', options: ['see', 'saw', 'have seen'], correctAnswer: 'saw', tense: 'Past Simple' },

    // Past Continuous
    { id: 'q14', question: 'I ______ TV when the phone rang.', options: ['watched', 'was watching', 'am watching'], correctAnswer: 'was watching', tense: 'Past Continuous' },
    { id: 'q15', question: 'They ______ football at 5 PM yesterday.', options: ['played', 'were playing', 'are playing'], correctAnswer: 'were playing', tense: 'Past Continuous' },
    { id: 'q16', question: 'While she ______, he was reading.', options: ['slept', 'was sleeping', 'sleeps'], correctAnswer: 'was sleeping', tense: 'Past Continuous' },

    // Past Perfect
    { id: 'q17', question: 'By the time I arrived, they ______.', options: ['left', 'had left', 'have left'], correctAnswer: 'had left', tense: 'Past Perfect' },
    { id: 'q18', question: 'She ______ the movie before we watched it.', options: ['saw', 'had seen', 'has seen'], correctAnswer: 'had seen', tense: 'Past Perfect' },
    { id: 'q19', question: 'I realized I ______ my keys at home.', options: ['forgot', 'had forgotten', 'forget'], correctAnswer: 'had forgotten', tense: 'Past Perfect' },

    // Future Simple / Near Future
    { id: 'q20', question: 'I think it ______ rain tomorrow.', options: ['will', 'is going to', 'rains'], correctAnswer: 'will', tense: 'Future Simple' },
    { id: 'q21', question: 'Look at those clouds! It ______ rain.', options: ['will', 'is going to', 'rains'], correctAnswer: 'is going to', tense: 'Near Future' },
    { id: 'q22', question: 'We ______ meet tomorrow at 10 AM.', options: ['will', 'are going to', 'meet'], correctAnswer: 'will', tense: 'Future Simple' }
];

export default function SpaceShooterGame() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [feedback, setFeedback] = useState<'IDLE' | 'HIT' | 'MISS'>('IDLE');

    const addScore = useGameStore(state => state.addScore);
    const { playSound } = useAudioEffects();

    const [stars] = useState(() => {
        return [...Array(20)].map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            delay: Math.random() * 2
        }));
    });
    const quiz = QUIZZES[currentIndex];

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (currentIndex < QUIZZES.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setTimeLeft(10);
            setFeedback('IDLE');
        } else {
            setIsPlaying(false);
            alert("Nhiệm vụ không gian thành công! 🌟");
            // Reset for replay
            setCurrentIndex(0);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-slate-900 rounded-[2rem] shadow-2xl border-4 border-slate-700 text-white relative overflow-hidden">

            {/* Background space elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {stars.map((star, i) => (
                    <div key={i} className="absolute bg-white rounded-full w-1 h-1 animate-pulse"
                        style={{
                            top: `${star.top}%`,
                            left: `${star.left}%`,
                            animationDelay: `${star.delay}s`
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
                        <span className="font-bold text-slate-400">Thiên thạch {currentIndex + 1}/{QUIZZES.length}</span>
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
                                {quiz.question.split('___').map((part: string, i: number, arr: string[]) => (
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
                        {quiz.options.map((opt: string, i: number) => (
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
