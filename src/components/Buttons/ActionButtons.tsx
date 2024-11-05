
import { CloseIcon } from "../../icons/icon";

type ActionButtonsProps = {
    onAddItem: () => void;
    onClose: () => void;
    title: string;
};

export const ActionButtons = ({ onAddItem, onClose, title }: ActionButtonsProps) => (
    <div className="flex gap-2">
        <button
            type="button"
            className="bg-main-blue hover:bg-main-blue-hover text-white py-1.5 px-4 rounded transition-colors"
            onClick={onAddItem}
        >
            {title}
        </button>
        <button
            type="button"
            className="hover:bg-gray-300 text-white py-1 px-3 rounded"
            onClick={onClose}
        >
            <CloseIcon className="h-3.5 w-3.5 stroke-black" />
        </button>
    </div>
);