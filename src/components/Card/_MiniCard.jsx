/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { usePopper } from "react-popper";
import Menu from "./_Menu";

function MiniCard(props) {
  const { desc, name, setShowFormEdit } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [buttonRef, setButtonRef] = useState();
  const [menuRef, setMenuRef] = useState();
  const { styles, attributes } = usePopper(buttonRef, menuRef, {
    placement: "auto",
  });

  return (
    <>
      <div className="card shadow-2xl lg:card-side bg-dark text-primary-content border-gray-400 border-2 mt-4">
        <div className="card-body">
          <div className="card-title flex justify-between">
            <h1>{name}</h1>
            <button onClick={() => setShowMenu(!showMenu)} ref={setButtonRef} className="px-4">
              :
            </button>
          </div>
          <p>{desc}</p>
        </div>
      </div>
      {showMenu ? (
        <div className="popper z-10" ref={setMenuRef} style={styles.popper} {...attributes.popper}>
          <Menu setShowMenu={setShowMenu} setShowFormEdit={setShowFormEdit} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MiniCard;
