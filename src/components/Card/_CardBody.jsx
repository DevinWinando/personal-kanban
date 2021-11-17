import React from "react";
import MiniCard from "./_MiniCard";
import FormEdit from "./_FormEdit";

function _cardBody(props) {
  const { todos, category, showFormEdit, setShowFormEdit } = props;

  return (
    <div className="px-8 mt-3 h-full card-body overflow-y-overlay">
      {todos.map((todo) => {
        if (category === todo.category && showFormEdit !== true) {
          return <MiniCard key={todo.id} id={todo.id} activity={todo.title} desc={todo.desc} setShowFormEdit={setShowFormEdit} />;
        } else if (category === todo.category && showFormEdit === true) {
          return <FormEdit />;
        }
        return "";
      })}
    </div>
  );
}

export default _cardBody;
