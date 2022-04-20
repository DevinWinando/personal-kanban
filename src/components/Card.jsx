import React from "react";

function Card(props) {
  const { title, children } = props;

  return (
    <div className="card bordered h-4/5 mt-10 w-96 ml-10 static">
      <div className="card-header px-8 pt-8">
        <h1 className="card-title">{title}</h1>
        <hr />
      </div>
      {children}
    </div>
  );
}

export default Card;
