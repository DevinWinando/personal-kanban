import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Card from "../../../components/Card";
import Form from "../../../components/Form/Form";
import TextArea from "../../../components/Form/Textarea";
import Input from "../../../components/Form/Input";

import { handleChange } from "../../../helpers/function";

function Board(props) {
  const { board, index, children, handleAdd } = props;
  const [addState, setAddState] = useState({
    id: 1,
    name: "",
    desc: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    handleAdd(board.id, addState);
    setAddState({});
    setShowFormAdd(false);
  };

  const onChange = (e) => {
    handleChange(e, addState, setAddState);
  };

  const [showFormAdd, setShowFormAdd] = useState(false);

  return (
    <Draggable draggableId={board.id} index={index}>
      {(provided) => (
        <div className="h-full" ref={provided.innerRef} {...provided.draggableProps}>
          <Card title={board.title} category={board.category}>
            <div className="card-header px-8 pt-8" {...provided.dragHandleProps}>
              <h1 className="card-title">{board.title}</h1>
              <hr />
            </div>
            <Droppable droppableId={board.id.toString()} type="task">
              {(provided) => {
                return (
                  <div className="px-8 p-0 my-2 card-body overflow-y-overlay" ref={provided.innerRef} {...provided.droppableProps}>
                    {children}

                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>

            <div className="card-footer px-8 py-4">
              <hr />
              {showFormAdd === true ? (
                <Form onSubmit={onSubmit} cancel={() => setShowFormAdd(false)}>
                  <Input onChange={onChange} placeholder="Name" name="name" />
                  <TextArea onChange={onChange} placeholder="Description" name="desc" />
                </Form>
              ) : (
                <div className="border-2 border-gray-400 rounded-xl mt-3 p-4 cursor-pointer" onClick={() => setShowFormAdd(true)}>
                  <p className="font-bold">+ Add Item</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default Board;
