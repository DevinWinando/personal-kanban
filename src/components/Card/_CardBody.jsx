import React, { useState } from "react";
import MiniCard from "./_MiniCard";
import FormEdit from "./_FormEdit";
import { Draggable } from "react-beautiful-dnd";

function _cardBody(props) {
  const { id, index, name, desc, todoCategory } = props;
  const [showFormEdit, setShowFormEdit] = useState(false);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => {
        return (
          <div className="cards-body" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
            {(() => {
              if (showFormEdit === true) {
                return <FormEdit id={id} name={name} desc={desc} todoCategory={todoCategory} setShowFormEdit={setShowFormEdit} />;
              } else {
                return <MiniCard id={id} name={name} desc={desc} setShowFormEdit={setShowFormEdit} />;
              }
            })()}
          </div>
        );
      }}
    </Draggable>
  );
}

export default _cardBody;
