import { create } from "zustand";
import { ItemGroups, ItemType } from "./types";


type StoreType = {
    cards: ItemGroups;
    activeTitleIndex: number | null;
    inputValue: ItemType | null;
    titles: string[];
    setCards: (cards: ItemGroups) => void;
    setInputValue: (inputValue: ItemType | null) => void;
    setTitles: (inputValue: string[]) => void;
    setActiveTitleIndex: (index: number | null) => void;
}

export const useStore = create<StoreType>((set) => ({
    cards: [],
    titles: [],
    inputValue: null,
    activeTitleIndex: null,
    setActiveTitleIndex: (activeTitleIndex) => set({ activeTitleIndex }),
    setInputValue: (inputValue) => set({ inputValue }),
    setTitles: (titles) => set({ titles }),
    setCards: (cards) => set({ cards })
}));