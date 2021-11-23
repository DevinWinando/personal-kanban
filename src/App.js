import Card from "./components/Card/Card";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useReducer, useEffect } from "react";

export const ActivityContext = React.createContext();

const initialState = {
  activity: {
    id: 1,
    name: "Learn React",
    todos: [
      {
        id: 1,
        name: "Learn Javascript",
        desc: "Learn basic about Javascript",
      },
      {
        id: 2,
        name: "Learn Basic ReactJS",
        desc: "Learn basic about reactJS",
      },
      {
        id: 3,
        name: "Make Something",
        desc: "Make a beautiful project to train my basic ReactJS",
      },
    ],
  },
  board: [
    {
      id: 1,
      title: "Task",
      category: "task",
      todosId: [1, 2, 3],
    },
    {
      id: 2,
      title: "In Progress",
      category: "progress",
      todosId: [],
    },
    {
      id: 3,
      title: "Done",
      category: "done",
      todosId: [],
    },
  ],
};

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

function App() {
  const [state, setState] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   const activity = JSON.parse(localStorage.getItem("personalKanban"));
  //   console.log(activity);
  //   setActivity(activity);
  // }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // eslint-disable-next-line eqeqeq
    const oldBoardIndex = state.board.findIndex((board) => board.id == source.droppableId);
    const newBoardIndex = state.board.findIndex((board) => board.id == destination.droppableId);
    const board = state.board;
    const oldUpdatedBoard = board[oldBoardIndex];
    const newUpdatedBoard = board[newBoardIndex];
    const newTodosIds = newUpdatedBoard.todosId;
    oldUpdatedBoard.todosId.splice(source.index, 1);
    newTodosIds.splice(destination.index, 0, +draggableId);

    const newBoard = state.board.map((board, index) => {
      if (index === newBoardIndex) {
        board.todosId = newTodosIds;
      }
      return board;
    });

    const newState = {
      ...state,
      board: newBoard,
    };

    setState(newState);
    // console.log(board);
    // console.log(newBoard);
    // console.log(newState);
    // console.log(result);
    // console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} type="card">
      <ActivityContext.Provider value={{ State: state, Dispatch: setState }}>
        <div className="h-screen flex container">
          {state.board.length !== 0
            ? state.board.map((board) => {
                const todos = board.todosId.map((i) => state.activity.todos.find((j) => j.id === i));

                state.activity.todos.sort(function (a, b) {
                  return board.todosId.indexOf(a.id) - board.todosId.indexOf(b.id);
                });

                return <Card key={board.id} id={board.id} todos={todos} title={board.title} category={board.category} />;
              })
            : ""}
        </div>
      </ActivityContext.Provider>
    </DragDropContext>
  );
}

export default App;
