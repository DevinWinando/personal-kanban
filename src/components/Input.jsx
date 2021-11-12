import React, { useState } from "react";

function Input() {
  let [todos, setTodos] = useState({
    title: "",
    description: "",
  });

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    todos[name] = value;
    setTodos(todos);
  };

  let save = (e) => {
    e.preventDefault();
    localStorage.setItem("personalKanban", JSON.stringify(todos));
  };

  return (
    <form action="" onSubmit={save}>
      <div className="form-control mt-5">
        <div className="border-2 border-gray-900 rounded-md">
          <input type="text" placeholder="title" className="input rounded-b-none focus:ring-0 w-full" onChange={handleChange} name="title" />
          <textarea className="textarea h-28 max-h-64 focus:ring-0 rounded-t-none w-full" placeholder="Description" name="description" onChange={handleChange}></textarea>
        </div>
        <div className="d-flex">
          <button className="btn btn-active w-1/4 mt-3 mr-3" aria-pressed="true" type="submit">
            Save
          </button>
          <button className="btn btn-active btn-secondary w-1/4 mt-3" aria-pressed="true">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default Input;
