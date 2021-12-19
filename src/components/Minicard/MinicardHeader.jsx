import React from "react";

function MinicardHeader(props) {
  const { title, children } = props;

  return (
    <div className="flex justify-content-center">
      <h2 className="card-title">{title}</h2>
      {children}
    </div>
  );
}

export default MinicardHeader;
