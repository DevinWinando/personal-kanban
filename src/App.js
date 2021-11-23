/* eslint-disable eqeqeq */
import Card from "./components/Card/Card";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useReducer, useEffect } from "react";

export const StateContext = React.createContext();

const initialState = {
  activity: {
    todos: [],
  },
  board: [],
};

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

function App() {
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    const activity = JSON.parse(localStorage.getItem("personalKanban"));
    setState(activity);
  }, []);

  useEffect(() => {
    localStorage.setItem("personalKanban", JSON.stringify(state));
  }, [state]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} type="card">
      <StateContext.Provider value={{ state: state, setState: setState }}>
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
      </StateContext.Provider>
    </DragDropContext>
  );
}

export default App;
