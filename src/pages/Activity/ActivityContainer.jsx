/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ActivityView from "./ActivityView";

import { getId } from "../../helpers/function";

function ActivityContainer() {
  let params = useParams();
  const [state, setState] = useState({
    id: 1,
    name: "",
    todos: [],
    board: [],
  });

  const [addState, setAddState] = useState({
    id: 1,
    name: "",
    desc: "",
  });

  const [updateState, setUpdateState] = useState({
    id: 1,
    name: "",
    desc: "",
  });

  useEffect(() => {
    const activity = JSON.parse(localStorage.getItem(`${params.activityId}`));
    setState(activity);
  }, [params.activityId]);

  useEffect(() => {
    localStorage.setItem(`${params.activityId}`, JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newState = { ...state };
    const boardTodosId = newState.board[0].todosId;
    const prevId = newState.todos.map((todos) => todos.id);
    const id = getId(prevId);

    boardTodosId.unshift(id);
    addState.id = id;
    newState.todos.push(addState);

    setState(newState);
    setAddState({});
  };

  const handleDelete = (id) => {
    const newState = { ...state };
    const newTodos = newState.todos.filter((data) => data.id !== id);
    const boardIndex = newState.board.findIndex((board) => board.todosId.includes(id));
    const newBoard = newState.board[boardIndex].todosId.filter((data) => data !== id);

    newState.todos = newTodos;
    newState.board[boardIndex].todosId = newBoard;

    setState(newState);
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    const newState = { ...state };
    const todosData = newState.todos;
    const index = todosData.findIndex((todo) => todo.id === id);
    newState.todos[index] = updateState;

    console.log(newState.todos[index]);
    console.log(id);
    console.log(index);
    console.log(newState);
    console.log(updateState);

    // setState(newState);
  };

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
    <ActivityView
      onDragEnd={onDragEnd}
      handleAdd={handleAdd}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      state={state}
      setState={setState}
      addState={addState}
      setAddState={setAddState}
      updateState={updateState}
      setUpdateState={setUpdateState}
    />
  );
}

export default ActivityContainer;
