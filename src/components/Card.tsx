import { useEffect } from 'react';
import { Droppable } from "react-beautiful-dnd";
import { CardItem, ColumnTitle, Input, InputForm } from "./index";
import { useStore } from '../features/store';
import { ItemType } from '../features/types';
import classNames from 'classnames';
import { CloseIcon } from '../icons/icon';

type CardPropsType = {
  groupIndex: number;
  group: ItemType[];
};

export const Card = ({ groupIndex, group }: CardPropsType) => {
  const cards = useStore((state) => state.cards);
  const inputValue = useStore((state) => state.inputValue);
  const titles = useStore((state) => state.titles);
  const activeTitleIndex = useStore((state) => state.activeTitleIndex);
  const setCards = useStore((state) => state.setCards);
  const setInputValue = useStore((state) => state.setInputValue);
  const setTitles = useStore((state) => state.setTitles);

  useEffect(() => {
    const savedTitles = localStorage.getItem('titles');
    setTitles(savedTitles ? JSON.parse(savedTitles) : []);
  }, [setTitles]);

  const deleteGroupById = (groupIndex: number) => {
    const newState = [...cards];
    const removeTitle = titles.filter((_, index) => index !== groupIndex)
    newState.splice(groupIndex, 1);
    setCards(newState);
    setTitles(removeTitle);
    localStorage.setItem('titles', JSON.stringify(removeTitle));
  };

  const addNewItemToGroup = (groupIndex: number, item: ItemType) => {
    const newState = [...cards];
    newState[groupIndex].push(item);
    setCards(newState);
    setInputValue(null);
  };

  const editItemInGroup = (groupIndex: number, item: ItemType) => {
    const newState = [...cards];
    newState[groupIndex] = newState[groupIndex].map((i) =>
      i.id === item.id ? item : i
    );
    setCards(newState);
    setInputValue(null);
  };

  const deleteItemFromGroup = (groupIndex: number, itemIndex: number) => {
    const newState = [...cards];
    newState[groupIndex].splice(itemIndex, 1);
    setCards(newState);
  };

  return (
    <Droppable droppableId={`${groupIndex}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={classNames(
            "relative mx-2 px-2 rounded-xl min-w-[300px] w-[300px] z-10 h-fit bg-opacity-20 transition-opacity",
            snapshot.isDraggingOver ? "bg-blue-300" : "bg-main-gray"
          )}
        >
          <ColumnTitle
            activeTitleIndex={activeTitleIndex}
            index={groupIndex}
            title={titles[groupIndex]}
          />
          {group.map((item, index) => (
            <div key={item.id}>
              {inputValue?.id === item.id ? (
                <Input
                  addNewItemToGroup={editItemInGroup}
                  groupIndex={groupIndex}
                  inputValue={inputValue}
                  title="Edit card"
                  setInputValue={setInputValue}
                />
              ) : (
                <CardItem
                  item={item}
                  index={index}
                  groupIndex={groupIndex}
                  deleteItemFromGroup={deleteItemFromGroup}
                />
              )}
            </div>
          ))}
          <InputForm
            addNewItemToGroup={addNewItemToGroup}
            groupIndex={groupIndex}
            isDraging={snapshot.isDraggingOver}
          />
          <button
            type="button"
            className="rounded-full"
            onClick={() => deleteGroupById(groupIndex)}
          >
            <CloseIcon className="absolute top-2 right-2 w-6 h-6 p-1 stroke-white rounded-full hover:bg-gray-500 transition-opacity" />
          </button>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
