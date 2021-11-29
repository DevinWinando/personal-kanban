import * as React from "react";
import { useLayer } from "react-laag";

function Test() {
  const [isOpen, setOpen] = React.useState(false);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    auto: true,
    placement: "right-center",
    arrowOffset: 0,
    onOutsideClick: () => setOpen(false),
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button {...triggerProps} onClick={() => setOpen(!isOpen)}>
        Trigger
      </button>
      {isOpen &&
        renderLayer(
          <div className="py-4 artboard artboard-demo bg-base-200 absolute z-10 w-56 ml-20 -mt-10" {...layerProps}>
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
  );
}
export default Test;
