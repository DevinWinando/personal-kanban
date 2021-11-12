import React from "react";

function Input() {
  return (
    <div className="form-control mt-5">
      <div className="border-2 border-gray-900 rounded-md">
        <input type="text" placeholder="Title" className="input rounded-b-none focus:ring-0 w-full" />
        <textarea className="textarea h-28 max-h-64 focus:ring-0 rounded-t-none w-full" placeholder="Description" name="desc"></textarea>
      </div>
      <div className="d-flex">
        <button className="btn btn-active w-1/4 mt-3 mr-3" aria-pressed="true">
          Save
        </button>
        <button className="btn btn-active btn-secondary w-1/4 mt-3" aria-pressed="true">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Input;
