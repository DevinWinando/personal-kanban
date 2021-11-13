import React, { useState, useEffect } from "react";
import Input from "./Input";

function Card(props) {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("personalKanban"));
    const todos = data;

    setTodos(todos);
    console.log(todos);
  }, []);

  return (
    <div className="card bordered h-4/5 mt-10 w-96 ml-10">
      <div className="card-body">
        <h1 className="card-title">{props.title}</h1>
        <hr className="mb-4" />
        {/* {todos.map((todo) => {
          return (
            <div className="collapse border rounded-md border-base-300 collapse-arrow" key={todo.title}>
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">{todo.title}</div>
              <div className="collapse-content">
                <p>{todo.description}</p>
              </div>
            </div>
          );
        })} */}

        <Input />
      </div>
    </div>
  );
}

export default Card;
