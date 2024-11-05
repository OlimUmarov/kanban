// helpers/cardHelpers.ts

import { ItemGroups, ItemType } from "../types";

type SetCardsFn = (cards: ItemGroups) => void;
type SetTitlesFn = (titles: string[]) => void;
type SetInputValueFn = (value: ItemType | null) => void;

export const deleteGroupById = (
    groupIndex: number,
    cards: ItemGroups,
    titles: string[],
    setCards: SetCardsFn,
    setTitles: SetTitlesFn
) => {
    const updatedCards = cards.filter((_, index) => index !== groupIndex);
    const updatedTitles = titles.filter((_, index) => index !== groupIndex);

    setCards(updatedCards);
    setTitles(updatedTitles);
    localStorage.setItem("titles", JSON.stringify(updatedTitles));
};

export const addNewItemToGroup = (
    groupIndex: number,
    item: ItemType,
    cards: ItemGroups,
    setCards: SetCardsFn,
    setInputValue: SetInputValueFn
) => {
    const updatedCards = [...cards];
    updatedCards[groupIndex].push(item);

    setCards(updatedCards);
    setInputValue(null);
};

export const editItemInGroup = (
    groupIndex: number,
    item: ItemType,
    cards: ItemGroups,
    setCards: SetCardsFn,
    setInputValue: SetInputValueFn
) => {
    const updatedCards = cards.map((group, index) =>
        index === groupIndex ? group.map((i) => (i.id === item.id ? item : i)) : group
    );

    setCards(updatedCards);
    setInputValue(null);
};

export const deleteItemFromGroup = (
    groupIndex: number,
    itemIndex: number,
    cards: ItemGroups,
    setCards: SetCardsFn
) => {
    const updatedCards = [...cards];
    updatedCards[groupIndex].splice(itemIndex, 1);

    setCards(updatedCards);
};
