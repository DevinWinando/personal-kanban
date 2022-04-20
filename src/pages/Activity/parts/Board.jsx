import React, { useState } from "react";

import Card from "../../../components/Card";
import Form from "../../../components/Form/Form";
import TextArea from "../../../components/Form/Textarea";
import Input from "../../../components/Form/Input";

import { handleChange } from "../../../helpers/function";

function Board(props) {
  const { board, children, handleAdd } = props;
  const [addState, setAddState] = useState({
    id: 1,
    name: "",
    desc: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    handleAdd(addState, setAddState);
    setShowFormAdd(false);
  };

  const onChange = (e) => {
    handleChange(e, addState, setAddState);
  };

  const [showFormAdd, setShowFormAdd] = useState(false);

  return (
    <Card title={board.title} category={board.category}>
      {children}
      <div className="card-footer px-8 py-4">
        <hr />
        {showFormAdd === true ? (
          <Form onSubmit={onSubmit} cancel={() => setShowFormAdd(false)}>
            <Input onChange={onChange} placeholder="Name" name="name" />
            <TextArea onChange={onChange} placeholder="Description" name="desc" />
          </Form>
        ) : (
          <div className="border-2 border-gray-400 rounded-xl mt-3 p-4 cursor-pointer" onClick={() => setShowFormAdd(true)}>
            <p className="font-black">+ Add Item</p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default Board;
