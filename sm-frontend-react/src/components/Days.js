import React from "react";
import { Link } from "react-router-dom";

const Days = ({ days }) => (
  <div>
    <p>Select Which Day To Edit</p>
    <div className="days">
      {days.map((day) => (
        <Link className="circle" key={day.day} id={day.color}>
          {day.day}
        </Link>
      ))}
    </div>
  </div>
);
export default Days;
