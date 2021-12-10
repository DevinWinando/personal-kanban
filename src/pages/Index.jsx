/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { usePopper } from "react-popper";
import Data from "../Data";
import { Link } from "react-router-dom";
import { getId } from "../function";

function Index() {
  const data = Data();
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [buttonRef, setButtonRef] = useState();
  const [menuRef, setMenuRef] = useState();
  const { styles, attributes } = usePopper(buttonRef, menuRef, {
    placement: "right",
  });

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
      <div className="grid grid-cols-5 gap-4">
        {data.map((data) => (
          <div key={data.id} className="card static shadow-2xl lg:card-side bg-dark text-primary-content border-gray-400 border-2 mt-4">
            <div className="card-body">
              <div className="card-title flex justify-between">
                <Link style={{ display: "block", margin: "1rem 0" }} to={`/activities/${data.id}`}>
                  <h1>{data.name}</h1>
                </Link>
                <button onClick={() => setShowMenu(!showMenu)} ref={setButtonRef} className="px-4">
                  :
                </button>
              </div>
            </div>
            {showMenu ? (
              <div className="py-4 artboard artboard-demo absolute z-10 bg-base-200 w-56" ref={setMenuRef} style={styles.popper} {...attributes.popper}>
                <ul className="menu p-4 shadow-lg bg-base-100 rounded-box">
                  <li className="menu-title">
                    <span>Menu Title</span>
                  </li>
                  <li>
                    <a href="#">Edit Activity</a>
                  </li>
                  <li>
                    <a href="#">Move to Progress</a>
                  </li>
                  <li>
                    <a href="#">Delete Task</a>
                  </li>
                  <li>
                    <a href="#">Cancel</a>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
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
