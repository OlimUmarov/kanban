// components/CardItem.tsx

import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import { ItemType } from "../features/types";
import { EditIcon, RemoveIcon } from "../icons/icon";
import { useStore } from "../features/store";
import { IconButton } from "./Buttons";

type CardItemPropsType = {
    item: ItemType;
    groupIndex: number;
    index: number;
    deleteItemFromGroup: (groupIndex: number, index: number) => void;
};

export const CardItem = ({ item, groupIndex, index, deleteItemFromGroup }: CardItemPropsType) => {
    const setInputValue = useStore((state) => state.setInputValue);

    const onEditClick = () => setInputValue({ id: item.id, content: item.content });
    const onDeleteClick = () => deleteItemFromGroup(groupIndex, index);

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={classNames(
                        "group px-1 py-1.5 my-3 rounded-xl shadow-md border-2 hover:border-main-blue",
                        snapshot.isDragging ? "bg-green-200" : "bg-white"
                    )}
                >
                    <div className="flex justify-between items-center pl-2">
                        <p className="max-w-[90%] transition-opacity text-ellipsis whitespace-normal break-words">
                            {item.content}
                        </p>
                        <div className="flex items-center ">
                            <IconButton onClick={onEditClick} icon={<EditIcon />} />
                            <IconButton onClick={onDeleteClick} icon={<RemoveIcon />} hoverColor="hover:fill-red-500" />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};


