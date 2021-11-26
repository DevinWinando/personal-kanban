import React from "react";
import { Link } from "react-router-dom";

function index() {
  const allLocalStorage = () => {
    var archive = {}, // Notice change here
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      archive[keys[i]] = localStorage.getItem(keys[i]);
    }

    return archive;
  };

  const datas = allLocalStorage();
  let parsedData = [];
  Object.keys(datas).forEach((data) => {
    try {
      parsedData.push(JSON.parse(datas[data]));
    } catch (e) {
      return false;
    }
  });

  //   console.log(data);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1>HOME</h1>
      <div className="dropdown">
        <div tabIndex="0" className="m-1 btn">
          Dropdown
        </div>
        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          {parsedData.map((data) => (
            <Link style={{ display: "block", margin: "1rem 0" }} to={`/activities/${data.id}`} key={data.id}>
              {data.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default index;
