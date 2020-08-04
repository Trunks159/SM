import React from "react";
import { Link } from "react-router-dom";

const PastDays = ({ days }) => {
  return (
    <div>
      <h1>Past Days</h1>
      <p>Blue = Available Green = Completed Red = Incomplete Gray = Past Day</p>
    </div>
  );
};
export default PastDays;
