import { useRef, useEffect } from 'react';
import { ItemType } from "../features/types";
import { CloseIcon } from "../icons/icon";
import useAutosizeTextArea from '../features/hooks/useAutosizeTextArea';

type InputPropsType = {
    groupIndex: number;
    inputValue: ItemType;
    title: string;
    setInputValue: (inputValue: ItemType | null) => void;
    addNewItemToGroup: (groupIndex: number, item: ItemType) => void;
};

export const Input = ({ groupIndex, inputValue, title, addNewItemToGroup, setInputValue }: InputPropsType) => {
    const formRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, inputValue.content);

    const handleAddItem = () => {
        if (inputValue.content.trim()) {
            addNewItemToGroup(groupIndex, inputValue);
            setInputValue(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setInputValue(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setInputValue]);

    return (
        <div ref={formRef} className="max-w-card flex flex-col gap-3 bg-main-gray p-2 rounded-xl">
            <textarea
                ref={textAreaRef}
                className="max-w-card border border-gray-300 rounded-md p-2 overflow-y-hidden focus:outline-main-blue shadow-md "
                placeholder="Enter new item"
                value={inputValue.content}
                autoFocus
                maxLength={200}
                onFocus={(e) => setInputValue({ ...inputValue, content: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                onChange={(e) =>
                    setInputValue({ ...inputValue, content: e.target.value })
                }
            />
            <div className="flex gap-2">
                <button
                    type="button"
                    className="bg-main-blue hover:bg-main-blue-hover text-white py-1.5 px-4 rounded transition-colors "
                    onClick={handleAddItem}
                >
                    {title}
                </button>
                <button
                    type="button"
                    className="hover:bg-gray-300 text-white py-1 px-3 rounded"
                    onClick={() => setInputValue(null)}
                >
                    <CloseIcon className="h-3.5 w-3.5 stroke-black" />
                </button>
            </div>
        </div>
    );
};
