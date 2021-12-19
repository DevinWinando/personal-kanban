/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function MenuList(props) {
  const { content, onClick } = props;
  return (
    <li>
      <a href="#" onClick={onClick}>
        {content}
      </a>
    </li>
  );
}

export default MenuList;
