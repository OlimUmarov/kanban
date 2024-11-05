import { useRef } from 'react';
import {TextArea } from '.';
import { ItemType } from '../../features/types';
import { useAutosizeTextArea, useClickOutside } from '../../features/hooks';
import { ActionButtons } from '../Buttons';

type InputPropsType = {
    groupIndex: number;
    inputValue: ItemType;
    title: string;
    setInputValue: (inputValue: ItemType | null) => void;
    addNewItemToGroup: (groupIndex: number, item: ItemType) => void;
};

export const Input = ({ groupIndex, inputValue, title, addNewItemToGroup, setInputValue, }: InputPropsType) => {
    const formRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(textAreaRef.current, inputValue.content);
    useClickOutside(formRef, () => setInputValue(null));

    const handleAddItem = () => {
        if (inputValue.content.trim()) {
            addNewItemToGroup(groupIndex, inputValue);
            setInputValue(null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue({ ...inputValue, content: e.target.value });
    };

    return (
        <div ref={formRef} className="max-w-card flex flex-col gap-3 bg-main-gray p-2 rounded-xl">
            <TextArea
                ref={textAreaRef}
                value={inputValue.content}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
            />
            <ActionButtons
                onAddItem={handleAddItem}
                onClose={() => setInputValue(null)}
                title={title}
            />
        </div>
    );
};

