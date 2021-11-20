import React, { useState } from "react";
import Menu from "./_Menu";
import MiniCard from "./_MiniCard";
import FormEdit from "./_FormEdit";
import { Draggable } from "react-beautiful-dnd";

function _cardBody(props) {
  const { id, index, title, desc, category, todoCategory } = props;
  let [showMenu, setShowMenu] = useState(false);
  let [showFormEdit, setShowFormEdit] = useState(false);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => {
        return (
          <div className="wrapper" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {showMenu === true ? <Menu setShowMenu={setShowMenu} setShowFormEdit={setShowFormEdit} id={id} /> : ""}

            {(() => {
              if (category === todoCategory && showFormEdit === true) {
                return <FormEdit id={id} title={title} desc={desc} todoCategory={todoCategory} setShowMenu={setShowMenu} setShowFormEdit={setShowFormEdit} />;
              } else if (category === todoCategory) {
                return <MiniCard id={id} title={title} desc={desc} setShowMenu={setShowMenu} />;
              }
              return "";
            })()}
          </div>
        );
      }}
    </Draggable>
  );
}

export default _cardBody;
