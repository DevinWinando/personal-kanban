import React, { useState, useEffect } from "react";
import CardHeader from "./_CardHeader";
import CardBody from "./_CardBody";
import CardFooter from "./_CardFooter";

function Card(props) {
  const { category, title } = props;

  let [todos, setTodos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("personalKanban"));
    const todos = data.todos;

    setTodos(todos);
  }, []);

  return (
    <div className="card bordered h-4/5 mt-10 w-96 ml-10 static">
      <CardHeader title={title} />
      <div className="px-8 h-full card-body overflow-y-overlay">
        {todos.map((todo) => {
          const { id, title, desc } = todo;

          return <CardBody key={id} id={id} title={title} desc={desc} category={category} todoCategory={todo.category} />;
        })}
      </div>
      {category === "task" ? <CardFooter /> : ""}
    </div>
  );
}

export default Card;
