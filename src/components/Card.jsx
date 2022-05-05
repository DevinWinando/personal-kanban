import React from "react";

function Card(props) {
  const {  children } = props;

  return (
    <div className="card bordered h-full max-h-80vh mt-10 w-64 ml-10 static">
      
      {children}
    </div>
  );
}

export default Card;
