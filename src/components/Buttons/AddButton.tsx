import { PlusIcon } from "../../icons/icon";

type AddButtonProps = {
    onClick: () => void;
};

export const AddButton = ({ onClick }: AddButtonProps) => (
    <button
        type="button"
        className="flex gap-2 items-center justify-start h-fit rounded-xl py-2 px-2 z-10 bg-main-gray text-slate-300 bg-opacity-0 group-hover:text-white hover:bg-opacity-20 transition-colors"
        onClick={onClick}
    >
        <PlusIcon className="h-6 w-6 fill-slate-300 group-hover:fill-white" />
        Add another card
    </button>
);