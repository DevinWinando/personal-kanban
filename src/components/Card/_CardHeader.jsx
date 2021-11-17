import React from "react";

function _cardHeader(props) {
  const { title } = props;

  return (
    <div className="card-header px-8 pt-8">
      <h1 className="card-title">{title}</h1>
      <hr />
    </div>
  );
}

export default _cardHeader;
