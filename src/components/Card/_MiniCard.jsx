import React from "react";

function MiniCard(props) {
  const { desc, title, setShowMenu } = props;

  const handleShowMenu = () => setShowMenu(true);

  return (
    <div className="card shadow-2xl lg:card-side bg-dark text-primary-content border-gray-400 border-2 mt-4">
      <div className="card-body">
        <div className="card-title flex justify-between">
          <h1>{title}</h1>
          <button onClick={handleShowMenu} className="px-4">
            :
          </button>
        </div>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default MiniCard;
