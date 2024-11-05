import { ItemGroups, ItemType } from "../types";

export const reorder = (list: ItemType[], startIndex: number, endIndex: number): ItemType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const move = (
    source: ItemType[],
    destination: ItemType[],
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

export const onDragEnd = (result: any, cards: ItemGroups, setCards: any) => {
    const { source, destination } = result;
    if (!destination) {
        return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
        const items = reorder(cards[sInd], source.index, destination.index);
        const newState = [...cards];
        newState[sInd] = items;

        setCards(newState);
    } else {
        const result = move(cards[sInd], cards[dInd], source, destination);
        const newState = [...cards];
        newState[sInd] = result[sInd];
        newState[dInd] = result[dInd];

        setCards(newState);
    }
}

