import { useEffect } from "react";
import { ItemGroups } from "../types";

interface UseLocalStorageParams {
    cards: ItemGroups;
    titles: string[];
    setCards: (cards: ItemGroups) => void;
    setTitles: (inputValue: string[]) => void;
}

export function useLocalStorage({ cards, titles, setCards, setTitles, }: UseLocalStorageParams) {
    useEffect(() => {
        const savedState = localStorage.getItem("itemGroups");
        const savedTitles = localStorage.getItem("titles");
        setCards(savedState ? JSON.parse(savedState) : Array.from({ length: 3 }, () => []));
        setTitles(savedTitles ? JSON.parse(savedTitles) : ["ToDo", "Progress", "Done"]);
    }, [setCards, setTitles]);

    useEffect(() => {
        localStorage.setItem("itemGroups", JSON.stringify(cards));
        if (titles.length) {
            localStorage.setItem("titles", JSON.stringify(titles));
        }
    }, [cards, titles]);
}
