import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Board from "./parts/Board";
import BoardBody from "./parts/BoardBody";

function ActivityView(props) {
  const { onDragEnd, state, setState, addState, setAddState, updateState, setUpdateState, handleAdd, handleUpdate, handleDelete } = props;
  return (
    <DragDropContext onDragEnd={onDragEnd} type="card">
      <div className="h-screen flex container">
        {state.board.map((board) => {
          const todos = board.todosId.map((boardTodosId) => state.todos.find((todos) => todos.id === boardTodosId));
          // console.log(todos);
          return (
            <Board board={board} key={board.id} handleAdd={handleAdd} addState={addState} setAddState={setAddState} state={state}>
              <Droppable droppableId={board.id.toString()}>
                {(provided) => {
                  return (
                    <div className="px-8 p-0 my-2 h-full card-body overflow-y-overlay" ref={provided.innerRef} {...provided.droppableProps}>
                      {todos.map((todo, index) => (
                        <BoardBody
                          key={todo.id}
                          id={todo.id}
                          index={index}
                          name={todo.name}
                          desc={todo.desc}
                          state={state}
                          setState={setState}
                          updateState={updateState}
                          setUpdateState={setUpdateState}
                          handleDelete={handleDelete}
                          handleUpdate={handleUpdate}
                        />
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

export default ActivityView;
