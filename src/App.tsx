import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Card } from "./components";
import { useStore } from "./features/store";
import { move, reorder } from "./features/helpers";
import { PlusIcon } from "./icons/icon";

function App() {
  const cards = useStore((state) => state.cards);
  const setCards = useStore((state) => state.setCards);
  const setActiveTitleIndex = useStore((state) => state.setActiveTitleIndex);

  useEffect(() => {
    const savedState = localStorage.getItem('itemGroups');
    setCards(savedState ? JSON.parse(savedState) : Array.from({ length: 3 }, () => []));
  }, [setCards]);

  useEffect(() => {
    localStorage.setItem('itemGroups', JSON.stringify(cards));
  }, [cards]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    // Dropped outside the list
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

  const addNewGroup = () => {
    setCards([...cards, []]);
    setActiveTitleIndex(cards.length);
  };

  return (
    <div className="relative flex bg-slate-100 overflow-auto min-w-sreen h-screen py-10 px-4 bg-[url('/images/background.webp')] bg-cover bg-center">
      <DragDropContext onDragEnd={onDragEnd}>
        {cards.map((group, groupIndex) => (
          <Card
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
          />
        ))}
      </DragDropContext>
      <button
        type="button"
        className="group min-w-[300px] flex gap-2 items-center mx-2 justify-center h-fit rounded-xl py-3 px-4 z-10 bg-main-gray text-slate-300 bg-opacity-10 hover:bg-opacity-20 hover:text-white transition-colors"
        onClick={addNewGroup}
      >
        <PlusIcon className="h-6 w-6 fill-slate-300 group-hover:fill-white" />
        Add another column
      </button>
    </div>
  );
}

export default App;
