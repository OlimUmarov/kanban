import { ItemType } from "./types";

export const reorder = (list: ItemType<string>[], startIndex: number, endIndex: number): ItemType<string>[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const move = (
    source: ItemType<string>[],
    destination: ItemType<string>[],
    droppableSource: { index: number; droppableId: string },
    droppableDestination: { index: number; droppableId: string }
) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return {
        [droppableSource.droppableId]: sourceClone,
        [droppableDestination.droppableId]: destClone,
    };
};
