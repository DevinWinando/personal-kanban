import React, { useEffect, useReducer, useState, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { usePopper } from "react-popper";

import Card from "../components/Card";
import Minicard from "../components/Minicard/Minicard";
import Menu from "../components/Menu/Menu";
import MenuList from "../components/Menu/MenuList";
import Form from "../components/Form/Form";
import TextArea from "../components/Form/Textarea";
import Input from "../components/Form/Input";

import { StateContext } from "../../pages/Activity";

import { handleChange, getId } from "../helpers/function";

function Board(props) {
  const stateContext = useContext(StateContext);
  const { state, setState } = stateContext;

  const { board, children } = props;

  const [showFormAdd, setShowFormAdd] = useState(false);
  const [addState, setAddState] = useState({
    id: 1,
    name: "",
    desc: "",
  });

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
    setShowFormAdd(false);
  };

  return (
    <Card key={board.id} title={board.title} category={board.category}>
      {children}
      <div className="card-footer px-8 py-4">
        <hr />
        {showFormAdd === true ? (
          <Form onSubmit={add} cancel={() => setShowFormAdd(false)}>
            <Input onChange={(e) => handleChange(e, addState, setAddState)} placeholder="Name" name="name" />
            <TextArea onChange={(e) => handleChange(e, addState, setAddState)} placeholder="Description" name="desc" />
          </Form>
        ) : (
          <div className="border-2 border-gray-400 rounded-xl mt-3 p-4 cursor-pointer" onClick={() => setShowFormAdd(true)}>
            <p className="font-black">+ Add Item</p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default Board;
