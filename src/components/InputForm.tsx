import { PlusIcon } from "../icons/icon"
import { useStore } from '../features/store';
import { Input } from ".";
import { ItemType } from "../features/types";

type InputFormPropsType = {
    groupIndex: number;
    isDraging: boolean;
    addNewItemToGroup: (groupIndex: number, item: ItemType) => void
}

export const InputForm = ({ groupIndex, addNewItemToGroup, isDraging }: InputFormPropsType) => {
    const inputValue = useStore((state) => state.inputValue);
    const setInputValue = useStore((state) => state.setInputValue);

    return (
        <div className="flex flex-col gap-5 group">
            {(inputValue?.groupdIndex === groupIndex) ?
                <Input
                    groupIndex={groupIndex}
                    inputValue={inputValue}
                    title="Add card"
                    addNewItemToGroup={addNewItemToGroup}
                    setInputValue={setInputValue}
                />
                : (!isDraging) &&
                <button
                    type="button"
                    className=" flex gap-2 items-center justify-start h-fit rounded-xl py-2 px-2 z-10 bg-main-gray text-slate-300 bg-opacity-0 group-hover:text-white hover:bg-opacity-20 transition-colors"
                    onClick={() => setInputValue({ id: String(Date.now()), groupdIndex: groupIndex, content: "" })}
                >
                    <PlusIcon className="h-6 w-6 fill-slate-300 group-hover:fill-white" />
                    Add another card
                </button>
            }
        </div>
    )
}

