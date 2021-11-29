/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
// import Menu from "./_Menu";
import { useLayer } from "react-laag";

function MiniCard(props) {
  const { desc, name } = props;
  const [showMenu, setShowMenu] = useState(false);
  const { renderLayer, triggerProps, layerProps } = useLayer({
    showMenu,
    auto: true,
    placement: "right-center",
    arrowOffset: 0,
    onOutsideClick: () => setShowMenu(false),
  });

  const handleShowMenu = () => setShowMenu(true);

  return (
    <div className="card shadow-2xl lg:card-side bg-dark text-primary-content border-gray-400 border-2 mt-4">
      <div className="card-body">
        <div className="card-title flex justify-between">
          <h1>{name}</h1>
          <button {...triggerProps} onClick={handleShowMenu} className="px-4">
            :
          </button>
          {setShowMenu &&
            renderLayer(
              <div {...layerProps} className="py-4 artboard artboard-demo bg-base-200  z-10 w-56 ml-20 -mt-10">
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
            )}
        </div>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default MiniCard;
