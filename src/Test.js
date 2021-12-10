/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { usePopper } from "react-popper";

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRef, setButtonRef] = useState();
  const [tooltipRef, setTooltipRef] = useState();
  const { styles, attributes } = usePopper(buttonRef, tooltipRef, {
    placement: "auto",
  });

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <button type="button" className="btn" ref={setButtonRef} onClick={() => setIsOpen(!isOpen)}>
        Reference element
      </button>

      {isOpen ? (
        <div className="py-4 artboard artboard-demo bg-base-200 z-10 w-56" ref={setTooltipRef} style={styles.popper} {...attributes.popper}>
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
  );
};

export default Test;
