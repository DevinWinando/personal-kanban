import React, { useState } from "react";
import Menu from "./_Menu";

function MiniCard(props) {
  const { setShowFormEdit, desc, activity, id } = props;
  let [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  return (
    <div className="wrapper">
      {showMenu === true ? <Menu setShowMenu={setShowMenu} id={id} setShowFormEdit={setShowFormEdit} /> : ""}

      <div className="card shadow-2xl lg:card-side bg-dark text-primary-content border-gray-400 border-2 mt-4">
        <div className="card-body">
          <div className="card-title flex justify-between">
            <h1>{activity}</h1>
            <button onClick={handleShowMenu} className="px-4">
              :
            </button>
          </div>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default MiniCard;
