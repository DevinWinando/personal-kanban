import React, { useState, useEffect } from "react";
import Menu from "./_Menu";

function MiniCard(props) {
  let [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  useEffect(() => {
    document.addEventListener("click", () => {});
  });

  return (
    <div className="relative">
      {showMenu === true ? <Menu setShowMenu={setShowMenu} id={props.id} /> : ""}

      <div className="card shadow-2xl lg:card-side bg-dark text-primary-content border-gray-400 border-2 mt-4">
        <div className="card-body">
          <div className="card-title flex justify-between">
            <h1>{props.activity}</h1>
            <button onClick={handleShowMenu} className="px-4">
              :
            </button>
          </div>
          <p>{props.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default MiniCard;
