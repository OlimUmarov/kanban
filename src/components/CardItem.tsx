import { Draggable } from "react-beautiful-dnd";
import { ItemType } from "../features/types";
import classNames from "classnames";
import { EditIcon, RemoveIcon } from "../icons/icon";
import { useStore } from "../features/store";

type CardItemPropsType = {
    item: ItemType;
    groupIndex: number;
    index: number;
    deleteItemFromGroup: (groupIndex: number, index: number) => void;
}

export const CardItem = ({ item, groupIndex, index, deleteItemFromGroup }: CardItemPropsType) => {
    const setInputValue = useStore((state) => state.setInputValue);

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
                    <div className=" flex justify-between items-center pl-2">
                        <p className="max-w-[90%] transition-opacity text-ellipsis whitespace-normal break-words">{item.content}</p>
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-full transition-opacity"
                                onClick={() => setInputValue({ id: item.id, content: item.content })}
                            >
                                <EditIcon className="w-7 h-7 fill-gray-500 p-1" />
                            </button>
                            <button
                                type="button"
                                className="opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-full transition-opacity"
                                onClick={() => deleteItemFromGroup(groupIndex, index)}
                            >
                                <RemoveIcon className="w-7 h-7 fill-gray-500 hover:fill-red-500 p-1" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
