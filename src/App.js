import Card from "./components/Card/Card";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {
    console.log("jalan");
  };

  const card = [
    {
      title: "Task",
      category: "task",
    },
    {
      title: "In Progress",
      category: "progress",
    },
    {
      title: "Done",
      category: "done",
    },
  ];

  return (
    <div className="h-screen flex container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-cards" direction="horizontal" type="card">
          {(provided) => {
            card.map((card, index) => {
              const { title, category } = card;

              return (
                <Card key={index} title={title} category={category} index={index} ref={provided.innerRef} {...provided.droppableProps}>
                  {provided.placeholder}
                </Card>
              );
            });
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
