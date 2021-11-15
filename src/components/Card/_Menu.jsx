import React, { useRef } from "react";

function Menu(props) {
  const handleShowMenu = () => {
    props.setShowMenu(false);
  };

  const handleDelete = () => {
    const id = parseInt(idRef.current.dataset.id);
    const data = JSON.parse(localStorage.getItem("personalKanban"));
    const newTodos = data.todos.filter((data) => data.id !== id);
    data.todos = newTodos;

    localStorage.setItem("personalKanban", JSON.stringify(data));
  };

  const idRef = useRef(null);

  return (
    <div className="py-4 artboard artboard-demo bg-base-200 absolute z-10 w-56 right-0 menuComponent">
      <ul className="menu p-4 shadow-lg bg-base-100 rounded-box">
        <li className="menu-title">
          <span>Menu Title</span>
        </li>
        <li>
          <a href="#">Edit Activity</a>
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
