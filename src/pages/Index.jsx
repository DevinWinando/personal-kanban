import React, { useState } from "react";
import { Link } from "react-router-dom";
import Data from "../Data";
import { getId } from "../function";

function Index() {
  const data = Data();
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [activity, setActivity] = useState({
    id: 1,
    name: "",
    todos: [],
    board: [
      {
        id: 1,
        title: "Task",
        category: "task",
        todosId: [],
      },
      {
        id: 2,
        title: "In Progress",
        category: "progress",
        todosId: [],
      },
      {
        id: 3,
        title: "Done",
        category: "done",
        todosId: [],
      },
    ],
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    activity[name] = value;

    setActivity(activity);
  };

  const add = (e) => {
    e.preventDefault();
    const dataLocalStorage = data;
    const prevId = dataLocalStorage.map((data) => data.id);
    const id = getId(prevId);
    activity.id = id;

    localStorage.setItem(`${id}`, JSON.stringify(activity));
    setShowFormAdd(false);
  };

  const handleShowFormAdd = () => {
    setShowFormAdd(!showFormAdd);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1>HOME</h1>
      {data.map((data) => (
        <Link style={{ display: "block", margin: "1rem 0" }} to={`/activities/${data.id}`} key={data.id}>
          <div className="card shadow-2xl lg:card-side bg-dark text-primary-content border-gray-400 border-2 mt-4">
            <div className="card-body">
              <div className="card-title flex justify-between">
                <h1>{data.name}</h1>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {showFormAdd === true ? (
        <form action="" onSubmit={add}>
          <div className="form-control mt-40">
            <div className="border-2 border-gray-400 rounded-xl">
              <input type="text" autoComplete="off" placeholder="What are you going to do?" className="input rounded-b-none focus:ring-0 w-full" onChange={handleChange} name="name" required />
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
      ) : (
        <div className="border-2 border-gray-400 rounded-xl mt-3 p-4 cursor-pointer" onClick={handleShowFormAdd}>
          <p className="font-black">+ Add Item</p>
        </div>
      )}
    </div>
  );
}

export default Index;
