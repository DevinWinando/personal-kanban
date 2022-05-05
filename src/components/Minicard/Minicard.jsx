import React from "react";

function Minicard(props) {
  const { children, title } = props;
  return (
    <div className="card shadow-2xl bg-dark h-36 border-gray-400 border-2 mt-2 text-primary-content rounded-xl">
      <div className="card-body px-4 w-full">
        <div className="flex justify-content-center">
          <h2 className="card-title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Minicard;
