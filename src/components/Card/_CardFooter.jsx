import React, { useState, useContext } from "react";
import { StateContext } from "../../pages/Activity";
import { getId } from "../../function";
import Form from "../Form/Form";

function _CardFooter() {
  let [showFormAdd, setShowFormAdd] = useState(false);

  const stateContext = useContext(StateContext);

  const [todos, setTodos] = useState({
    id: 1,
    name: "",
    desc: "",
  });

  const handleShowFormAdd = () => {
    setShowFormAdd(!showFormAdd);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    todos[name] = value;

    setTodos(todos);
  };

  const add = (e) => {
    e.preventDefault();
    const newState = stateContext.state;
    const boardTodosId = newState.board[0].todosId;
    const prevId = newState.todos.map((todos) => todos.id);
    const id = getId(prevId);

    boardTodosId.unshift(id);
    todos.id = id;
    newState.todos.push(todos);

    stateContext.setState(newState);
    setShowFormAdd(false);
  };

  return (
    <div className="card-footer px-8 py-4">
      <hr />
      {showFormAdd === true ? (
        <Form onSubmit={add} handleChange={handleChange} cancel={handleShowFormAdd} />
      ) : (
        <div className="border-2 border-gray-400 rounded-xl mt-3 p-4 cursor-pointer" onClick={handleShowFormAdd}>
          <p className="font-black">+ Add Item</p>
        </div>
      )}
    </div>
  );
}

export default _CardFooter;
