import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GameState {
    playerName: string | null;
    isCurator: boolean;
    currentTask: number;  // 0-indexed
    collectedLetters: string[];
    completedTasks: number[];
    hintsUsed: number;
    questStarted: boolean;
    questCompleted: boolean;
    secretPageVisited: boolean;
    // Actions
    setPlayer: (name: string, isCurator?: boolean) => void;
    completeTask: (taskIndex: number, letter: string | null) => void;
    useHint: () => void;
    startQuest: () => void;
    visitSecretPage: () => void;
    reset: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            playerName: null,
            isCurator: false,
            currentTask: 0,
            collectedLetters: [],
            completedTasks: [],
            hintsUsed: 0,
            questStarted: false,
            questCompleted: false,
            secretPageVisited: false,

            setPlayer: (name, isCurator = false) =>
                set((state) => {
                    if (state.playerName !== name) {
                        return {
                            playerName: name,
                            isCurator,
                            currentTask: 0,
                            collectedLetters: [],
                            completedTasks: [],
                            hintsUsed: 0,
                            questStarted: false,
                            questCompleted: false,
                            secretPageVisited: false,
                        };
                    }
                    return { playerName: name, isCurator };
                }),

            completeTask: (taskIndex, letter) =>
                set((state) => {
                    if (state.completedTasks.includes(taskIndex)) return state;
                    const newLetters = letter
                        ? [...state.collectedLetters, letter]
                        : [...state.collectedLetters];
                    const newCompleted = [...state.completedTasks, taskIndex];
                    const isQuestDone = newCompleted.length >= 7;
                    return {
                        completedTasks: newCompleted,
                        collectedLetters: newLetters,
                        currentTask: isQuestDone ? taskIndex : taskIndex + 1,
                        questCompleted: isQuestDone,
                    };
                }),

            useHint: () => set((state) => ({ hintsUsed: state.hintsUsed + 1 })),

            startQuest: () => set({ questStarted: true }),

            visitSecretPage: () => set({ secretPageVisited: true }),

            reset: () =>
                set({
                    playerName: null,
                    isCurator: false,
                    currentTask: 0,
                    collectedLetters: [],
                    completedTasks: [],
                    hintsUsed: 0,
                    questStarted: false,
                    questCompleted: false,
                    secretPageVisited: false,
                }),
        }),
        { name: 'eight-march-quest' }
    )
);
