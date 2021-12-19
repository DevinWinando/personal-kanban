import React, { useEffect, useRef } from "react";

function Menu(props) {
  const { title, children, setShowMenu } = props;
  const menuRef = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
      document.body.style.overflow = "auto";
    };
  });

  return (
    <div className=" py-4 artboard artboard-demo bg-base-200 w-56" ref={menuRef}>
      <ul className="menu p-4 shadow-lg bg-base-100 rounded-box w-48">
        <li className="menu-title">
          <span>{title}</span>
        </li>
        {children}
      </ul>
    </div>
  );
}

export default Menu;
