import React, { useState } from "react";

function FormAdd(props) {
  let [todos, setTodos] = useState({
    title: "",
    desc: "",
    category: "progress",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    todos[name] = value;

    setTodos(todos);
  };

  const save = (e) => {
    e.preventDefault();
    const personalKanban = {
      name: "projectOne",
      id: 1,
      todos: [todos],
    };

    localStorage.setItem("personalKanban", JSON.stringify(personalKanban));
    props.setShowFormAdd(false);
  };

  const handleShowFormAdd = () => {
    props.setShowFormAdd(false);
  };

  return (
    <form action="" onSubmit={save}>
      <div className="form-control mt-3">
        <div className="border-2 border-gray-900 rounded-md">
          <input type="text" placeholder="title" className="input rounded-b-none focus:ring-0 w-full" onChange={handleChange} name="title" />
          <textarea className="textarea h-28 max-h-64 focus:ring-0 rounded-t-none w-full" placeholder="Description" name="desc" onChange={handleChange}></textarea>
        </div>
        <div className="d-flex">
          <button className="btn btn-active w-1/4 mt-3 mr-3" aria-pressed="true" type="submit">
            Save
          </button>
          <button className="btn btn-active btn-secondary w-1/4 mt-3" aria-pressed="true" onClick={handleShowFormAdd}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormAdd;
