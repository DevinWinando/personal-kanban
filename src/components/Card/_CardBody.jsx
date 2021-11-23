import React, { useState } from "react";
import Menu from "./_Menu";
import MiniCard from "./_MiniCard";
import FormEdit from "./_FormEdit";
import { Draggable } from "react-beautiful-dnd";

function _cardBody(props) {
  const { id, index, name, desc, todoCategory } = props;
  let [showMenu, setShowMenu] = useState(false);
  let [showFormEdit, setShowFormEdit] = useState(false);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => {
        return (
          <div className="wrapper" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
            {showMenu === true ? <Menu setShowMenu={setShowMenu} setShowFormEdit={setShowFormEdit} id={id} /> : ""}

            {(() => {
              if (showFormEdit === true) {
                return <FormEdit id={id} name={name} desc={desc} todoCategory={todoCategory} setShowMenu={setShowMenu} setShowFormEdit={setShowFormEdit} />;
              } else {
                return <MiniCard id={id} name={name} desc={desc} setShowMenu={setShowMenu} />;
              }
            })()}
          </div>
        );
      }}
    </Draggable>
  );
}

export default _cardBody;
