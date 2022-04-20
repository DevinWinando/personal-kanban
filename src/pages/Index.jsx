/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { usePopper } from "react-popper";
import Data from "../Data";
import { Link } from "react-router-dom";
import { getId } from "../helpers/function";
import Minicard from "../components/Minicard/Minicard";
import MinicardHeader from "../components/Minicard/MinicardHeader";
import Menu from "../components/Menu/Menu";
import MenuList from "../components/Menu/MenuList";
import Form from "../components/Form/Form";
import Textarea from "../components/Form/Textarea";

function Index() {
  const localStorageData = Data();
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [allActivity, setAllActivity] = useState(localStorageData);
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
    const newAllActivity = allActivity;
    const prevId = newAllActivity.map((data) => data.id);
    const id = getId(prevId);
    activity.id = id;
    newAllActivity.push(activity);

    setAllActivity(newAllActivity);
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
        {showFormAdd === true ? (
          <Form cancel={handleShowFormAdd} onSubmit={add}>
            <Textarea placeholder="What are you going to do?" name="name" onChange={handleChange} />
          </Form>
        ) : (
          <div className="h-36 flex border-dashed justify-center items-center border-gray-400 border-2 mt-4 card rounded-xl cursor-pointer" onClick={handleShowFormAdd}>
            <h2 className="font-bold text-lg">+ ADD ACTIVITY</h2>
          </div>
        )}
        {allActivity.map((data) => (
          <Minicards key={data.id} data={data} allActivity={allActivity} setAllActivity={setAllActivity} />
        ))}
      </div>
    </div>
  );
}

function Minicards(props) {
  const { data, allActivity, setAllActivity } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [buttonRef, setButtonRef] = useState();
  const [menuRef, setMenuRef] = useState();
  const [activity, setActivity] = useState(data);
  const { styles, attributes } = usePopper(buttonRef, menuRef, {
    placement: "auto",
  });

  const handleShowMenu = () => setShowMenu(!showMenu);

  const handleShowFormEdit = () => {
    setShowFormEdit(true);
    setShowMenu(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const newActivity = activity;
    const index = allActivity.findIndex((allActivity) => allActivity.id === activity.id);
    allActivity[index] = newActivity;

    localStorage.setItem(`${activity.id}`, JSON.stringify(newActivity));
    setShowFormEdit(false);
  };

  const handleChange = (e) => {
    const newActivity = activity;
    let name = e.target.name;
    let value = e.target.value;
    newActivity[name] = value;

    setActivity(newActivity);
  };

  const handleDelete = () => {
    const newActivity = allActivity.filter((data) => data.id !== activity.id);
    setAllActivity(newActivity);

    localStorage.removeItem(activity.id);
  };

  return (
    <>
      {showFormEdit ? (
        <Form cancel={() => setShowFormEdit(false)} onSubmit={handleUpdate}>
          <Textarea placeholder="Activity" defaultValue={props.data.name} name="name" onChange={handleChange} />
        </Form>
      ) : (
        <Minicard>
          <Link style={{ display: "block", margin: "1rem 0" }} to={`/activities/${props.data.id}`}>
            <MinicardHeader title={props.data.name} />
          </Link>
          <button onClick={handleShowMenu} ref={setButtonRef} className="px-4 absolute top-0 right-0 mt-4 mr-2">
            :
          </button>
        </Minicard>
      )}

      {showMenu ? (
        <div className="z-10" ref={setMenuRef} style={styles.popper} {...attributes.popper}>
          <Menu title="Menu" setShowMenu={setShowMenu}>
            <MenuList content="Edit Activiy" onClick={handleShowFormEdit}></MenuList>
            <MenuList content="Delete Activity" onClick={handleDelete}></MenuList>
            <MenuList content="Cancel" onClick={handleShowMenu}></MenuList>
          </Menu>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Index;
