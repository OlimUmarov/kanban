// components/InputForm.tsx

import { Input } from ".";
import { useStore } from "../../features/store";
import { ItemType } from "../../features/types";
import { AddButton } from "../Buttons";


type InputFormPropsType = {
    groupIndex: number;
    isDraging: boolean;
    addNewItemToGroup: (groupIndex: number, item: ItemType) => void;
};

export const InputForm = ({ groupIndex, addNewItemToGroup, isDraging }: InputFormPropsType) => {
    const inputValue = useStore((state) => state.inputValue);
    const setInputValue = useStore((state) => state.setInputValue);

    const onAddButtonClick = () => {
        setInputValue({
            id: String(Date.now()),
            groupdIndex: groupIndex,
            content: "",
        });
    };

    const isInputVisible = inputValue?.groupdIndex === groupIndex;
    const showAddButton = !isDraging && !isInputVisible;

    return (
        <div className="flex flex-col gap-5 group">
            {isInputVisible ? (
                <Input
                    groupIndex={groupIndex}
                    inputValue={inputValue}
                    title="Add card"
                    addNewItemToGroup={addNewItemToGroup}
                    setInputValue={setInputValue}
                />
            ) : (
                showAddButton && (
                    <AddButton onClick={onAddButtonClick} />
                )
            )}
        </div>
    );
};


