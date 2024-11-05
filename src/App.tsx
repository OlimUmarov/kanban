import { DragDropContext } from "react-beautiful-dnd";
import { Card } from "./components";
import { useStore } from "./features/store";
import { onDragEnd } from "./features/helpers/dragAndDropHelpers";
import { useLocalStorage } from "./features/hooks";
import { AddColumnButton } from "./components/Buttons";

const App = () => {
  const cards = useStore((state) => state.cards)
  const titles = useStore((state) => state.titles)
  const setCards = useStore((state) => state.setCards)
  const setTitles = useStore((state) => state.setTitles)
  const setActiveTitleIndex = useStore((state) => state.setActiveTitleIndex)

  useLocalStorage({ cards, titles, setCards, setTitles });

  const addNewGroup = () => {
    setCards([...cards, []]);
    setActiveTitleIndex(cards.length);
  };

  return (
    <div className="relative flex bg-slate-100 overflow-auto min-w-sreen h-screen py-10 px-4 bg-[url('/images/background.webp')] bg-cover bg-center">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, cards, setCards)}>
        {cards.map((group, groupIndex) => (
          <Card key={groupIndex} group={group} groupIndex={groupIndex} />
        ))}
      </DragDropContext>
      <AddColumnButton addNewGroup={addNewGroup} />
    </div>
  );
};

export default App;
