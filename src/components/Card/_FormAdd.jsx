import React, { useState, useContext } from "react";
import { StateContext } from "../../App";

function FormAdd(props) {
  const { setShowFormAdd } = props;
  const stateContext = useContext(StateContext);

  let [todos, setTodos] = useState({
    id: "",
    name: "",
    desc: "",
  });

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
    const id = prevId.reduce((a, b) => Math.max(a, b)) + 1;

    boardTodosId.unshift(id);
    todos.id = id;
    newState.todos.push(todos);

    // console.log(newState);

    stateContext.setState(newState);
    setShowFormAdd(false);
    // console.log(stateContext.state);
    // console.log(todos);
  };

  const handleShowFormAdd = () => {
    setShowFormAdd(false);
  };

  return (
    <form action="" onSubmit={add}>
      <div className="form-control mt-3">
        <div className="border-2 border-gray-400 rounded-xl">
          <input type="text" placeholder="title" className="input rounded-b-none focus:ring-0 w-full" onChange={handleChange} name="title" required />
          <textarea className="textarea h-28 max-h-64 focus:ring-0 rounded-t-none w-full" placeholder="Description" name="desc" onChange={handleChange} required></textarea>
        </div>
        <div className="d-flex">
          <button className="btn btn-active w-1/4 mt-3 mr-3" aria-pressed="true" type="submit">
            Save
          </button>
          <button className="btn btn-active btn-secondary w-1/4 mt-3" aria-pressed="true" onClick={handleShowFormAdd}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormAdd;
