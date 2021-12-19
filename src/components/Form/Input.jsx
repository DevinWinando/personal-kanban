import React from "react";

function Input(props) {
  const { handleChange, defaultValue = "" } = props;
  return <input type="text" placeholder="title" className="input focus:ring-0 w-full" onChange={handleChange} name="name" required autoComplete="off" defaultValue={defaultValue} />;
}

export default Input;
