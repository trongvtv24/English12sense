import { create } from 'zustand';

interface GameState {
    score: number;
    level: number;
    unlockedTenses: string[]; // IDs of unlocked tenses
    addScore: (points: number) => void;
    resetScore: () => void;
    unlockTense: (tenseId: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
    score: 120, // Initial score based on demo
    level: 1,
    unlockedTenses: ['present-simple', 'present-continuous', 'past-simple', 'near-future', 'future-simple'],

    addScore: (points) => set((state) => {
        const newScore = state.score + points;
        // Simple leveling logic: every 500 points = 1 level
        const newLevel = Math.floor(newScore / 500) + 1;
        return { score: newScore, level: newLevel };
    }),

    resetScore: () => set({ score: 0, level: 1 }),

    unlockTense: (tenseId) => set((state) => ({
        unlockedTenses: state.unlockedTenses.includes(tenseId)
            ? state.unlockedTenses
            : [...state.unlockedTenses, tenseId]
    })),
}));
