/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { usePopper } from "react-popper";

import Minicard from "../../components/Minicard/Minicard";
import Menu from "../../components/Menu/Menu";
import MenuList from "../../components/Menu/MenuList";
import Form from "../../components/Form/Form";
import TextArea from "../../components/Form/Textarea";
import Input from "../../components/Form/Input";

import Board from "./parts/Board";

import { getId } from "../../helpers/function";

function Activity() {
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

  useEffect(() => {
    const activity = JSON.parse(localStorage.getItem(`${params.activityId}`));
    setState(activity);
  }, []);

  useEffect(() => {
    localStorage.setItem(`${params.activityId}`, JSON.stringify(state));
  }, [state]);

  const add = (e) => {
    e.preventDefault();
    const newState = state;
    const boardTodosId = newState.board[0].todosId;
    const prevId = newState.todos.map((todos) => todos.id);
    const id = getId(prevId);

    boardTodosId.unshift(id);
    addState.id = id;
    newState.todos.push(addState);

    setState(newState);
    setAddState({});
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
    <DragDropContext onDragEnd={onDragEnd} type="card">
      <div className="h-screen flex container">
        {state.board.map((board) => {
          const todos = board.todosId.map((boardTodosId) => state.todos.find((todos) => todos.id === boardTodosId));

          return (
            <Board board={board} key={board.id} add={add} addState={addState} setAddState={setAddState} state={state} setState={setState}>
              <Droppable droppableId={board.id.toString()}>
                {(provided) => {
                  return (
                    <div className="px-8 p-0 my-2 h-full card-body overflow-y-overlay" ref={provided.innerRef} {...provided.droppableProps}>
                      {todos.map((todo, index) => (
                        <CardBody key={todo.id} id={todo.id} index={index} name={todo.name} desc={todo.desc} state={state} setState={setState} />
                      ))}

                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </Board>
          );
        })}
      </div>
    </DragDropContext>
  );
}

function CardBody(props) {
  const { id, index, name, desc, state, setState } = props;

  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [updatedState, setUpdatedState] = useState({
    id,
    name,
    desc,
  });

  const [buttonRef, setButtonRef] = useState();
  const [menuRef, setMenuRef] = useState();
  const { styles, attributes } = usePopper(buttonRef, menuRef, {
    placement: "auto",
  });

  const handleDelete = () => {
    const newState = { ...state };
    const newTodos = newState.todos.filter((data) => data.id !== id);
    const boardIndex = newState.board.findIndex((board) => board.todosId.includes(id));
    console.log(boardIndex);
    const newBoard = newState.board[boardIndex].todosId.filter((data) => data !== id);

    newState.todos = newTodos;
    newState.board[boardIndex].todosId = newBoard;

    setState(newState);
    setShowMenu(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const newState = state;
    const todosData = newState.todos;
    const index = todosData.findIndex((todo) => todo.id === id);
    newState.todos[index] = updatedState;

    setState(newState);
    setShowFormEdit(false);
  };

  const handleChangeee = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    updatedState[name] = value;

    setUpdatedState(updatedState);
  };

  const handleShowFormEdit = () => {
    setShowFormEdit(true);
    setShowMenu(false);
  };

  return (
    <div className="cards-body">
      {showFormEdit ? (
        <Form onSubmit={handleUpdate} cancel={() => setShowFormEdit(false)}>
          <Input defaultValue={name} onChange={handleChangeee} name="name" />
          <TextArea defaultValue={desc} onChange={handleChangeee} name="desc" />
        </Form>
      ) : (
        <Draggable draggableId={id.toString()} index={index}>
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                <Minicard title={name}>
                  <button ref={setButtonRef} onClick={() => setShowMenu(!showMenu)} className="px-4 absolute top-0 right-0 mt-4 mr-2">
                    :
                  </button>
                  <p>{desc}</p>
                </Minicard>
              </div>
            );
          }}
        </Draggable>
      )}

      {showMenu ? (
        <div className="z-10" ref={setMenuRef} style={styles.popper} {...attributes.popper}>
          <Menu title="Menu" setShowMenu={setShowMenu}>
            <MenuList content="Edit Activiy" onClick={handleShowFormEdit}></MenuList>
            <MenuList content="Delete Activity" onClick={handleDelete}></MenuList>
            <MenuList content="Cancel" onClick={() => setShowMenu(false)}></MenuList>
          </Menu>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Activity;
