import Card from "./components/Card/Card";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {
    console.log("jalan");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} type="card">
      <div className="h-screen flex container">
        <Card title="Task" category="task" />
        <Card title="In Progress" category="progress" />
        <Card title="Done" category="done" />
      </div>
    </DragDropContext>
  );
}

export default App;
