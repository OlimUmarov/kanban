import { PlusIcon } from "../../icons/icon";

interface AddColumnButtonProps {
    addNewGroup: () => void;
}

export const AddColumnButton = ({ addNewGroup }: AddColumnButtonProps) => {
    return (
        <button
            type="button"
            className="group min-w-[300px] flex gap-2 items-center mx-2 justify-center h-fit rounded-xl py-3 px-4 z-10 bg-main-gray text-slate-300 bg-opacity-10 hover:bg-opacity-20 hover:text-white transition-colors"
            onClick={addNewGroup}
        >
            <PlusIcon className="h-6 w-6 fill-slate-300 group-hover:fill-white" />
            Add another column
        </button>
    );
};

