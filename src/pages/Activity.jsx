/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useReducer } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Card from "../components/Card/Card";
import { useParams } from "react-router-dom";

export const StateContext = React.createContext();

const initialState = {
  id: 1,
  name: "",
  todos: [],
  board: [],
};

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

function Activity() {
  let params = useParams();
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    const activity = JSON.parse(localStorage.getItem(`${params.activityId}`));
    setState(activity);
  }, []);

  useEffect(() => {
    localStorage.setItem(`${params.activityId}`, JSON.stringify(state));
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
    const oldUpdatedBoard = state.board[oldBoardIndex];
    const newUpdatedBoard = state.board[newBoardIndex];
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
                // Mengurutkan ID todos dengan urutan todos Id pada board
                const todos = board.todosId.map((boardTodosId) => state.todos.find((todos) => todos.id === boardTodosId));

                return <Card key={board.id} id={board.id} todos={todos} title={board.title} category={board.category} />;
              })
            : ""}
        </div>
      </StateContext.Provider>
    </DragDropContext>
  );
}

export default Activity;
