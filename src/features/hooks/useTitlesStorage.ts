import { useEffect } from 'react';

export const useTitlesStorage = (setTitles: (titles: string[]) => void) => {
    useEffect(() => {
        const savedTitles = localStorage.getItem('titles');
        setTitles(savedTitles ? JSON.parse(savedTitles) : []);
    }, [setTitles]);
}
