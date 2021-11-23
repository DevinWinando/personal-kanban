import React, { useState } from "react";

function _FormEdit(props) {
  const { setShowFormEdit, id, name, desc } = props;
  let [todos, setTodos] = useState({
    id: id,
    name: name,
    desc: desc,
    category: "task",
  });

  const edit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("personalKanban"));
    const todosData = data.todos;
    const index = todosData.findIndex((todo) => todo.id === id);
    data.todos[index] = todos;

    localStorage.setItem("personalKanban", JSON.stringify(data));
    handleShowFormEdit();
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    todos[name] = value;

    setTodos(todos);
  };

  const handleShowFormEdit = () => setShowFormEdit(false);

  return (
    <form action="" onSubmit={edit}>
      <div className="form-control mt-3">
        <div className="border-2 border-gray-400 rounded-xl">
          <input type="hidden" name="id" value={id} />
          <input type="text" placeholder="name" name="name" className="input rounded-b-none focus:ring-0 w-full" onChange={handleChange} defaultValue={todos.name} required />
          <textarea className="textarea h-28 max-h-64 focus:ring-0 rounded-t-none w-full" placeholder="Description" name="desc" onChange={handleChange} defaultValue={todos.desc} required></textarea>
        </div>
        <div className="d-flex">
          <button className="btn btn-active w-1/4 mt-3 mr-3" aria-pressed="true" type="submit">
            Save
          </button>
          <button className="btn btn-active btn-secondary w-1/4 mt-3" aria-pressed="true" onClick={handleShowFormEdit}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default _FormEdit;
