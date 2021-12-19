/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import { StateContext } from "../../pages/Activity";
import { usePopper } from "react-popper";
import Menu from "../Menu/Menu";
import MenuList from "../Menu/MenuList";

function MiniCard(props) {
  const { desc, name, setShowFormEdit, id } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [buttonRef, setButtonRef] = useState();
  const [menuRef, setMenuRef] = useState();
  const { styles, attributes } = usePopper(buttonRef, menuRef, {
    placement: "auto",
  });

  const stateContext = useContext(StateContext);

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

  const handleShowMenu = () => setShowMenu(false);

  const handleShowFormEdit = () => {
    setShowFormEdit(true);
    setShowMenu(false);
  };

  return (
    <>
      <div className="card shadow-2xl lg:card-side bg-dark text-primary-content border-gray-400 border-2 mt-4">
        <div className="card-body">
          <div className="card-title flex justify-between">
            <h1>{name}</h1>
            <button onClick={() => setShowMenu(!showMenu)} ref={setButtonRef} className="px-4">
              :
            </button>
          </div>
          <p>{desc}</p>
        </div>
      </div>
      {showMenu ? (
        <div className="w-screen h-screen absolute top-0 left-0 z-10">
          <div ref={setMenuRef} style={styles.popper} {...attributes.popper}>
            <Menu setShowMenu={setShowMenu}>
              <MenuList content="Edit Task" onClick={handleShowFormEdit}></MenuList>
              <MenuList content="Move to"></MenuList>
              <MenuList content="Delete Task" onClick={handleDelete}></MenuList>
              <MenuList content="Cancel" onClick={handleShowMenu}></MenuList>
            </Menu>
          </div>
        </div>
      ) : (
        ""
      )}
      {console.log(styles, attributes)}
    </>
  );
}

export default MiniCard;
