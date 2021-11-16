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
    <div className="card bordered h-4/5 mt-10 w-96 ml-10 static">
      <div className="card-header px-8 pt-8">
        <h1 className="card-title">{props.title}</h1>
        <hr />
      </div>

      <div className="px-8 mt-3 h-full overflow-y-overlay">
        {todos.map((todo) => {
          if (props.category === todo.category) return <MiniCard key={todo.id} id={todo.id} activity={todo.title} desc={todo.desc} />;
          return "";
        })}
      </div>

      {props.category === "task" && showFormAdd === true ? (
        <div className="card-footer px-8 py-4">
          <hr />
          <FormAdd setShowFormAdd={setShowFormAdd} />
        </div>
      ) : props.category === "task" ? (
        <div className="card-footer px-8 py-4">
          <hr />
          <div className="border-2 border-gray-400 rounded-xl mt-3 p-4 cursor-pointer" onClick={handleShowFormAdd}>
            <p className="font-black">+ Add Item</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Card;
