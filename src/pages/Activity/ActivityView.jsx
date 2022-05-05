/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Board from "./parts/Board";
import BoardBody from "./parts/BoardBody";

function ActivityView(props) {
  const { onDragEnd, state, setState, handleAdd, handleUpdate, handleDelete } = props;

  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="navbar bg-gray-600">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
        <div className="dropdown block lg:hidden">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex">
        {showSidebar ? (
          <div className="w-1/6 h-screen bg-gray-600 relative">
            <div className="rounded-full w-12 h-12 bg-gray-800 absolute -right-6 top-1" onClick={handleSidebar}></div>
            <ul class="menu w-full bg-gray-600">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="w-3 h-screen bg-gray-600" onClick={handleSidebar}></div>
        )}

        <DragDropContext onDragEnd={onDragEnd} type="card">
          <Droppable droppableId="boards" direction="horizontal" type="boards">
            {(provided) => {
              const board = state.boardOrder.map((boardOrder) => state.board.find((board) => board.id === boardOrder));
              console.log(board);
              return (
                <div className="flex" ref={provided.innerRef} {...provided.droppableProps}>
                  {board.map((board, index) => {
                    const todos = board.todosId.map((boardTodosId) => state.todos.find((todos) => todos.id === boardTodosId));
                    return (
                      <Board index={index} board={board} handleAdd={handleAdd} state={state} key={board.id}>
                        {todos.map((todo, index) => (
                          <BoardBody key={todo.id} id={todo.id} index={index} name={todo.name} desc={todo.desc} state={state} setState={setState} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                        ))}
                      </Board>
                    );
                  })}

                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default ActivityView;
