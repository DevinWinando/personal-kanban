import React from "react";

function Input(props) {
  const { onChange, defaultValue = "", placeholder = "", name = "", type = "text" } = props;
  return <input type={type} placeholder={placeholder} className="input focus:ring-0 w-full" onChange={onChange} name={name} required autoComplete="off" defaultValue={defaultValue} />;
}

export default Input;
