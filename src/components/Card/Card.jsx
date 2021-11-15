import React, { useState, useEffect } from "react";
import FormAdd from "./_FormAdd";
import MiniCard from "./_MiniCard";

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
    <div className="card bordered h-4/5 mt-10 w-96 ml-10 overflow-y-overlay">
      <div className="card-body">
        <h1 className="card-title">{props.title}</h1>
        <hr className="mb-1" />

        {todos.map((todo) => {
          if (props.category === todo.category) return <MiniCard activity={todo.title} desc={todo.desc} />;
          return false;
        })}

        {props.category === "task" ? (
          showFormAdd === true ? (
            ""
          ) : (
            <div className="border-2 border-gray-900 rounded-md mt-3 p-4 cursor-pointer" onClick={handleShowFormAdd}>
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
