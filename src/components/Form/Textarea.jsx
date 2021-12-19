import React from "react";

function Textarea(props) {
  const { onChange, placeholder, name, defaultValue = "" } = props;

  return <textarea className="textarea h-20 max-h-64 focus:ring-0 rounded-t-none w-full resize-none" placeholder={placeholder} name={name} onChange={onChange} required defaultValue={defaultValue}></textarea>;
}

export default Textarea;
