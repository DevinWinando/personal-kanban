import React, { useState, useEffect } from "react";
import CardHeader from "./_CardHeader";
import CardBody from "./_CardBody";
import CardFooter from "./_CardFooter";

function Card(props) {
  const { category, title } = props;
  let [showFormEdit, setShowFormEdit] = useState(false);
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("personalKanban"));
    const todos = data.todos;

    setTodos(todos);
    console.log(todos);
  }, []);

  return (
    <div className="card bordered h-4/5 mt-10 w-96 ml-10 static">
      <CardHeader title={title} />
      <CardBody todos={todos} category={category} showFormEdit={showFormEdit} setShowFormEdit={setShowFormEdit} />
      {category === "task" ? <CardFooter /> : ""}
    </div>
  );
}

export default Card;
