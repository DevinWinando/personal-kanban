import React from "react";
import CardHeader from "./_CardHeader";
import CardBody from "./_CardBody";
import CardFooter from "./_CardFooter";
import { Droppable } from "react-beautiful-dnd";

function Card(props) {
  const { title, id, todos, category } = props;

  return (
    <div className="card bordered h-4/5 mt-10 w-96 ml-10 static">
      <CardHeader title={title} />
      <Droppable droppableId={id.toString()}>
        {(provided) => {
          return (
            <div className="px-8 p-0 mt-2 h-full card-body overflow-y-overlay" ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map((todos, index) => {
                return <CardBody key={todos.id} id={todos.id} index={index} name={todos.name} desc={todos.desc} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      {category === "task" ? <CardFooter /> : ""}
    </div>
  );
}

export default Card;
