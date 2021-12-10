/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useEffect, useContext } from "react";
import { StateContext } from "../../pages/Activity";

function Menu(props) {
  const { id, setShowMenu, setShowFormEdit } = props;
  const idRef = useRef(null);
  const menuRef = useRef(null);
  const stateContext = useContext(StateContext);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleShowMenu();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  });

  const handleDelete = () => {
    const newState = { ...stateContext.state };
    const newTodos = newState.todos.filter((data) => data.id !== id);
    const boardIndex = newState.board.findIndex((board) => board.todosId.includes(id));
    const newBoard = newState.board[boardIndex].todosId.filter((data) => data !== id);

    newState.todos = newTodos;
    newState.board[boardIndex].todosId = newBoard;

    stateContext.setState(newState);
    handleShowMenu();
  };

  // const move = () => {
  //   const data = state.activity;
  //   const index = data.todos.findIndex((todo) => todo.id === id);
  //   data.todos[index].category = "progress";

  //   localStorage.setItem("personalKanban", JSON.stringify(data));
  // };

  const handleShowMenu = () => setShowMenu(false);
  const handleShowFormEdit = () => {
    setShowFormEdit(true);
    setShowMenu(false);
  };

  return (
    <div className="py-4 artboard artboard-demo bg-base-200 w-56" ref={menuRef}>
      <ul className="menu p-4 shadow-lg bg-base-100 rounded-box">
        <li className="menu-title">
          <span>Menu Title</span>
        </li>
        <li>
          <a href="#" onClick={handleShowFormEdit}>
            Edit Activity
          </a>
        </li>
        <li>
          <a href="#">Move to Progress</a>
        </li>
        <li>
          <a href="#" onClick={handleDelete} data-id={props.id} ref={idRef}>
            Delete Task
          </a>
        </li>
        <li>
          <a onClick={handleShowMenu} href="#">
            Cancel
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
