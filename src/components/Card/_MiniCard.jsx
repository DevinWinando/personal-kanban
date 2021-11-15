import React from "react";

function MiniCard(props) {
  return (
    <div class="card shadow-2xl lg:card-side bg-dark text-primary-content border-gray-400 border-2 mt-4">
      <div class="card-body">
        <div className="card-title">{props.activity}</div>
        <p>{props.desc}</p>
      </div>
    </div>
  );
}

export default MiniCard;
