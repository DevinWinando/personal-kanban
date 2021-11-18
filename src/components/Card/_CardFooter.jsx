import React, { useState } from "react";
import FormAdd from "./_FormAdd";

function _CardFooter(props) {
  let [showFormAdd, setShowFormAdd] = useState(false);

  const handleShowFormAdd = () => {
    setShowFormAdd(true);
  };

  return (
    <div className="card-footer px-8 py-4">
      <hr />
      {showFormAdd === true ? (
        <FormAdd setShowFormAdd={setShowFormAdd} />
      ) : (
        <div className="border-2 border-gray-400 rounded-xl mt-3 p-4 cursor-pointer" onClick={handleShowFormAdd}>
          <p className="font-black">+ Add Item</p>
        </div>
      )}
    </div>
  );
}

export default _CardFooter;
