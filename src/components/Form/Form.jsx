import React from "react";

function Form(props) {
  const { children, onSubmit, cancel } = props;

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="form-control h-36 mt-3 flex justify-between">
        <div className="border-2 border-gray-400 rounded-xl">{children}</div>
        <div className="flex">
          <button className="btn btn-active w-1/4 mt-3 mr-3" aria-pressed="true" type="submit">
            Save
          </button>
          <button className="btn btn-active btn-secondary w-1/4 mt-3" aria-pressed="true" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
