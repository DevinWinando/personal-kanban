import React, { useState, useEffect } from "react";
import FormAdd from "./FormAdd";

function Card(props) {
  let [showFormAdd, setShowFormAdd] = useState(false);
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("personalKanban"));
    const todos = data.todos;

    setTodos(todos);
    console.log(todos);
  }, []);

  const handleShowFormAdd = () => {
    setShowFormAdd(true);
  };

  return (
    <div className="card bordered h-4/5 mt-10 w-96 ml-10">
      <div className="card-body">
        <h1 className="card-title">{props.title}</h1>
        <hr className="mb-1" />
        {todos.map((todo) => {
          if (props.category === todo.category)
            return (
              <div className="collapse border rounded-md border-base-300 collapse-arrow mt-3" key={todo.title}>
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">{todo.title}</div>
                <div className="collapse-content">
                  <p>{todo.desc}</p>
                </div>
              </div>
            );

          return false;
        })}

        {props.category === "task" ? (
          showFormAdd === true ? (
            ""
          ) : (
            <div className="border-2 border-gray-900 rounded-md mt-3 p-4" onClick={handleShowFormAdd}>
              <p className="font-black">+ Add Item</p>
            </div>
          )
        ) : (
          false
        )}

        {showFormAdd === true ? <FormAdd setShowFormAdd={setShowFormAdd} /> : false}
      </div>
    </div>
  );
}

export default Card;
