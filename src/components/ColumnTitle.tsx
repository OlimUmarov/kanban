import { useState, useRef, useEffect } from 'react';
import { CloseIcon } from '../icons/icon';
import { useStore } from '../features/store';
import useAutosizeTextArea from '../features/hooks/useAutosizeTextArea';

type ColumnTitlePropsType = {
    title: string;
    index: number;
    activeTitleIndex: number | null;
};

export const ColumnTitle = ({ title, activeTitleIndex, index }: ColumnTitlePropsType) => {
    const [inputValue, setInputValue] = useState<string | null>(activeTitleIndex === index ? title : null);
    const formRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const titles = useStore((state) => state.titles);
    const setTitles = useStore((state) => state.setTitles);
    const setActiveTitleIndex = useStore((state) => state.setActiveTitleIndex);

    useAutosizeTextArea(textAreaRef.current, inputValue || title);

    const editTitle = () => {
        const text = inputValue && inputValue?.trim() !== '' ? inputValue : `New Column ${index + 1}`;

        const updatedTitles = [...titles];
        updatedTitles[index] = text; // Update only the title for the current index

        setTitles(updatedTitles);
        setInputValue(null); // Reset the input value
        setActiveTitleIndex(null); // Hide the textarea
        localStorage.setItem('titles', JSON.stringify(updatedTitles)); // Save updated titles to local storage
    };

    useEffect(() => {
        title && setInputValue(title);
    }, [title])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                editTitle();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [formRef, titles]);

    return (
        <div className='max-w-card w-full px-2 py-2 my-2'>
            {activeTitleIndex === index ? (
                <div ref={formRef} className="flex flex-col gap-3 bg-main-gray p-2 rounded-xl shadow-md mr-5">
                    <textarea
                        ref={textAreaRef}
                        className="max-w-card border border-gray-300 rounded-md p-2 overflow-y-hidden focus:outline-main-blue shadow-md"
                        placeholder="Enter new title"
                        value={inputValue !== null ? inputValue : title}
                        autoFocus
                        maxLength={200}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="bg-main-blue w-fit hover:bg-main-blue-hover text-white py-1.5 px-4 rounded transition-colors"
                            onClick={editTitle} // Save when clicked
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="hover:bg-gray-300 text-white py-1 px-3 rounded"
                            onClick={() => setActiveTitleIndex(null)} // Hide input when clicking "Close"
                        >
                            <CloseIcon className="h-3.5 w-3.5 stroke-black" />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => setActiveTitleIndex(index)} // Show input on click
                    className="cursor-pointer transition-opacity text-ellipsis whitespace-normal break-words mr-2 text-white text-16 font-medium"
                >
                    {title}
                </div>
            )}
        </div>
    );
};
