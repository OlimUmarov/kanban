// components/Card.tsx
import { Droppable } from 'react-beautiful-dnd';
import { CardItem, ColumnTitle } from './index';
import { useStore } from '../features/store';
import { ItemType } from '../features/types';
import classNames from 'classnames';
import { CloseIcon } from '../icons/icon';
import { useTitlesStorage } from '../features/hooks';
import {
  deleteGroupById,
  addNewItemToGroup,
  editItemInGroup,
  deleteItemFromGroup,
} from '../features/helpers/cardHelpers';
import { Input, InputForm } from './Inputs';

type CardPropsType = {
  groupIndex: number;
  group: ItemType[];
};

export const Card = ({ groupIndex, group }: CardPropsType) => {
  const cards = useStore((state) => state.cards)
  const inputValue = useStore((state) => state.inputValue);
  const titles = useStore((state) => state.titles)
  const activeTitleIndex = useStore((state) => state.activeTitleIndex);
  const setCards = useStore((state) => state.setCards)
  const setInputValue = useStore((state) => state.setInputValue)
  const setTitles = useStore((state) => state.setTitles)

  useTitlesStorage(setTitles);

  return (
    <Droppable droppableId={`${groupIndex}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={classNames(
            'relative mx-2 px-2 rounded-xl min-w-[300px] w-[300px] z-10 h-fit bg-opacity-20 transition-opacity',
            snapshot.isDraggingOver ? 'bg-blue-300' : 'bg-main-gray'
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
                  addNewItemToGroup={(_, newItem) =>
                    editItemInGroup(groupIndex, newItem, cards, setCards, setInputValue)
                  }
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
                  deleteItemFromGroup={(_, itemIndex) =>
                    deleteItemFromGroup(groupIndex, itemIndex, cards, setCards)
                  }
                />
              )}
            </div>
          ))}
          <InputForm
            addNewItemToGroup={(groupIndex, item) =>
              addNewItemToGroup(groupIndex, item, cards, setCards, setInputValue)
            }
            groupIndex={groupIndex}
            isDraging={snapshot.isDraggingOver}
          />
          <button
            type="button"
            className="rounded-full"
            onClick={() =>
              deleteGroupById(groupIndex, cards, titles, setCards, setTitles)
            }
          >
            <CloseIcon className="absolute top-2 right-2 w-6 h-6 p-1 stroke-white rounded-full hover:bg-gray-500 transition-opacity" />
          </button>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
