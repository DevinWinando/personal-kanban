import React, { useRef, useEffect } from "react";

function Menu(props) {
  const { setShowMenu } = props;
  const idRef = useRef(null);
  const menuRef = useRef(null);

  const handleShowMenu = () => {
    setShowMenu(false);
  };

  const handleDelete = () => {
    const id = parseInt(idRef.current.dataset.id);
    const data = JSON.parse(localStorage.getItem("personalKanban"));
    const newTodos = data.todos.filter((data) => data.id !== id);
    data.todos = newTodos;

    localStorage.setItem("personalKanban", JSON.stringify(data));
  };

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

  const handleShowFormEdit = () => {};

  return (
    <div className="py-4 artboard artboard-demo bg-base-200 absolute z-10 w-56 ml-20 -mt-10" ref={menuRef}>
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