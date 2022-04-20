import React, { useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import { usePopper } from "react-popper";

import Minicard from "../../../components/Minicard/Minicard";
import Menu from "../../../components/Menu/Menu";
import MenuList from "../../../components/Menu/MenuList";
import Form from "../../../components/Form/Form";
import TextArea from "../../../components/Form/Textarea";
import Input from "../../../components/Form/Input";

import { handleChange } from "../../../helpers/function";

function BoardBody(props) {
  const { id, index, name, desc, handleDelete, handleUpdate } = props;

  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [buttonRef, setButtonRef] = useState();
  const [menuRef, setMenuRef] = useState();

  const [updateState, setUpdateState] = useState({
    id,
    name,
    desc,
  });

  const { styles, attributes } = usePopper(buttonRef, menuRef, {
    placement: "auto",
  });

  const handleShowFormEdit = () => {
    setShowFormEdit(true);
    setShowMenu(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdate(id, updateState);
    setShowFormEdit(false);
  };

  const onChange = (e) => {
    handleChange(e, updateState, setUpdateState);
  };

  return (
    <div className="cards-body">
      {showFormEdit ? (
        <Form onSubmit={onSubmit} cancel={() => setShowFormEdit(false)}>
          <Input defaultValue={name} onChange={onChange} name="name" />

          <TextArea defaultValue={desc} onChange={onChange} name="desc" />
        </Form>
      ) : (
        <Draggable draggableId={id.toString()} index={index}>
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                <Minicard title={name}>
                  <button ref={setButtonRef} onClick={() => setShowMenu(!showMenu)} className="px-4 absolute top-0 right-0 mt-4 mr-2">
                    :
                  </button>
                  <p>{desc}</p>
                </Minicard>
              </div>
            );
          }}
        </Draggable>
      )}

      {showMenu ? (
        <div className="z-10" ref={setMenuRef} style={styles.popper} {...attributes.popper}>
          <Menu title="Menu" setShowMenu={setShowMenu}>
            <MenuList content="Edit Activiy" onClick={handleShowFormEdit}></MenuList>
            <MenuList
              content="Delete Activity"
              onClick={() => {
                handleDelete(id);
                setShowMenu(false);
              }}
            ></MenuList>
            <MenuList content="Cancel" onClick={() => setShowMenu(false)}></MenuList>
          </Menu>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BoardBody;
