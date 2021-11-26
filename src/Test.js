import React from "react";
import { useParams } from "react-router-dom";

function Test() {
  let params = useParams();

  return <div>{params.activityId}</div>;
}

export default Test;
