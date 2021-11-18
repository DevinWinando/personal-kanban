import React from "react";

function _FormEdit(props) {
  const { setShowFormEdit, id, title, desc } = props;
  const edit = () => {};
  const handleChange = () => {};
  const handleShowFormEdit = () => setShowFormEdit(false);

  return (
    <form action="" onSubmit={edit}>
      <div className="form-control mt-3">
        <div className="border-2 border-gray-400 rounded-xl">
          <input type="text" placeholder="title" className="input rounded-b-none focus:ring-0 w-full" onChange={handleChange} value={title} name="title" required />
          <textarea className="textarea h-28 max-h-64 focus:ring-0 rounded-t-none w-full" placeholder="Description" name="desc" onChange={handleChange} required>
            {desc}
          </textarea>
        </div>
        <div className="d-flex">
          <button className="btn btn-active w-1/4 mt-3 mr-3" aria-pressed="true" type="submit">
            Save
          </button>
          <button className="btn btn-active btn-secondary w-1/4 mt-3" aria-pressed="true" onClick={handleShowFormEdit}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default _FormEdit;
